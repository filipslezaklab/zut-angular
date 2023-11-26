import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CLI imports router
import { AddPersonComponent } from './add-person/add-person.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent,
  },
  {
    path: 'details/:id', component: DetailsComponent,
  },
  {
    path: 'add', component: AddPersonComponent
  },
  {
    path: '', redirectTo: '/list', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent,
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
