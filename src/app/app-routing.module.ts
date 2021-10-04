import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsOverviewComponent } from './events/containers/events-overview/events-overview.component';
import { SubscribeEventComponent } from './events/containers/subscribe-event/subscribe-event.component';

const routes: Routes = [{ path: "", component: EventsOverviewComponent },

{path:"subscribe",component:SubscribeEventComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
