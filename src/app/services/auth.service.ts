import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpC: HttpClient) { }

  signupEtudiant(payload)
  {
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/auth/signup/etudiant`,payload)
        .forEach(data =>
          {resolve(data)}
        ).catch((err) => {
          reject(err);
        });
    });
  }

  validateEtudiant(hashedid:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/auth/validate/etudiant/${hashedid}`)
        .forEach(data =>
          {
            resolve(data)
          })
          .catch((err) => {
          reject(err);
        });
    });

  }
}
