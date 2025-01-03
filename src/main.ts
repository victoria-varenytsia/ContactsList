import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    importProvidersFrom(MatDialogModule, ReactiveFormsModule),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));