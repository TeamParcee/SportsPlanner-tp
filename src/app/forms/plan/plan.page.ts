import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/classes/plan';
import { TPHelper } from 'src/app/services/tp-helper';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  constructor(
    private helper: TPHelper,
  ) { }

  ngOnInit() {
  }

  plan = new Plan();
  datetime = null;

  ionViewWillEnter() {
    if (this.plan.datetime) {
      this.datetime = new Date(this.plan.datetime).toISOString();
    }
  }
  close() {
    this.helper.closeModal();
  }

  create() {
    let datetime = new Date(this.datetime).getTime();
    this.helper.showLoading();
    this.plan.datetime = datetime;
    this.plan.endTime = datetime;
    console.log(this.plan.datetime, this.plan.endTime);
    this.plan.create().then(() => {
      this.helper.hideLoading();
      this.helper.closeModal();
    })
  }

  save() {
    this.helper.showLoading();
    this.plan.datetime = new Date(this.datetime).getTime();
    this.plan.update().then(() => {
      this.helper.hideLoading();
      this.helper.closeModal();
    })
  }

  delete() {
    this.helper.showConfirmationAlert("Delete Plan", "Are you sure you want to delete this plan?", "Delete").then((result) => {
      if (result) {
        this.plan.delete().then(() => {
          this.helper.closeModal()
        })
      }
    })
  }
}
