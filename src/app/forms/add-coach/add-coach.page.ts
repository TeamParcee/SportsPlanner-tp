import { Component, OnInit } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-add-coach',
  templateUrl: './add-coach.page.html',
  styleUrls: ['./add-coach.page.scss'],
})
export class AddCoachPage implements OnInit {

  constructor(
    private helper: TPHelper,
    private fs: FirestoreService,
  ) { }

  ngOnInit() {
  }

  coaches = [];
  searchCoaches = [];
  user;

  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoaches()
  }

  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc('/users/' + uid).then((user: User) => {
      this.user = user;
      return Promise.resolve()
    })
  }
  getCoaches() {
    return this.fs.getCol('users').where('isHeadCoach', '==', true).orderBy('fname').onSnapshot((s) => {
      let coaches = s.docs.map(d => d.data()).filter((doc: User) => {
        if (doc.uid != this.user.uid) {
          return doc;
        }
      })
      console.log(coaches)
      this.coaches = coaches;
      this.searchCoaches = coaches;
      return Promise.resolve();
    })
  }

  search(event) {
    let value = event.detail.value.toLowerCase();
    this.coaches = this.searchCoaches.filter((coach: User) => {
      if (
        coach.fname.toLowerCase().includes(value) ||
        coach.lname.toLowerCase().includes(value) ||
        coach.teamName.toLowerCase().includes(value)
      ) {
        return coach
      }
    })
  }

  selectCoach(coach: User) {
    this.helper.inputAlert("Coach Passcode", "Please enter the coach's passcode", "Passcode").then((result) => {
      if (result) {
        if (result == coach.passcode) {
          this.helper.closeModal({ ...coach })
        } else {
          this.helper.showError("Incorrect Passcode")
        }
      }
    })
  }

  close() {
    this.helper.closeModal()
  }
}
