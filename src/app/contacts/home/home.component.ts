import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports:[CommonModule, FormsModule, MatDialogModule]
})
export class HomeComponent {
  contacts: any[] = [];

  constructor(private dialog: MatDialog) {}

  addContact() {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '400px',
      data: { contact: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contacts.push(result);
      }
    });
  }
}
