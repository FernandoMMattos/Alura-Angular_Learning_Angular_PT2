import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../components/container/container.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SeparatorComponent } from '../../components/separator/separator.component';
import { ContactsComponent } from '../../components/contacts/contacts.component';
import { FormContactComponent } from '../form-contact/form-contact.component';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../components/contacts/icontact';

@Component({
  selector: 'app-list-contact',
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderComponent,
    SeparatorComponent,
    ContactsComponent,
    FormsModule,
    FormContactComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.css',
})
export class ListContactComponent implements OnInit {
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  contacts: IContact[] = [];
  filterByText: string = '';

  constructor(private service: ContactService) {}

  ngOnInit() {
    this.service.getContacts().subscribe((listContacts) => {
      this.contacts = listContacts;
    });
  }

  private removeAccent(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterContactByText(): IContact[] {
    if (!this.filterByText) {
      return this.contacts;
    }
    return this.contacts.filter((contact) => {
      const contactName = contact.name ?? '';
      return this.removeAccent(contactName)
        .toLowerCase()
        .includes(this.removeAccent(this.filterByText).toLowerCase());
    });
  }

  filterContactByFirstLetter(letter: string): IContact[] {
    return this.filterContactByText().filter((contact) => {
      const contactName = contact.name ?? '';
      return this.removeAccent(contactName)
        .toLowerCase()
        .startsWith(this.removeAccent(letter).toLowerCase());
    });
  }
}
