import { db, auth, rtd } from '../../lib/firebaseAdmin';
import rateLimit from '../../utils/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(req, res) {
  const { userId, sotId } = req.body;

  try {
    await limiter.check(res, 3, 'CACHE_TOKEN');
    let orderExists = false;
    let paid = false;

    await rtd
      .ref('/Orders')
      .orderByChild('CombinedID')
      .equalTo(userId + sotId)
      .once('value')
      .then((snap) => {
        if (snap.exists()) {
          if (snap.val().Paid === 'Yes') {
            paid = true;
            return;
          }

          // orderExists = true;

          // snap.forEach((childSnap) => {
          //   res.status(201).json({
          //     msg: 'Order Exists',
          //     url: `https://payment.fingerate.world/kspay_wh_order.php?orderNumber=${childSnap.key}`,
          //   });
          //   return;
          // });
        }
      });

    if (paid) {
      res.status(409).json({ error: { title: 'Already Paid', body: '' } });
    }
    if (orderExists || paid) return;

    const userSnap = await auth.getUser(userId);
    if (!userSnap.emailVerified) {
      res.status(401).json({
        error: {
          title: 'Unauthorized',
          body: 'You need to verify your account',
        },
      });
      return;
    }
    const docSnap = await db.doc(`sots/${sotId}`).get();
    if (!docSnap.exists) {
      res.status(404).json({
        error: {
          title: 'SoT Not Found',
          body: '',
        },
      });
      return;
    }
    if (docSnap.get('owner')) {
      res.status(400).json({
        error: {
          title: 'Cannot be purchased',
          body: 'The SoT is already purchased by other user',
        },
      });
      return;
    }
    const XR = await db.doc('XR/15min').get();
    await rtd
      .ref('/Orders')
      .push(
        {
          UserID: userId,
          UserEmail: userSnap.email,
          SoTID: sotId,
          Paid: 'No',
          Price: (docSnap.get('price') * XR.get('rates.KRW.value')).toFixed(0),
          CreatedAt: new Date().getTime(),
          CombinedID: userId + sotId,
        },
        (_err) => {
          if (_err) {
            res.status(500).json({ error: { title: 'Server Failed', body: _err } });
            return;
          }
        }
      )
      .then((snap) => {
        const key = snap.key;
        res.status(201).json({
          msg: 'Order Created',
          url: `https://payment.fingerate.world/kspay_wh_order.php?orderNumber=${key}`,
        });
      });
  } catch (_err) {
    console.error(_err);

    switch (_err?.code) {
      case 'auth/user-not-found':
        return res.status(404).json({
          error: {
            title: 'User not found',
            body: 'There is no user record corresponding to the provided identifier',
          },
        });
        break;

      default:
        break;
    }
    return res.status(429).json({ error: { title: 'Rate limit exceeded', body: 'Too many requests' } });
  }
}
