import { Routes } from '@angular/router';
import { MembersListComponent } from './components/members-list/members-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {AddMemberComponent} from './components/add-member/add-member.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { MemberComponent } from './components/member/member.component';
import {AddEnrollmentComponent} from './components/add-enrollment/add-enrollment.component';
import {ShowFilesComponent} from './components/show-files/show-files.component';
import {EventsListComponent} from './components/event-list/event-list.component';
import {EventComponent} from './components/event/event.component';
import {AddEventComponent} from './components/add-event/add-event.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome page',
    component: HomePageComponent,
  },
  {
    path: 'members',
    title: 'Member List',
    component: MembersListComponent,
  },
  {
    path: 'add-member',
    title: 'Add Member',
    component: AddMemberComponent,
  },
  {
    path: 'entry-form',
    title: 'become a member',
    component: EntryFormComponent,
  },
  {
    path: 'members/:id',
    title: 'member info page',
    component:  MemberComponent
  },
  {
    path: 'members/:id/add-enrollment',
    title: 'member certificate form',
    component:  AddEnrollmentComponent
  },
  {
    path: 'members/:id/show-files',
    title: 'member files',
    component:  ShowFilesComponent
  },
  {
    path: 'events',
    title: 'Events List',
    component:  EventsListComponent
  },
  {
    path: 'events/:id',
    title: 'event info page',
    component:  EventComponent
  },
  {
    path: 'add-event',
    title: 'event form page',
    component:  AddEventComponent
  }

];

