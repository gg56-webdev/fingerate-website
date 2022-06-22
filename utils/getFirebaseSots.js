import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SOT_URL_PATH = '/sots/';

export default async function getFirebaseSots() {
  try {
    const { docs } = await getDocs(collection(db, 'sots'));
    return docs.map((doc) => {
      const { location, image, owner, ...data } = doc.data();
      return { ...location, ...data, id: doc.id, source: 'Firebase', url: SOT_URL_PATH + doc.id, owner: !!owner };
    });
  } catch (err) {
    console.error(err);
  }
}
