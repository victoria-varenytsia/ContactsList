import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class ContactModalComponent {
  contactForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data?.contact;
    this.contactForm = this.fb.group({
      firstName: [data?.contact?.firstName || '', Validators.required],
      lastName: [data?.contact?.lastName || '', Validators.required],
      phone: [
        data?.contact?.phone || '',
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
    });
  }

  saveContact() {
    if (this.contactForm.valid) {
      this.dialogRef.close(this.contactForm.value);
    }
  }
}
