import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  @Input() name: string = '';
  @Input() number: string = '';
  @Input() id?: number;
  @Input() avatar?: string | ArrayBuffer = '';

  constructor() {}
}
