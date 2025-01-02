import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './contacts/home/home.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact/:id', component: ContactDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
