import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TPHelper } from 'src/app/services/tp-helper';
import { DrillPage } from 'src/app/forms/drill/drill.page';
import { Drill } from 'src/app/classes/drill';
import { User } from 'src/app/classes/user';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-view-drill',
  templateUrl: './view-drill.page.html',
  styleUrls: ['./view-drill.page.scss'],
})
export class ViewDrillPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fs: FirestoreService,
    private helper: TPHelper,
  ) { }

  ngOnInit() {
  }
  drill;
  user;
  coach;
  coachId;

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[] = [
    {
      src: 'bTqVqk7FSmY',
      provider: 'youtube',
    },
  ];
  async ionViewWillEnter() {
    await this.getUser();
    await this.getCoach();
    this.getDrill();
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


  getDrill() {
    let id = this.route.snapshot.paramMap.get('id');
    this.fs.getDoc("drills/" + id).then((drill) => {
      this.drill = drill;
      console.log(this.drill.video.url)

    })
  }

  edit(drill) {
    this.helper.showModal(DrillPage, { drill: Object.assign(new Drill(), drill) }).then((result) => {
      if (result) {
        this.getDrill()
      }
    })
  }
}
