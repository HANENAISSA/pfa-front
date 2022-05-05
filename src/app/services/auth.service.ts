import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpC: HttpClient) {}

  signup(payload, id_role: number) {
    let role:string='etudiant';
    if(id_role==2)role='responsable'

    return new Promise((resolve, reject) => {
      this.httpC
        .post(`${environment.api}/auth/signup/${role}`, payload)
        .forEach(data =>
          resolve(data)
        )
        .catch((err) =>
          reject(err)
        );
    });
  }

  validate(hashedid: string) {

    return new Promise((resolve, reject) => {
      this.httpC
        .get(`${environment.api}/auth/validate/user/${hashedid}`)
        .forEach((data) => resolve(data))
        .catch((err) => {
          reject(err);
        });
    });
  }
  login(payload) {
    return new Promise((resolve, reject) => {
      this.httpC
        .post(`${environment.api}/auth/login`,payload)
        .forEach((data) =>
          resolve(data)
        )
        .catch((err) =>
          reject(err)
        );
    });
  }
}
