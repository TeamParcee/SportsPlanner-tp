import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { NavController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../classes/user';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private nav: NavController,
    private fs: FirestoreService,
  ) {

  }
  async canActivate() {
    return await this.loggedIn();
  }



  loggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          sessionStorage.setItem('uid', user.uid);
          return resolve(await this.compeletedProfile(user.uid) as any)
        } else {
          this.nav.navigateRoot('login');
        }
      })
    })
  }

  async compeletedProfile(uid) {
    return new Promise(async (resolve) => {
      let user: User = await this.getUser(uid) as User;
      if (user.fname && user.lname && user.email && user.coaches.length != 0 && user.sport) {
        return resolve(true)
      } else {
        this.nav.navigateRoot("/complete-profile")
      }
    })
  }


  getUser(uid) {
    return new Promise((resolve) => {
      this.fs.getDoc("/users/" + uid).then((doc) => {
        return resolve(doc)
      })
    })
  }
}
