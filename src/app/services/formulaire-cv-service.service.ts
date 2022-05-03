import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormulaireCvServiceService {

  constructor(private httpC: HttpClient) { }

  addDemandeStageEntreprise(demande_stage :any){
      return new Promise((resolve, reject) => {
        this.httpC.post('http://localhost:5010/demandeEtudiantStageEntreprise/add', demande_stage)
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
      this.httpC.get(`http://localhost:5010/demandeEtudiantStageEntreprise/getAllPostulationsEtudiant/${id_etudiant}`)
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
