import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-cancer-updates',
    templateUrl: './cancer-updates.page.html',
    styleUrls: ['./cancer-updates.page.scss'],
})
export class CancerUpdatesPage implements OnInit {


    constructor(private router: Router, private auth: AuthService) {
    }

    ngOnInit() {

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
