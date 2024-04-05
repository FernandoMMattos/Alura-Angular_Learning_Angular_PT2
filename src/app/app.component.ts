import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FormsModule } from '@angular/forms';
import agenda from './agenda.json';

interface Contact {
  id: number;
  name: string;
  number: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    HeaderComponent,
    SeparatorComponent,
    ContactsComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  contacts: Contact[] = agenda;
  filterByText: string = '';

  private removeAccent(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filterContactByFirstLetter(letter: string): Contact[] {
    return this.filterContactByText().filter((contact) => {
      return contact.name
        .toLowerCase()
        .startsWith(this.removeAccent(letter).toLowerCase());
    });
  }

  filterContactByText(): Contact[] {
    if (!this.filterByText) {
      return this.contacts;
    }
    return this.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(this.removeAccent(this.filterByText).toLowerCase());
    });
  }
}
