import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.page.html',
  styleUrls: ['./rates.page.scss'],
})
export class RatesPage implements OnInit {

  clinic_email;
  rates = [];
  starRating;
  comment = "";
  userFirstName;
  userLastName;



  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router,private toastService: ToastService,  private httpService:HttpService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        
        this.clinic_email= this.router.getCurrentNavigation().extras.state.clinic_email;
        
      }

      this.authService.userFirstName$.subscribe((res: any) => {
        this.userFirstName = res;
  
       });

       this.authService.userLastName$.subscribe((res: any) => {
        this.userLastName = res;

    });


    });

   }  

  ngOnInit() {
    this.httpService.getRate(this.clinic_email).then(res => {
      this.rates = JSON.parse(res.data);
    });
  }

  starRatingMethod(event){
    this.starRating = event.detail.value;
  }

  addComment(){
    const author = this.userFirstName + " " + this.userLastName;
    this.httpService.postRates(this.clinic_email,this.comment,author,this.starRating).then((res) => {
      this.toastService.presentToast(JSON.stringify(JSON.parse(res.data).message));
    });
    this.comment = "";
    this.starRating=null;
    this.ngOnInit();
  }

}
