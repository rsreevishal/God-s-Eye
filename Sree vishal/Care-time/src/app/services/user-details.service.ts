import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  details = {
    name: null,
    email: null,
    mobile: null,
    password: null,
    friend:null
  };
  constructor() {
  }
}
