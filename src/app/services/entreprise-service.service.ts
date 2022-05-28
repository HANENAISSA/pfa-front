import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseServiceService {

  constructor(private httpC:HttpClient) {

  }

    getEntrpriseInfo()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/entreprise/getEntrepriseInfo`)
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
