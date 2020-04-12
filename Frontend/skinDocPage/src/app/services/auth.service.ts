import { Injectable } from '@angular/core';


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
