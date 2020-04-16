import { Injectable } from '@angular/core';
import { CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import{AlertController} from '@ionic/angular'
import { map, take } from 'rxjs/operators';
import { ok } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanLoad {
 
constructor(private auth :AuthService,private router:Router,private alertctrl : AlertController){
  
}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    throw new Error("Method not implemented.");
  }
canActivate(route :ActivatedRouteSnapshot){
        this.auth.user.pipe(
          take(1),
          map(user=>{
            console.log('in canactivate ',user)
            if(!user){
              this.alertctrl.create({
                header:'Unauthorized ',
                message:' you are not allowd access that page ',
                buttons:[]
              })

            }else{
              return true;
            }
          })
        )
}
   

  }
  

