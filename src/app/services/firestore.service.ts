import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }


  add(col: string, obj: {}) {
    return new Promise((resolve) => {
      firebase.firestore().collection(col).add({ ...obj }).then((result) => {
        result.update({ id: result.id, path: result.path }).then(() => {
          return resolve();
        })
      })
    })
  }


  set(obj: any, path?) {
    return new Promise((resolve) => {
      obj.path = (path) ? path : obj.path;
      firebase.firestore().doc(obj.path).set({ ...obj }).then(() => {
          return resolve();
        })
    })
  }

  delete(obj) {
    return new Promise((resolve) => {
      firebase.firestore().doc(obj.path).delete().then(() => {
        return resolve()
      })
    })
  }

  update(obj) {
    return new Promise((resolve) => {
      firebase.firestore().doc(obj.path).update({ ...obj }).then(() => {
        return resolve()
      })
    })
  }

  snapshot(col) {
    return new Promise((resolve) => {
      firebase.firestore().collection(col).onSnapshot((snapshot) => {
        let data = snapshot.docs.map(doc => doc.data());
        return resolve(data)
      })
    })
  }

  getCol(col) {
    return firebase.firestore().collection(col)
  }

  getDoc(doc) {
    return new Promise((resolve) => {
      firebase.firestore().doc(doc).get().then((result) => {
        return resolve(result.data())
      })
    })
  }
}
