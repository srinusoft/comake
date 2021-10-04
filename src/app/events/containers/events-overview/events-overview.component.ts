import { Component, OnInit } from '@angular/core';
import *  as  allEventsJsonData from '../../data/allEvents.json';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-events-overview',
  templateUrl: './events-overview.component.html',
  styleUrls: ['./events-overview.component.scss']
})
export class EventsOverviewComponent implements OnInit {

  showEvents = [];
  originalEvents = [];
  uniqueDates = [];
  categories = [];
  eventName: string;
  selectedCategory: string;
  selectedDate: string;
  byDate: string;
  byName: string;
  selected_eventName: string;
  selected_eventdate: string;
  selected_category: string;


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.originalEvents = (allEventsJsonData as any).events;
    this.route.queryParams.subscribe(params => {
      console.log("params", params);
      this.selected_eventName = params['eventname'];
      this.selected_eventdate = params['date'];
      this.selected_category = params['category'];
    });
    this.originalEvents.map(ele => ele.name == this.selected_eventName &&
      ele.category == this.selected_category &&
      moment(ele.eventDate).format("DD-MM-YYYY") === this.selected_eventdate)

    for (let i = 0; i < this.originalEvents.length; i++) {

      if (this.originalEvents[i].name == this.selected_eventName &&
        this.originalEvents[i].category == this.selected_category &&
        moment(this.originalEvents[i].eventDate).format("DD-MM-YYYY") === this.selected_eventdate) {
        this.originalEvents[i] = Object.assign({ "subscribed": true }, this.originalEvents[i])
      }
    }
    console.log("new array", this.originalEvents);
    this.showEvents = this.originalEvents;
    let tempDates = this.originalEvents.map((element) => moment(element.eventDate).format("DD-MM-YYYY"));
    console.log(tempDates);
    this.uniqueDates = [...new Set(tempDates)];
    console.log(this.uniqueDates);
    this.categories = [...new Set(this.originalEvents.map((ele) => ele.category))];

  }

  sortDate(): void {
    this.showEvents = this.originalEvents;

    if (this.byDate == "Oldest") {
      this.showEvents.sort(function (a, b) {
        if (new Date(a.eventDate) > new Date(b.eventDate)) return 1;
        if (new Date(a.eventDate) < new Date(b.eventDate)) return -1;
        return 0;
      });
    }

    else if (this.byDate == "Latest") {
      this.showEvents.sort(function (a, b) {
        if (new Date(a.eventDate) > new Date(b.eventDate)) return -1;
        if (new Date(a.eventDate) < new Date(b.eventDate)) return 1;
        return 0;
      });
    }
  }

  sortName(): void {
    if (this.byName == "AtoZ") {
      this.showEvents = this.originalEvents.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    }

    else if (this.byName == "ZtoA") {
      this.showEvents = this.originalEvents.sort(function (a, b) {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });

    }
  }

  onDateChange() {
    if (this.selectedDate != "Select")
      this.showEvents = this.originalEvents.filter((ele) => (moment(ele.eventDate).format("DD-MM-YYYY") == this.selectedDate));
    else
      this.showEvents = this.originalEvents;
  }

  oncategoryChange() {
    if (this.selectedCategory != "Select")
      this.showEvents = this.originalEvents.filter((ele) => (ele.category == this.selectedCategory));
    else
      this.showEvents = this.originalEvents;
  }

  searchEventName(): void {
    console.log("eventname", this.eventName);
    this.showEvents = [];
    this.selectedDate = "Select";
    this.selectedCategory = "Select";
    this.byName = "Select";
    this.byDate = "Select";
    this.showEvents = this.originalEvents;
    if (this.eventName != '')
      this.showEvents = this.originalEvents.filter(obj => ((obj.name.toLowerCase()).includes(this.eventName.toLowerCase())));
  }

  callSubscribe() {
    this.router.navigate(['/subscribe']);

  }
}
