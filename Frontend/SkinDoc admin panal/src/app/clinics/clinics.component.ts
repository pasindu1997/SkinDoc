import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIService} from "../share/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicles',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicsComponent implements OnInit {
  clinics: Document[] = [];
  selectedClinicDetails: Document;

  clinicCurrentEmail:String;
  newClinicName: String;
  newClinicEmail: String;
  newRating:number;
  newDescription:String;
  newAddress:String;
  searchString: String;
  isAddingClinic:boolean;
  //initializing the APIService
  constructor(private apiService: APIService) { }

  //this method is called at the very first of the component life cycle
  ngOnInit() {
    this.getAllClinics();
  }
  //from this method it catches the responds and putting it to the vehicle array which is a Document array
  public getAllClinics(){
    this.apiService.getAllClinics().subscribe(
      res => {
        this.clinics = res;
      },
      error => {
        alert("Error, some thing has happened")
      }
    );
  }
  isHidden(){
    return this.isAddingClinic;
  }
  //from this i get the details of the selected clinics and putting it to a Document variable
  selectedClinic(clinic: Document) {
    this.selectedClinicDetails = clinic;
    this.isAddingClinic=true;
    this.clinicCurrentEmail = this.selectedClinicDetails["clinic_email"];
    this.newClinicName = this.selectedClinicDetails["skinClinicName"];
    this.newClinicEmail = this.selectedClinicDetails["clinic_email"];
    this.newRating = parseInt(this.selectedClinicDetails["current_rating"]);
    this.newDescription = this.selectedClinicDetails["description"];
    this.newAddress = this.selectedClinicDetails["address"];


  }
  isSelected(){
    return !this.selectedClinicDetails;
  }

  modifyClinicInfo(){
    if (confirm("Are you sure you want update this data?")) {
      this.apiService.modifyClinic(this.clinicCurrentEmail,this.newClinicEmail,this.newClinicName,this.newRating,this.newDescription,this.newAddress).subscribe(
        res=>{
          alert("you have Successfully modified the Clinic Data");
          this.ngOnInit();

        },error => {
          console.log(error);
          alert("An error has been occurred")
        }
      );
    }
  }

  DeleteClinic(){
    if (confirm("Are you sure you want Delete this Clinic?")) {

      this.apiService.deleteClinic(this.clinicCurrentEmail).subscribe( res=>{
        alert("You have successfully deleted the clinic");
        this.ngOnInit();

      },error => {
        console.log(error);
        alert("An error has been occurred")
      })
    }
  }

  prepareAddClinic() {
    location.reload();
    this.newClinicName = null;
    this.newClinicEmail = null;
    this.newRating = null;
    this.newDescription = null;
    this.newAddress = null;
    this.selectedClinicDetails = null;

  }

  addClinic() {
    if (confirm("Are you sure you want SAVE this Clinic?")) {
      if (this.newAddress != null && this.newClinicName != null && this.newClinicEmail != null && this.newRating != null && this.newDescription!= null){
        this.apiService.addNewClinic(this.newClinicEmail,this.newClinicName,this.newRating,this.newDescription,this.newAddress).subscribe(res =>{
          this.ngOnInit();
        })
      }else{
        alert("All the fields should be filled before saving")
      }

    }

  }
}
