import { Component, OnInit } from '@angular/core';
import {ToastService} from '../services/toast.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpdata = {
    firstName: '',
    lastName: '',
    age: null,
    contactNo: null,
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private toastService: ToastService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

    signUp() {
      // tslint:disable-next-line:max-line-length
        if (this.signUpdata.firstName === '' || this.signUpdata.lastName === '' || this.signUpdata.contactNo === '' || this.signUpdata.age === '' || this.signUpdata.email === '' || this.signUpdata.password === '' ||  this.signUpdata.confirmPassword === '' ) {

          this.toastService.presentToast('A field is empty. Only contact no is optional');
        } else {
          if (this.signUpdata.password === this.signUpdata.confirmPassword) {
            this.authService.signup(this.signUpdata).subscribe(
                (res: any) => {
                  this.router.navigate(['login']);
                  this.toastService.presentToast('You are registered. Please login with your credentials');
                },
                (error: any) => {
                  this.toastService.presentToast('You are not registered. Please try again later');
                });
          } else {
            this.toastService.presentToast('Something is wrong');
          }
        }
    }
}
