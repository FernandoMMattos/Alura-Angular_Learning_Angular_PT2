import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message-error',
  standalone: true,
  imports: [],
  templateUrl: './message-error.component.html',
  styleUrl: './message-error.component.css',
})
export class MessageErrorComponent {
  @Input() control!: FormControl;
}
