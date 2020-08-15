import { Component, OnInit } from '@angular/core';
import { TPHelper } from 'src/app/services/tp-helper';
import { VideoPage } from '../video/video.page';
import { Drill } from 'src/app/classes/drill';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-drill',
  templateUrl: './drill.page.html',
  styleUrls: ['./drill.page.scss'],
})
export class DrillPage implements OnInit {

  constructor(
    private helper: TPHelper,
    private fs: FirestoreService,
    private nav: NavController,
  ) { }

  video;
  drill = new Drill();
  user;
  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.getUser()
  }
  getUser() {
    let uid = sessionStorage.getItem('uid');
    return this.fs.getDoc('users/' + uid).then((user) => {
      this.user = user;
      return Promise.resolve()
    })
  }

  addVideo() {
    this.helper.showModal(VideoPage).then((video) => {
      if (video) {
        this.drill.video = video;
      }
    })
  }

  save() {
    this.drill.coach = { ...this.user };
    if (this.drill.id) {
      this.udpate()
    } else {
      this.create()
    }
  }

  create() {
    this.drill.sport = this.user.sport;
    this.drill.create().then(() => {
      this.helper.closeModal();
    })
  }

  udpate() {
    this.drill.update().then(() => {
      this.drill.update().then(() => {
        this.helper.closeModal(true)
      })
    })
  }

  close() {
    this.helper.closeModal();
  }

  delete() {
    this.helper.showConfirmationAlert("Delete Drill", "Are you sure you want to delete this drill?", "Delete").then((result) => {
      if (result) {
        let drill = Object.assign(new Drill(), this.drill);
        drill.delete().then(() => {
          this.nav.navigateBack("/drills").then(() => {
            this.helper.closeModal();
          })
        })
      }
    })
  }
}
