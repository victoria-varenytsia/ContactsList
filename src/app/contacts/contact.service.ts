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

  private getStoredContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  public saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  getContacts(): Contact[] {
    const contacts = this.getStoredContacts();
    return contacts;
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    contact.id = this.generateNewId(contacts);
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  private generateNewId(contacts: Contact[]): number {
    const validIds = contacts.filter(
      (c) => typeof c.id === 'number' && !isNaN(c.id)
    );
    return validIds.length > 0 ? Math.max(...validIds.map((c) => c.id)) + 1 : 1;
  }

  getContactById(id: number): Contact | undefined {
    return this.getContacts().find((contact) => contact.id === id);
  }

  updateContact(updatedContact: Contact): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === updatedContact.id
    );
    if (index > -1) {
      contacts[index] = { ...updatedContact };
      this.saveContacts(contacts);
    }
  }
}
