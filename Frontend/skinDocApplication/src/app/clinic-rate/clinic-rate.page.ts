import { Component, OnInit } from '@angular/core';
import {skinClinic} from "../inquire-skin-clinic/skinClinic.model";
import {InquireSkinClinicService} from "../inquire-skin-clinic/inquire-skin-clinic.service";

@Component({
  selector: 'app-clinic-rate',
  templateUrl: './clinic-rate.page.html',
  styleUrls: ['./clinic-rate.page.scss'],
})
export class ClinicRatePage implements OnInit {
  loadedPlaces: skinClinic[];

  constructor(private placesService: InquireSkinClinicService) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.clinics;

  }

}
