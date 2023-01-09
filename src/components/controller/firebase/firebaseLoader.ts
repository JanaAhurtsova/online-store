import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, FirebaseStorage } from 'firebase/storage';

export default class FirebaseLoader {
  private dataBase: FirebaseStorage;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyB2AShHTTys5T4tvoXi0QDWDSlAB2lm304',
      authDomain: 'online-shop-8c752.firebaseapp.com',
      databaseURL: 'https://online-shop-8c752-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'online-shop-8c752',
      storageBucket: 'online-shop-8c752.appspot.com',
      messagingSenderId: '402705522234',
      appId: '1:402705522234:web:be1556cfaf943f9beddf03',
      measurementId: 'G-2R8EZK0Z1P',
    };

    const app = initializeApp(firebaseConfig);
    this.dataBase = getStorage(app);
  }

  public getImage = (link: string) => {
    return getDownloadURL(ref(this.dataBase, link));
  };
}
