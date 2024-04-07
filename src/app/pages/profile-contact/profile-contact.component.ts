import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { IContact } from '../../components/contacts/icontact';
import { SeparatorComponent } from '../../components/separator/separator.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-profile-contact',
  standalone: true,
  imports: [
    ContainerComponent,
    SeparatorComponent,
    RouterLink,
    HeaderComponent,
  ],
  templateUrl: './profile-contact.component.html',
  styleUrl: './profile-contact.component.css',
})
export class ProfileContactComponent implements OnInit {
  @Input() id?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ContactService,
    private router: Router
  ) {}

  contact: IContact = {
    id: 0,
    name: '',
    number: '',
    email: '',
    birthday: '',
    socials: '',
    avatar: '',
  };

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id)
      this.service.getById(parseInt(id)).subscribe((contact) => {
        this.contact = contact;
      });
  }

  deleteContact() {
    if (this.contact.id)
      this.service.removeContact(this.contact.id).subscribe(() => {
        this.router.navigateByUrl('/list');
      });
  }
}
