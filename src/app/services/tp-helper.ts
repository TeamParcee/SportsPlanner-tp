import { Injectable, ViewChild, } from '@angular/core';
import { AlertController, ModalController, LoadingController, PopoverController, ToastController, } from '@ionic/angular';
import { LoadingOptions, PopoverOptions, AlertInput } from '@ionic/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute } from '@angular/router';



@Injectable({
    providedIn: "root"
})

export class TPHelper {
    constructor(
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        private popoverCtrl: PopoverController,
        private toastCtrl: ToastController,
        private statusBar: StatusBar,
        private router: ActivatedRoute,
    ) { }

    private loading;




    routerOutlet;

    getNavParams(value) {
         let x = this.router.snapshot.paramMap;
         console.log('x', x);
         return x;


    }
    showAlert(header, message) {
        this.alertCtrl.create({
            header: header,
            message: message,
            buttons: ["OK"]
        }).then((alert) => {
            alert.present()
        })
    }

    showError(message) {
        this.alertCtrl.create({
            header: "There was a problem",
            message: message,
            buttons: ["OK"]
        }).then((alert) => {
            alert.present()
        })
    }

    async inputAlert(header, message, placeholder?: string,) {
        return new Promise(async (resolve) => {
            let input: AlertInput[] = [{
                name: "value",
                placeholder: placeholder,
            }];
            let alert = await this.alertCtrl.create({
                header: header,
                message: message,
                inputs: input,
                buttons: [{
                    text: "Cancel"
                }, {
                    text: "Save",
                    handler: () => {
                        alert.dismiss();
                    }
                }]
            })
            alert.present();
            alert.onDidDismiss().then((result) => {
                return resolve(result.data.values.value)
            })
        })

    }
    showConfirmationAlert(header, message, btnText) {
        return new Promise((resolve) => {
            this.alertCtrl.create({
                header: header,
                message: message,
                buttons: [{
                    text: "Cancel",
                    role: 'cancel',
                    cssClass: 'redBtn'
                }, {
                    text: btnText,
                    role: 'confirm',
                }]
            }).then((alert) => {
                alert.present();
                alert.onDidDismiss().then((result) => {
                    if (result.role == 'confirm') {
                        return resolve(true)
                    } else {
                        return resolve(false)
                    }
                })
            })
        })
    }

    showModal(component, componentProps?: {}, openFromModal?: boolean) {
        this.statusBar.styleLightContent();
        return new Promise(async (resolve) => {
            let main = document.getElementById('main');
            this.modalCtrl.create({
                component: component,
                componentProps: componentProps,
                swipeToClose: true,
                presentingElement: (openFromModal) ? await this.modalCtrl.getTop() : main,
            }).then((modal) => {
                modal.present();
                modal.onDidDismiss().then((returnObj) => {
                    this.statusBar.styleDefault();
                    return resolve(returnObj.data)
                })
            })
        })
    }

    closeModal(params?) {
        this.modalCtrl.dismiss(params);
    }

    closePopover(param?: any) {
        this.popoverCtrl.dismiss(param);
    }

    showLoading(opts?: LoadingOptions) {
        this.loadingCtrl.create(opts).then(loading => loading.present())
    }

    hideLoading() {
        this.loadingCtrl.dismiss()
    }

    showPopover(opts: PopoverOptions) {
        return new Promise((resolve) => {
            this.popoverCtrl.create(opts).then((popover) => {
                popover.present()
                popover.onDidDismiss().then((params) => {
                    return resolve(params.data)
                })
            })

        })
    }

    showToast(message: string, position: "top" | "middle" | "bottom") {
        position = (position == 'top') ? 'top' : 'bottom';
        this.toastCtrl.create({
            message: message,
            position: position,
            duration: 1500,
        }).then((toast) => {
            toast.present()
        })
    }
}