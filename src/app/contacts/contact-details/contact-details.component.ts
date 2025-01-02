import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContactService } from '../contact.service'; 
import { Contact } from '../models/contact'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');

    if (contactId) {
      this.contact = this.contactService.getContactById(+contactId);
    }
  }
}
