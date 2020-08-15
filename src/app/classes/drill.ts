import { Injector } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

export class Drill {

    private className = "drills";
    private injector = Injector.create({ providers: [{ provide: FirestoreService }] });

    id;
    name;
    video;
    notes;
    sport;
    coach;
    tags = [];
    uid = sessionStorage.getItem('uid');



    // let fs = this.injector.get(FirestoreService) 

    async create() {
        let fs = this.injector.get(FirestoreService)
        await fs.add(this.className, this.clean());
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
