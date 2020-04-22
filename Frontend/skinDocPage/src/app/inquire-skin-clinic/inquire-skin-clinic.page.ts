import { Component, OnInit } from '@angular/core';
import {InquireSkinClinicService} from './inquire-skin-clinic.service';
import { HttpService } from '../services/http.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-inquire-skin-clinic',
  templateUrl: './inquire-skin-clinic.page.html',
  styleUrls: ['./inquire-skin-clinic.page.scss'],
})
export class InquireSkinClinicPage implements OnInit {
  clinics = [];

  constructor(private placesService: InquireSkinClinicService, private httpService:HttpService,private toastService: ToastService) { 
    this.httpService.getClinics().then((res) => {
      this.clinics = JSON.parse( res.data);
    }),(err)=>{
      this.toastService.presentToast("A error has been occured");
    }
  }

  ngOnInit() {

  }

  inquireClinic(index){
    // this.toastService.presentToast(index);
    this.toastService.presentToast(this.clinics[index].skinClinicName);
    
  }


}
