import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserFirstNameResolver {
    constructor(private authService: AuthService) {}

    resolve() {
        console.log('calls at home route');
        return this.authService.getFirstName();
    }

}
