import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StagiairesService {

  constructor(private httpC:HttpClient) {
  }

  getAllSatgiaresByOffre(id_responsable:string,id_offre_stage:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/stagiaires/getAllSatgiaresByOffre/${id_responsable}/${id_offre_stage}`)
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
