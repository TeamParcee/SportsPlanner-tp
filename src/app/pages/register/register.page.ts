import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { User } from 'src/app/classes/user';
import { NavController } from '@ionic/angular';
import { TPHelper } from 'src/app/services/tp-helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private nav: NavController,
    private helper: TPHelper,
  ) { }

  user = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  }
  ngOnInit() {
  }


  register() {
    firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then((result) => {
      this.createUser(result.user.uid)
    }).catch((error) => {
      this.helper.showError(error.message)
    })
  }

  createUser(uid) {
    let user = new User();
    user.fname = this.user.fname;
    user.lname = this.user.lname;
    user.email = this.user.email;
    user.uid = uid;
    user.create().then(() => {
      sessionStorage.setItem('uid', uid);
      this.nav.navigateForward("/complete-profile");
    })
  }
}
