import { db, auth, rtd } from '../../lib/firebaseAdmin';
import rateLimit from '../../utils/rate-limit';
import {} from 'firebase-admin/database';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(req, res) {
  const { userId, userEmail, sotId } = req.body;

  try {
    // await limiter.check(res, 5, 'CACHE_TOKEN');

    const userSnap = await auth.getUser(userId);
    if (!userSnap || !userSnap.emailVerified) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }
    const docSnap = await db.doc(`sots/${sotId}`).get();
    if (!docSnap.exists) {
      res.status(404).json({ msg: 'SoT not Found' });
      return;
    }
    if (docSnap.get('owner')) {
      res.status(400).json({ msg: 'Cannot be purchased' });
      return;
    }
    rtd
      .ref('/Orders')
      .push(
        {
          UserID: userId,
          UserEmail: userEmail,
          SoTID: sotId,
          Paid: 'No',
          Price: docSnap.get('price'),
          createAt: new Date().getTime(),
        },
        (error) => {
          if (error) {
            res.status(500).json({ msg: 'Server Failed', err: error });
            return;
          }
        }
      )
      .then((snap) => {
        const key = snap.key;
        res.status(201).json({
          msg: 'Order Created',
          url: `http://15.164.220.169/kspay_wh_order.php?orderNumber=${key}`,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(429).json({ error: 'Rate limit exceeded', err });
  }
}
