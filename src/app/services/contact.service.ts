import { Injectable } from '@angular/core';
import { IContact } from '../components/contacts/icontact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly API = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.API);
  }

  saveContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.API, contact);
  }

  getById(id: number): Observable<IContact> {
    const url = `${this.API}/${id}`;
    return this.http.get<IContact>(url);
  }

  removeContact(id: number): Observable<IContact> {
    const url = `${this.API}/${id}`;
    return this.http.delete<IContact>(url);
  }

  editContact(contact: IContact): Observable<IContact> {
    const url = `${this.API}/${contact.id}`;
    return this.http.put<IContact>(url, contact);
  }

  editOrSaveContact(contact: IContact): Observable<IContact> {
    if (contact.id) {
      return this.editContact(contact);
    } else {
      return this.saveContact(contact);
    }
  }
}
