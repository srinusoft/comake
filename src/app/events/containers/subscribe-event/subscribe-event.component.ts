import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import *  as  allEventsJsonData from '../../data/allEvents.json';
import * as moment from 'moment';

@Component({
  selector: 'app-subscribe-event',
  templateUrl: './subscribe-event.component.html',
  styleUrls: ['./subscribe-event.component.scss']
})
export class SubscribeEventComponent implements OnInit {

  public subscribeForm: FormGroup = new FormGroup({});
  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';//'^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public phoneNumber = "^((\\+91-?)|0)?[0-9]{10}$";
  public editObj;
  maxdate: any;
  mindate: any;
  originalEvents = [];
  uniqueDates = [];
  categories = [];
  eventNames = [];

  constructor(private fb: FormBuilder,

    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.originalEvents = (allEventsJsonData as any).events;
    let tempDates = this.originalEvents.map((element) => moment(element.eventDate).format("DD-MM-YYYY"));
    console.log(tempDates);
    this.uniqueDates = [...new Set(tempDates)];
    console.log(this.uniqueDates);
    this.categories = [...new Set(this.originalEvents.map((ele) => ele.category))];
    this.eventNames = [...new Set(this.originalEvents.map((ele) => ele.name))];
    this.createEventForm();
    this.mindate = new Date('1900-01-01');
    this.maxdate = new Date();

  }

  createEventForm() {
    this.subscribeForm = this.fb.group({
      name: ['', Validators.required],
      emailval: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      DOB: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      eventname: ['', Validators.required],
      eventdate: ['', Validators.required],
      eventcategory: ['', Validators.required],
    })
  }

  onSubscribe() {

    if (this.subscribeForm.valid) {
      this.router.navigate(['/'], {
        queryParams: {
          "eventname": this.subscribeForm.value.eventname,
          "date": this.subscribeForm.value.eventdate,
          "category": this.subscribeForm.value.eventcategory
        }
      });
      this.subscribeForm.reset();
    }
    else {
      this.markFormGroupTouched(this.subscribeForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {

    (Object as any).values(formGroup.controls).forEach((control: FormGroup) => {

      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    })
  }
  hasError(controlName: string, errorName: string) {

    return this.subscribeForm.controls[controlName].hasError(errorName)
  }

  gotoList() {
    this.router.navigate(['/']);
  }
}
