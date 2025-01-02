import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from "./contacts/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatFormFieldModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'contact-list-app';
}
