import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import{JwtHelperService} from '@auth0/angular-jwt'; 
import { Observable, BehaviorSubject, from } from 'rxjs';
import{take,map,switchMap} from 'rxjs/operators';

const helper=new JwtHelperService();
const TOKEN_KEY='jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user : Observable<any>;
  private userData= new BehaviorSubject(null);

  constructor(private storage: Storage,private http:HttpClientModule,
    private plt:Platform , private router:Router) { 

    }

    loadStoredToken(){
      let PlatformObs=from(this.plt.ready());
      this.user=PlatformObs.pipe(
          switchMap(() => {
           return from (this.storage.get(TOKEN_KEY))
          }),
          map(token =>{
            console.log('token from storage:' ,token)
          })

      );
    }
}
