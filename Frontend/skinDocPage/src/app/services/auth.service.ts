import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private storage: Storage,private http:HttpClient,
    private plt:Platform , private router:Router) { 

    }

    loadStoredToken(){
      let PlatformObs=from(this.plt.ready());
      this.user=PlatformObs.pipe(
          switchMap(() => {
           return from (this.storage.get(TOKEN_KEY))
          }),
          map(token =>{
            console.log('token from storage:' ,token);
            if (token){
            let decoded = helper.decodeToken();
              console.log('decoded' ,decoded);
              this.userData.next(decoded );

            }else{
              return null;
            }
          })
      );
    }
    login(Credentials:{email:String,pw:String }) :Observable<any> {
      if(Credentials.email !=  'gayalhirushan80@gmail.com' || Credentials.pw != '123'){
        return (null);
      }

      return this.http.get('https://randomuser.me/api/').pipe(
        take(1),
        map(res => {
          return 'kvhsiovjiowkdfopdiasopDKqopfkcp[skDMjiq;ofc90oerpjhntkfm,bmcjoaspjcxipajidpowqifdpKOQDOPQWKCOWE[O';    
        }),
        switchMap(token =>{
          let decoded = helper.decodeToken( token);
          console.log(' logi decoded' ,decoded);
          this.userData.next(decoded );

          this.storage.set(TOKEN_KEY,token)
          return DataCue;

          let storageObs= from (this.storage.set(TOKEN_KEY,token));
          return storageObs;

        })

      );

      
    }
    getUser(){
      return  this.userData.getValue();

    }
    logout(){
      this.storage.remove(TOKEN_KEY).then (() =>{
        this.router.navigateByUrl('/');
        this.userData.next(null);

      });
    }


}
