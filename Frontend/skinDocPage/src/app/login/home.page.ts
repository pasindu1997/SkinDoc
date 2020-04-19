import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthConstants} from '../config/auth-constants';
import {AuthService} from '../services/auth.service';
import {StorageService} from '../services/storage.service';
import {ToastService} from '../services/toast.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
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

            this.authService.login(this.postData).subscribe(
                (res: any) => {
                    console.log(this.postData);

                    if (res.message) {
                        console.log(res.token);
                        // Storing the User data.
                        this.storageService.store(AuthConstants.AUTH, res.token);
                        this.storageService.store('firstName', res.userDetails.firstName);
                        this.storageService.store('lastName', res.userDetails.lastName);
                        this.storageService.store('age', res.userDetails.age);
                        this.storageService.store('contactNo', res.userDetails.contactNo);
                        this.storageService.store('email', res.userDetails.email);
                        console.log(this.storageService.get('firstName'));
                        this.router.navigate(['cancer-updates']);
                    } else {
                        console.log('incorrect password.');
                    }
                },
                (error: any) => {
                    if (error.status === 401) {
                        this.toastService.presentToast('Invalid Credentials');
                    }
                    if (error instanceof ErrorEvent) {
                        console.error('Client side error: ' , error.message);
                    } else {
                        console.log('Server Side error: ', error.message);
                    }
                }
            );
        } else {
            console.log('Please enter email/username or password.');
        }
    }
}
