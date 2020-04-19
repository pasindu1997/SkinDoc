import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-cancer-updates',
    templateUrl: './cancer-updates.page.html',
    styleUrls: ['./cancer-updates.page.scss'],
})
export class CancerUpdatesPage implements OnInit {
    public userToken: any;
    public userFirstName: any;

    constructor(private router: Router, private auth: AuthService) {
    }

    ngOnInit() {

        this.auth.userToken$.subscribe((res: any) => {
            this.userToken = res;
            console.log(this.userToken);
        });
        this.auth.userFirstName$.subscribe((res: any) => {
            this.userFirstName = res;
            console.log(this.userFirstName);
        });
    }


    onGoToNewsSinglePage() {
        this.router.navigate(['/cancer-updates/news-single']);
    }

    onGoToNewsSecondPage() {
        this.router.navigate(['/cancer-updates/news-second']);
    }

    onGoToNewsThirdPage() {
        this.router.navigate(['/cancer-updates/news-third']);
    }

}
