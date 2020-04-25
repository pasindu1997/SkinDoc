import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    reqobj: any = null;
    postData = {
        email: '',
        password: ''
    };

    constructor(private router: Router,
        private authService: AuthService,
        private storageService: StorageService,
        private toastService: ToastService) {
    }

    validateInputs() {
        const username = this.postData.email.trim();
        const password = this.postData.password.trim();
        return (
            this.postData.email &&
            this.postData.password &&
            username.length > 0 &&
            password.length > 0
        );
    }

    loginAction() {
        if (this.validateInputs()) {

            this.authService.login(this.postData).then(res => {

                this.reqobj = JSON.parse(res.data);
                console.log(res.status);
                //Storing the User data.
                this.storageService.store(AuthConstants.AUTH, this.reqobj.token);
                this.storageService.store('firstName', this.reqobj.userDetails.firstName);
                this.storageService.store('lastName', this.reqobj.userDetails.lastName);
                this.storageService.store('age', this.reqobj.userDetails.age);
                this.storageService.store('contactNo',this.reqobj.userDetails.contactNo);
                this.storageService.store('email', this.reqobj.userDetails.email);
                this.router.navigate(['cancer-updates']);

            }).catch(err => { this.toastService.presentToast('Invalid Credentials') });
            
        } else {
            this.toastService.presentToast('Email or Password is empty');
        }
    }
}
