
import { Injectable } from '@angular/core';
import { Contact } from './models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts';

  private initialContacts: Contact[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+380123456789',
      email: 'john.doe@example.com',
      dateOfBirth: new Date('1990-01-01'),
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+380987654321',
      email: 'jane.smith@example.com',
      dateOfBirth: new Date('1985-05-15'),
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      phone: '+380812345678',
      email: 'alice.johnson@example.com',
      dateOfBirth: new Date('1992-07-20'),
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
      phone: '+380852345678',
      email: 'bob.brown@example.com',
      dateOfBirth: new Date('1980-11-30'),
    },
  ];

  getContacts(): Contact[] {
    const contacts = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    if (contacts.length === 0) {
      this.saveContacts(this.initialContacts);
      return this.initialContacts;
    }
    return contacts;
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();

    let newId = 1;
    if (contacts.length > 0) {
      const validIds = contacts.filter(
        (c) => typeof c.id === 'number' && !isNaN(c.id)
      );
      if (validIds.length > 0) {
        newId = Math.max(...validIds.map((c) => c.id)) + 1;
      }
    }

    contact.id = newId;
    contacts.push(contact);
    this.saveContacts(contacts);
  }
  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  getContactById(id: number): Contact | undefined {
    const contacts = this.getContacts();
    return contacts.find((contact) => contact.id === id);
  }
}
