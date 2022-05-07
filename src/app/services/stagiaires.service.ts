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
      this.httpC.get(`${environment.api}/stagiaires/getAllSatgiares`)
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
