import { Component, OnInit } from '@angular/core';
import {InquireSkinClinicService} from './inquire-skin-clinic.service';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';
import {AuthService} from '../services/auth.service';
import {Router, NavigationExtras} from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inquire-skin-clinic',
  templateUrl: './inquire-skin-clinic.page.html',
  styleUrls: ['./inquire-skin-clinic.page.scss'],
})
export class InquireSkinClinicPage implements OnInit {
  clinics = [];
  images=[];

  public userDetails = {
    userFirstName: null, userLastName: null, userAge: null, userContactNo: null, userEmail: null
  }

  constructor(private alertCtrl: AlertController,private router: Router,private placesService: InquireSkinClinicService, private httpService:HttpService,private toastService: ToastService,private authService: AuthService) { 
    this.httpService.getClinics().then((res) => {
      this.clinics = JSON.parse(res.data);
    }),(err)=>{
      this.toastService.presentToast("A error has been occured");
    }
  }

  ngOnInit() {
    this.authService.userFirstName$.subscribe((res: any) => {
      this.userDetails.userFirstName = res;

     });
    this.authService.userLastName$.subscribe((res: any) => {
        this.userDetails.userLastName = res;

    });
    this.authService.userAge$.subscribe((res: any) => {
        this.userDetails.userAge = parseInt(res) ;

    });

    this.authService.userContactNo$.subscribe((res: any) => {
        this.userDetails.userContactNo = parseInt(res);

    });
    this.authService.userEmail$.subscribe((res: any) => {
        this.userDetails.userEmail = res;

    });
  }

  async inquireSkinClinicPrompt(index){
    const confirm = await this.alertCtrl.create({
            message: 'Do you agree to get treatments from this clinic?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                      this.inquireClinic(index)
                    }
                }
            ]
        });
        await confirm.present();

  }

  inquireClinic(index){
    this.httpService.getImages(this.userDetails.userEmail).then((res) => {
      this.images = JSON.parse(res.data) ;
      this.httpService.sendEmail(this.clinics[index].clinic_email,this.userDetails,this.images).then((res) =>{
        this.toastService.presentToast(JSON.stringify(JSON.parse(res.data).message));
      });
    }).catch(err=>{
      this.toastService.presentToast("Error has been occured");
    });

   
    
  }

  ratesPage(index) {
    
    let navigationExtras: NavigationExtras = {
      state: {
        clinic_email: this.clinics[index].clinic_email
      }
    }
    this.router.navigate(['/inquire-skin-clinic/rates'],navigationExtras);
  }



}
