import { Injectable } from '@angular/core';
import * as Materialize from "angular2-materialize";
import * as $ from "jquery";
// http://materializecss.com/dialogs.html

@Injectable()
export class ToastService {

    constructor() { }

    public success(message: string, duration: number = 3000) {
        this.showToast(message, duration, 'green darken-3')
    }
    public fail(message: string, duration: number = 10000) {
        this.showToast(message, duration, 'red darken-4');
    }


    private showToast(message: string, duration: number = 2000, style: string = null) {
        Materialize.toast(message, duration, style);
    }
    private showDismissableToast(message: string, duration: number = 2000) {
        Materialize.toast(message, null, 'red darken-3');  // 1 minute
    }
    private showToastRounded(message: string, duration: number = 2000) {
        Materialize.toast(message, duration, 'rounded');
    }
    private showToastWithCallback(message:string, duration: number = 2000) {
        Materialize.toast(message, duration, '', function(){alert('Your toast was dismissed')})

    }
}