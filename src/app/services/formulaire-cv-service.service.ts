import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormulaireCvServiceService {

  constructor(private httpC: HttpClient) { }

  addDemandeStageEntreprise(demande_stage){
      return new Promise((resolve, reject) => {
        this.httpC.post(`${environment.api}/demandeEtudiantStageEntreprise/add`, {'id_offre_stage':demande_stage})
          .forEach(data =>{
            resolve(data)
          }
          ).catch((err) => {
            reject(err);
          });
      });
    };

    getListPostulations(id_etudiant : string)//testing form send
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/demandeEtudiantStageEntreprise/getAllPostulationsEtudiant/${id_etudiant}`)
        .forEach(data =>
          {
            resolve(data);
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }



}
