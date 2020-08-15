import { Injector } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

export class Video {

    private className = "videos";
    private injector = Injector.create({ providers: [{ provide: FirestoreService }] });
    
    id;
    name;
    uid = sessionStorage.getItem('uid');
    url;
    poster = "";
    loading = 1;
    videoStoragePath;
    posterStoragePath;



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
