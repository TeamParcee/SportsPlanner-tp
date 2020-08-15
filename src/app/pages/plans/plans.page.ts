import { Component, OnInit } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';
import { PlanPage } from 'src/app/forms/plan/plan.page';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavController } from '@ionic/angular';
import { Plan } from 'src/app/classes/plan';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  constructor(
    private helper: TPHelper,
    private fs: FirestoreService,
    private nav: NavController,
  ) { }

  plans = [];
  uid = sessionStorage.getItem('uid');
  navigate = true;
  view = 'upcoming';
  user = new User();
  coach = new User();
  coachId;
  unsub;

  ngOnInit() {
  }


  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoach();
    this.getUpcomingPlans();
  }

  ionViewWillLeave() {
    this.unsub();
  }
  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc('users/' + uid).then((user: User) => {
      this.user = user;
      this.coachId = this.user.coaches[0];
      console.log(this.coachId)
      return Promise.resolve();
    })
  }

  getCoach() {
    return this.fs.getDoc('users/' + this.coachId).then((coach: User) => {
      this.coach = coach;
      return Promise.resolve();
    })
  }
  addPlan() {
    this.helper.showModal(PlanPage)
  }

  getUpcomingPlans() {
    let today = new Date().setHours(0, 0, 0, 0);
    this.unsub = this.fs.getCol('plans').where('uid', '==', this.coachId).where('datetime', '>', today).orderBy('datetime').onSnapshot((s) => {
      this.plans = s.docs.map(d => d.data());
    })
  }

  getPastPlans() {
    let today = new Date().setHours(0, 0, 0, 0);
    this.unsub = this.fs.getCol('plans').where('uid', '==', this.coachId).where('datetime', '<', today).orderBy('datetime').onSnapshot((s) => {
      this.plans = s.docs.map(d => d.data())
    })
  }

  select(plan) {
    if (this.navigate) {
      this.nav.navigateBack('/tabs/home/' + plan.id)
    }
    this.navigate = true;
  }
  edit(plan: Plan) {
    this.navigate = false;
    this.helper.showModal(PlanPage, { plan: Object.assign(new Plan(), plan) })
  }

  delete(plan: Plan) {
    this.navigate = false;
    this.helper.showConfirmationAlert("Delete Plan", "Are you sure you want to delete this plan?", "Delete").then((result) => {
      if (result) {
        plan = Object.assign(new Plan(), plan);
        plan.delete()
      }
    })
  }
  updateView(event) {
    let value = event.detail.value;
    if (value == 'upcoming') {
      this.getUpcomingPlans()
    } else {
      this.getPastPlans();
    }
  }
}
