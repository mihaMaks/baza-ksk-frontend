import { Routes } from '@angular/router';
import { MembersListComponent } from './components/members-list/members-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {AddMemberComponent} from './components/add-member/add-member.component';
import { EntryFormComponent } from './components/entry-form/entry-form.component';
import { MemberComponent } from './components/member/member.component';

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
  }
];

