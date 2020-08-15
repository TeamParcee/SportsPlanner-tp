import { Component, OnInit } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';
import { FirestoreService } from 'src/app/services/firestore.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-change-team',
  templateUrl: './change-team.page.html',
  styleUrls: ['./change-team.page.scss'],
})
export class ChangeTeamPage implements OnInit {

  constructor(
    private helper: TPHelper,
    private fs: FirestoreService,
  ) {

  }

  ngOnInit() {
  }

  user = new User();
  coaches = [];
  ionViewWillEnter() {
    this.getCoaches();
  }

  getCoaches() {
    let coaches = [];
    this.user.coaches.forEach((uid) => {
      this.fs.getDoc("/users/" + uid).then((coach: User) => {
        coaches.push({ ...coach });
      })
    })
    this.coaches = coaches;
  }
  selectCoach(coach) {
    this.helper.closeModal({ ...coach })
  }
  close() {
    this.helper.closeModal()
  }

}
