import { Injectable } from '@angular/core';
import { Contact } from './models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts';

  getContacts(): Contact[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
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

  getContactById(id: number): Contact | undefined {
    const contacts = this.getContacts();
    return contacts.find((contact) => contact.id === id);
  }
}
