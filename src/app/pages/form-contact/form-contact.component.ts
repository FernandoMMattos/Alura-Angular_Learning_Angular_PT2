import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { SeparatorComponent } from '../../components/separator/separator.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { MessageErrorComponent } from '../../components/message-error/message-error.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [
    ContainerComponent,
    SeparatorComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MessageErrorComponent,
    HeaderComponent
  ],
  templateUrl: './form-contact.component.html',
  styleUrl: './form-contact.component.css',
})
export class FormContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private service: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      number: new FormControl('', [
        Validators.required,
        Validators.pattern(''),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      avatar: new FormControl(''),
      birthday: new FormControl(''),
      socials: new FormControl(''),
      obs: new FormControl(''),
    });
    this.loadContact();
  }

  loadContact() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.service.getById(parseInt(id)).subscribe((contact) => {
        this.contactForm.patchValue(contact);
      });
  }

  saveContact() {
    const newContact = this.contactForm.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    newContact.id = id ? parseInt(id) : null;
    this.service.editOrSaveContact(newContact).subscribe(() => {
      this.contactForm.reset();
      this.router.navigateByUrl('/list');
    });
  }

  cancel() {
    this.contactForm.reset();
    this.router.navigateByUrl('/list');
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result)
        this.contactForm.get('avatar')?.setValue(reader.result);
    };
    reader.readAsDataURL(file);
  }

  onSelectFile(e: any) {
    const file: File = e.target.files[0];
    if (file) this.readFile(file);
  }

  obtainControl(name: string): FormControl {
    const control = this.contactForm.get(name);
    if (!control) throw new Error('Form Control not found' + name);
    return control as FormControl;
  }
}
