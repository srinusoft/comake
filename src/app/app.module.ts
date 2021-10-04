import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsOverviewComponent } from './events/containers/events-overview/events-overview.component';
import { SubscribeEventComponent } from './events/containers/subscribe-event/subscribe-event.component';


@NgModule({
  declarations: [
    AppComponent,
    EventsOverviewComponent,
    SubscribeEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
