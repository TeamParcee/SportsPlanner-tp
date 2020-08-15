import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/classes/user';
import { NavController } from '@ionic/angular';
import { TPHelper } from 'src/app/services/tp-helper';
import { AddCoachPage } from 'src/app/forms/add-coach/add-coach.page';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {

  constructor(
    private fs: FirestoreService,
    private nav: NavController,
    private helper: TPHelper,
  ) { }

  question = "";
  user = {};
  step;

  async ionViewWillEnter() {
    await this.getUser();
    this.updateStep('1')
  }


  ngOnInit() {
  }


  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc("/users/" + uid).then((user) => {
      if (user) {
        this.user = user as User;
      }
      return Promise.resolve()
    })
  }

  updateStep(step) {
    if (step == '1') {
      this.question = "Are you a Head Coach"
    }
    if (step == '2') {
      this.question = "What is your team name?"
    } if (step == '3') {
      this.question = "What is your Sport?"
    }

    this.step = step;
  }

  save() {
    let user = Object.assign(new User(), this.user);
    user.coaches.push(user.uid);
    user.update().then(() => {
      this.nav.navigateForward('/tabs/home')
    })
  }

  selectCoach() {
    let user = Object.assign(new User(), this.user);
    this.helper.showModal(AddCoachPage, { user: user }).then((coach: User) => {
      if (coach) {
        user.coaches.push(coach.uid);
        user.sport = coach.sport = coach.sport;
        user.update().then(() => {
          this.nav.navigateForward('/tabs/home')
        })
      }
    })
  }
}
