import { Component, OnInit } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DrillPage } from 'src/app/forms/drill/drill.page';
import { NavController } from '@ionic/angular';
import { Drill } from 'src/app/classes/drill';

@Component({
  selector: 'app-drills',
  templateUrl: './drills.page.html',
  styleUrls: ['./drills.page.scss'],
})
export class DrillsPage implements OnInit {

  constructor(
    private helper: TPHelper,
    private fs: FirestoreService,
    private nav: NavController,
  ) {

  }

  ngOnInit() {
  }

  sport;
  user;
  drills;
  searchDrills: any[];
  coach;
  coachId;

  async ionViewWillEnter() {
    await this.getUser()
    await this.getCoach();
    await this.getDrills();
  }


  getCoach() {
    return this.fs.getDoc('users/' + this.coachId).then((coach) => {
      this.coach = coach;
      return Promise.resolve();
    })
  }
  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc('/users/' + uid).then((user) => {
      this.user = user;
      this.sport = this.user.sport;
      return Promise.resolve()
    })
  }
  getDrills() {
    return this.fs.getCol('drills').where('sport', '==', this.sport).onSnapshot((s) => {
      this.drills = s.docs.map(d => d.data());
      this.searchDrills = s.docs.map(d => d.data())
      return Promise.resolve();
    })
  }

  addDrill() {
    this.helper.showModal(DrillPage)
  }
  viewDrill(drill) {
    this.nav.navigateForward("/view-drill")
  }


  search(event) {
    let value = event.detail.value.toLowerCase();
    this.drills = this.searchDrills.filter((drill: Drill) => {
      return drill.name.toLowerCase().includes(value)
    })
  }
}
