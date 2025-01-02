import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactService } from '../contact.service';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class HomeComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchControl = new FormControl('');

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    this.setupSearch();
  }

  private loadContacts(): void {
    this.contacts = this.contactService.getContacts();
    this.filteredContacts = [...this.contacts];
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.filterContacts(value);
      }
    });
  }

  addContact(): void {
    const dialogRef = this.dialog.open(ContactModalComponent, {
      width: '400px',
      data: { contact: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contactService.addContact(result);
        this.loadContacts();
      }
    });
  }

  editContact(contact: Contact): void {
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
          this.loadContacts();
        }
      }
    });
  }

  deleteContact(contact: Contact): void {
    this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    this.contactService.saveContacts(this.contacts);
    this.loadContacts();
  }

  filterContacts(query: string): void {
    this.filteredContacts = query
      ? this.contacts.filter((contact) =>
          `${contact.firstName} ${contact.lastName} ${contact.phone}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : [...this.contacts];
  }

  viewContactDetail(contactId: number): void {
    this.router.navigate(['/contact', contactId]);
  }
}
