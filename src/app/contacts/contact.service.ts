import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts';

  getContacts() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveContacts(contacts: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }
}
