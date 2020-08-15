import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/classes/user';
import { TPHelper } from 'src/app/services/tp-helper';
import { AddCoachPage } from 'src/app/forms/add-coach/add-coach.page';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { NavController } from '@ionic/angular';
import { CropImagePage } from 'src/app/forms/crop-image/crop-image.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private fs: FirestoreService,
    private helper: TPHelper,
    private nav: NavController,
  ) { }

  ngOnInit() {
  }

  user: User;
  oUser = new User();
  coaches = [];
  imageInput;
  imagePreview;

  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoaches();
    this.user = Object.assign(new User(), this.user);
  }

  updateOuser() {
    this.oUser = { ...this.user } as User
  }
  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc('/users/' + uid).then((user: User) => {
      this.user = Object.assign(new User(), user);
      this.oUser = Object.assign(new User(), user);
      return Promise.resolve()
    })
  }

  getCoaches() {
    let coaches = [];
    this.user.coaches.forEach(async (uid) => {
      coaches.push(await this.getCoach(uid));
    })
    this.coaches = coaches;
  }

  getCoach(uid) {
    return this.fs.getDoc("/users/" + uid).then((coach: User) => {
      return Promise.resolve(coach);
    })
  }

  addCoach() {
    this.helper.showModal(AddCoachPage).then((coach: User) => {
      if (coach) {
        this.user.coaches.push(coach.uid);
        this.user.update().then(() => {
          this.getCoaches();
        })
      }
    })
  }

  removeCoach(coach: User) {
    this.helper.showConfirmationAlert("Remove Coach", "Are you sure you want to remove this coach", "Remove").then((result) => {
      if (result) {
        let index = this.user.coaches.findIndex(uid => uid == coach.uid);
        this.user.coaches.splice(index, 1);
        this.user.update();
        this.getCoaches();
      }
    })
  }

  signOut() {
    this.helper.showConfirmationAlert("Sign Out", "Are you sure you want to Sign Out?", "Sign Out").then((result) => {
      if (result) {
        firebase.auth().signOut().then(() => {
          sessionStorage.removeItem('uid');
          this.nav.navigateBack('welcome');
        })
      }
    })
  }

  saveFname() {
    this.user.update();
    this.updateOuser();
  }

  saveLname() {
    this.user.update();
    this.updateOuser();
  }

  saveEmail() {
    firebase.auth().currentUser.updateEmail(this.user.email).then(() => {
      this.user.update();
      this.oUser.email = this.user.email
    }).catch((error) => {
      this.helper.showError(error.message)
    })
  }

  cropImage(event) {
    if (this.imageInput != null) {
      this.helper.showModal(CropImagePage, { imageChangedEvent: event }).then((result) => {
        this.imagePreview = result;
        this.imageInput = null;
      })
    }
  }

  cancelImage() {
    this.imagePreview = null;
  }
  saveImage() {
    this.user.photoUrl = this.imagePreview;
    this.imagePreview = null;
    this.user.update();
    this.nav.navigateRoot("/profile")
  }

  deleteAccount() {
    this.helper.showConfirmationAlert("Delete Account", "Are you sure you want to delete your account? This can not be undone", "Delete Account").then((result) => {
      firebase.auth().currentUser.delete().then(() => {
        this.user.delete();
      }).catch((error) => {
        this.helper.showError(error.message)
      })
    })
  }
}
