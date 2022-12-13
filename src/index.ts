import './global.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
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
const db = getStorage(app);

function getAllPhotoFromFolder(){
  const refer = ref(db, 'gs://online-shop-8c752.appspot.com/shop/kids-room/beds/Kura/photo');
  listAll(refer)
  .then((res) => {
    res.items.forEach((itemRef) => {
      let body = document.querySelector('body')
      let img = document.createElement('img')
      getDownloadURL(itemRef).then(
        (url)=>{
          img.setAttribute('src',url)
          body?.append(img)
        }
      )
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
}

function getPhoto(){
  const refer = ref(db, 'gs://online-shop-8c752.appspot.com/shop/kids-room/beds/Kura/photo/1.avif');
  getDownloadURL(refer).then(
    (url)=>{
      let body = document.querySelector('body')
      let img = document.createElement('img')
      img.setAttribute('src',url)
          body?.append(img)
    }
  )
}

function getAllPhotoFromcategory(){
  const refer = ref(db, 'gs://online-shop-8c752.appspot.com/shop/kids-room');
  downloadList()
}

function downloadList(refer = ref(db, 'gs://online-shop-8c752.appspot.com/shop/kids-room')){
    listAll(refer).then(
      (res) => {
        res.prefixes.forEach((folderRef)=>{
          downloadList(folderRef)
        })
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then(
            (url)=>{
              let body = document.querySelector('body')
              let img = document.createElement('img')
              img.setAttribute('src',url)
                  body?.append(img)
            }
          )
        });
      }
    )
}
