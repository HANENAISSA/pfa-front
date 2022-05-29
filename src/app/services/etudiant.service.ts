import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private httpC: HttpClient) { }


  updateEtudiant(etudiant){

    return new Promise((resolve, reject) => {

      this.httpC.put(`${environment.api}/etudiant/updatetudiant`, etudiant)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  delCvEtudiant(){
    return new Promise((resolve, reject) => {

      this.httpC.delete(`${environment.api}/cv/delete`)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

}
