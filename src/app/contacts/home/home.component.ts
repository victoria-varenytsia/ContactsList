import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms'; 
import { ContactService } from '../contact.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { Contact } from '../models/contact';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class HomeComponent {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchControl = new FormControl('');
  constructor(
    private dialog: MatDialog,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts(); 
    this.filteredContacts = [...this.contacts]; 
    this.searchControl.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.filterContacts(value);
      }
    });
  }

  addContact() {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '400px',
      data: { contact: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contactService.addContact(result); 
        this.contacts = this.contactService.getContacts(); 
        this.filteredContacts = [...this.contacts]; 
      }
    });
  }

  editContact(contact: any) {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '400px',
      data: { contact },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.contacts.findIndex((c) => c.id === contact.id);
        if (index > -1) {
          this.contacts[index] = result; 
          this.contactService.saveContacts(this.contacts); 
          this.filteredContacts = [...this.contacts]; 
        }
      }
    });
  }

  deleteContact(contact: any) {
    this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    this.contactService.saveContacts(this.contacts); 
    this.filteredContacts = [...this.contacts]; 
  }

  filterContacts(query: string) {
    if (query) {
      this.filteredContacts = this.contacts.filter((contact: any) =>
        `${contact.firstName} ${contact.lastName} ${contact.phone}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    } else {
      this.filteredContacts = [...this.contacts]; 
    }
  }

  viewContactDetail(contactId: number) {
    this.router.navigate(['/contact', contactId]); 
  }
}
