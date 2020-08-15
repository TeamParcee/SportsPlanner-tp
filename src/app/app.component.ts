import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './classes/user';
import { FirestoreService } from './services/firestore.service';
import { TPHelper } from './services/tp-helper';
import { DrillPage } from './forms/drill/drill.page';
import { PlanPage } from './forms/plan/plan.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fs: FirestoreService,
    private helper: TPHelper,
  ) {
    this.initializeApp();
  }

  user: User;
  showAddMenu = false;
  initializeApp() {
    this.platform.ready().then(() => {
      this.getUser();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  getUser() {
    let uid = sessionStorage.getItem('uid');
    this.fs.getCol('/users/').where('uid', "==", uid).onSnapshot((s) => {
      let users = s.docs.map(d => d.data())
      this.user = users[0] as User;
    })
  }

  showMenu(event) {
    this.showAddMenu = true;
    this.helper.showPopover({ component: addMenuButtons, event: event, showBackdrop: false }).then(() => {
      this.showAddMenu = false;
    })
  }
}


@Component({
  templateUrl: 'app-add-menu-btns.html'
})
export class addMenuButtons {

  constructor(
    private helper: TPHelper
  ) { }
  createDrill() {
    this.helper.showModal(DrillPage)
  }

  createPlan() {
    this.helper.showModal(PlanPage)
  }
}
