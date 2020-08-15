import { Plan } from './plan';

import { Injector } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

export class User {

    private className = "users";
    private injector = Injector.create({ providers: [{ provide: FirestoreService }] });
    fname: string;
    lname: string;
    email: string;
    uid: string;
    teamName: string;
    coaches = [];
    passcode: string;
    sport: string;
    followers: number = 0;
    following: number = 0;
    photoUrl = "./assets/default-user.png"



    // let fs = this.injector.get(FirestoreService) 

    async create() {
        let fs = this.injector.get(FirestoreService)
        await fs.set(this.clean(), '/users/' + this.uid)
        return Promise.resolve();
    }

    async update() {
        let fs = this.injector.get(FirestoreService);
        await fs.update({ ...this.clean() });
        return Promise.resolve();
    }

    async delete() {
        let fs = this.injector.get(FirestoreService);
        await fs.delete({ ...this.clean() });
        return Promise.resolve();
    }

    private clean() {
        let cleanObj = { ...this }
        delete cleanObj.injector;
        delete cleanObj.className;
        return cleanObj;
    }
}
