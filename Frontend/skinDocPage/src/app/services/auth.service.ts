import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import{JwtHelperService} from '@auth0/angular-jwt'; 


const helper=new JwtHelperService();
const TOKEN_KEY='jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage,private http:HttpClientModule,
    private plt:Platform , private router:Router) { 

    }
}
