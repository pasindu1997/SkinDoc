import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import {AuthConstants} from '../config/auth-constants';
import { HTTPResponse, HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken$ = new BehaviorSubject<any>([]);
  userFirstName$ = new BehaviorSubject<any>([]);
  userLastName$ = new BehaviorSubject<any>([]);
  userAge$ = new BehaviorSubject<any>([]);
  userContactNo$ = new BehaviorSubject<any>([]);
  userEmail$ = new BehaviorSubject<any>([]);

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) { }

  login(postData: { password: string; email: string }):Promise<HTTPResponse> {
    return this.httpService.post('login', postData);
  }

  signup(postData: any): Promise<HTTPResponse> {
    return this.httpService.postSignUp('signup', postData);
  }


  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.userToken$.next('');
      this.router.navigate(['/login']);
    });
  }

  getToken() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userToken$.next(res);
    });
  }
  getFirstName() {
    this.storageService.get('firstName').then(res => {
      this.userFirstName$.next(res);
    });
  }

  getLastName() {
    this.storageService.get('lastName').then(res => {
      this.userLastName$.next(res);
    });
  }

  getAge() {
    this.storageService.get('age').then(res => {
      this.userAge$.next(res);
    });
  }

  getContactNo() {
    this.storageService.get('contactNo').then(res => {
      this.userContactNo$.next(res);
    });
  }

  getEmail() {
    this.storageService.get('email').then(res => {
      this.userEmail$.next(res);
    });
  }
}
