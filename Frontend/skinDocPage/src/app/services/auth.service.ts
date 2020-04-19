import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import {AuthConstants} from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken$ = new BehaviorSubject<any>([]);
  userFirstName$ = new BehaviorSubject<any>([]);
  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) { }

  login(postData: { password: string; email: string }): Observable<any> {
    return this.httpService.post('login', postData);
  }

  signup(postData: any): Observable<any> {
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
}
