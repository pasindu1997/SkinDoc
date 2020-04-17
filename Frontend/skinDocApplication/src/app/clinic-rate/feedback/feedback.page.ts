import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  form: FormGroup;


  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur'
      }),
      description: new FormControl(null, {
        updateOn: 'blur'
      }),

    });
  }

  onCreateOffer() {
    console.log(this.form);
  }



}
