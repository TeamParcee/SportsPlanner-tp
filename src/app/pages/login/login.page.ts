import { Component, OnInit } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private helper: TPHelper,
    private nav: NavController,
  ) {
  }

  user = { email: "", password: "" }
  ngOnInit() {
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then((result) => {
      sessionStorage.setItem('uid', result.user.uid);
      this.nav.navigateRoot('/tabs/home')
    }).catch((error) => {
      this.helper.showError(error.message)
    })
  }
}
