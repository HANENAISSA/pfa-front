import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatureEtudiantService {

  constructor(private httpC: HttpClient) { }

  getListCandidature(etat:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/demande/entreprise/get/all/${etat}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }


  sendMail(payload)
  {
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/confirmation/demande/send/email`,payload)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }

  updateCandidatureVue(id:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.put(`${environment.api}/demande/entreprise/update/vuedemande/${id}`,null)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }

}
