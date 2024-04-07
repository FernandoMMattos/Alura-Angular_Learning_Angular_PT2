import { Routes } from '@angular/router';
import { FormContactComponent } from './pages/form-contact/form-contact.component';
import { ListContactComponent } from './pages/list-contact/list-contact.component';
import { ProfileContactComponent } from './pages/profile-contact/profile-contact.component';

export const routes: Routes = [
  {
    path: 'form',
    component: FormContactComponent,
  },
  {
    path: 'form/:id',
    component: FormContactComponent,
  },
  {
    path: 'list',
    component: ListContactComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileContactComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
