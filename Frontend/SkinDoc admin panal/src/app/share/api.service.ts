import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class APIService {
  private BASE_CLINICS = `http://localhost:3000`;
  private ALL_CLINICS = `${this.BASE_CLINICS}\\clinics`;
  private MODIFYCLINIC = `${this.BASE_CLINICS}\\clinics\\modify`;
  private DELETECLINIC = `${this.BASE_CLINICS}\\clinics\\delete`;

  constructor(private http: HttpClient) {

  }
  //requesting the clinics from the backend and returning it as a observable Document array
  getAllClinics(): Observable<Document[]>{
    return this.http.get<Document[]>(this.ALL_CLINICS);
  }

  modifyClinic(currentEmail,modifiedEmail,modifiedName, modifiedRating,modifiedDes,modifiedAddress){
    return this.http.post(this.MODIFYCLINIC,{current_email:currentEmail,clinic_email:modifiedEmail,skinClinicName:modifiedName, current_rating: modifiedRating, description: modifiedDes,address:modifiedAddress})
  }

  deleteClinic(clinicEmail){
    return this.http.post(this.DELETECLINIC,{clinic_email:clinicEmail});
  }

  addNewClinic(newEmail,newClinicName,newClinicRating,newClinicDes,newClinicAddress){
    return this.http.post(this.ALL_CLINICS,{clinic_email:newEmail, skinClinicName:newClinicName,current_rating:newClinicRating,description:newClinicDes,address:newClinicAddress})
  }
}
