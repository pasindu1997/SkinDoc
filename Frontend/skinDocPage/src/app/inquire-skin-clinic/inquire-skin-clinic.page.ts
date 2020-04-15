import { Component, OnInit } from '@angular/core';
import {InquireSkinClinicService} from './inquire-skin-clinic.service';
import {skinClinic} from './skinClinic.model';

@Component({
  selector: 'app-inquire-skin-clinic',
  templateUrl: './inquire-skin-clinic.page.html',
  styleUrls: ['./inquire-skin-clinic.page.scss'],
})
export class InquireSkinClinicPage implements OnInit {
  loadedPlaces: skinClinic[];

  constructor(private placesService: InquireSkinClinicService) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.clinics;
  }

}
