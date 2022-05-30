import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StagiairesService {

  constructor(private httpC:HttpClient) {
  }

  getAllSatgiares()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/stagiaires/get/all`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }


  deleteStagiaire(id_demande:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.delete(`${environment.api}/stagiaires/delete/${id_demande}`)
        .forEach(data =>
          {
            resolve(data)
          }
        ).catch((err) => {
          reject(err);
        });
    });
  }


  getMeStages()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/stagiaires/get/mes`)
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
