import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthConstants} from '../config/auth-constants';
import {AuthService} from '../services/auth.service';
import {StorageService} from '../services/storage.service';

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
                private storageService: StorageService) {
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
                        console.log(JSON.stringify(this.storageService.get('userData')));
                        // this.router.navigate(['home/feed']);
                    } else {
                        console.log('incorrect password.');
                    }
                },
                (error: any) => {
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
