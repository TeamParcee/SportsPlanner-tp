import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TPHelper } from 'src/app/services/tp-helper';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Plan } from 'src/app/classes/plan';
import * as moment from 'moment';
import { Period } from 'src/app/classes/period';
import * as quill from 'ngx-quill';
import { ChangeTeamPage } from 'src/app/forms/change-team/change-team.page';
import { User } from 'src/app/classes/user';
import { PlanPage } from 'src/app/forms/plan/plan.page';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private helper: TPHelper,
    private fs: FirestoreService
  ) { }

  plan: Plan;
  noUpcommingPlan = false;
  user;
  moment = moment;
  newPeriod = new Period();
  periods;
  coachId;
  coach = {};
  editing = false;
  ngOnInit() {
  }


  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoach();
    this.getPlan();
  }


  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc('users/' + uid).then((user) => {
      this.user = user;
      this.coachId = this.user.coaches[0];
      return Promise.resolve();
    })
  }

  getCoach() {
    return this.fs.getDoc('users/' + this.coachId).then((coach) => {
      this.coach = coach;
      return Promise.resolve();
    })
  }

  getPlan() {
    let id = this.route.snapshot.paramMap.get('id');
    this.fs.getDoc('plans/' + id).then((plan) => {
      if (plan) {
        this.plan = Object.assign(new Plan(), plan);
        this.updateStartTime();
        this.updatePlanTimes();
        this.plan.periods.forEach(p => (p.showNotes = false, p.editNotes = false, p.edit = false));
      } else {
        this.getNextPlan();
      }
    })
  }

  getNextPlan() {
    let today = new Date().setHours(0, 0, 0, 0);
    this.fs.getCol('plans').where('uid', '==', this.coachId).where('datetime', '>', today).limit(1).orderBy('datetime').onSnapshot((s) => {
      let plans = s.docs.map(d => d.data());
      let nextPlan: any = plans[0];
      if (nextPlan) {
        this.plan = Object.assign(new Plan(), nextPlan);
        this.plan.periods.forEach(p => (p.showNotes = false, p.editNotes = false, p.edit = false));
      } else {
        this.plan = null;
        this.noUpcommingPlan = true;
      }
    })
  }


  createPeriod() {
    let period = Object.assign({}, this.newPeriod);
    this.plan.periods.push({ ...period });
    this.plan.update();
    this.updateStartTime();
    this.newPeriod = new Period();
    this.updatePlanTimes();
  }

  removePeriod(period) {
    this.helper.showConfirmationAlert("Remove Period", "Are you sure you want to remove this Period", "Remove").then((result) => {
      if (result) {
        let periodIndex = this.plan.periods.findIndex(p => JSON.stringify(p) == JSON.stringify(period))
        this.plan.periods.splice(periodIndex, 1);
        this.plan.update();
        this.updateStartTime();
        this.updatePlanTimes();
      }
    })
  }

  updateStartTime() {
    let startTime: any = moment(this.plan.datetime, 'x').format();
    this.plan.periods.map((period: Period) => {
      period.startTime = startTime;
      let endTime = moment(startTime).add(period.duration, 'minutes').format();
      period.endTime = endTime;
      startTime = endTime
    })
  }

  updatePlanTimes() {
    this.updatePlanDuration();
    this.updatePlanEndTime();
    this.plan.update();
  }
  updatePlanDuration() {
    let duration = 0;
    this.plan.periods.forEach((period) => {
      duration = duration + period.duration;
    })
    this.plan.duration = duration;
  }

  updatePlanEndTime() {
    let endTime: any = moment(this.plan.datetime, 'x').format();
    this.plan.periods.forEach((period) => {
      endTime = moment(endTime).add(period.duration, 'minutes').format();
    })
    this.plan.endTime = new Date(endTime).getTime();
  }

  doReorder(ev: any) {

    this.plan.periods = ev.detail.complete(this.plan.periods);
    this.updateStartTime();
    this.plan.update();

  }


  saveNotes(period) {
    this.plan.update();
    period.editNotes = false;
  }

  changeTeam() {
    this.helper.showModal(ChangeTeamPage, { user: Object.assign(new User(), this.user) }).then((coach: User) => {
      if (coach) {
        this.coach = coach;
        this.coachId = this.coachId;
        this.getPlan();
      }
    })
  }

  createPlan() {
    this.helper.showModal(PlanPage)
  }

  saveUpdates() {
    //TODO: update so saving doesing save the entire plan
    this.updateStartTime();
    this.updatePlanTimes();
    this.editing = false;
  }


  editPlan() {
    this.helper.showModal(PlanPage, { plan: Object.assign(new Plan(), this.plan) }).then(() => {
      this.updateStartTime();
      this.updatePlanTimes();
      this.editing = false;
    })
  }
}
