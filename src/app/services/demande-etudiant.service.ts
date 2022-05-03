import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeEtudiant } from '../models/demande-etudiant';

@Injectable({
  providedIn: 'root'
})
export class DemandeEtudiantService {

  constructor(private httpC: HttpClient) { }

  addDemande(demande : DemandeEtudiant){
    return new Promise((resolve, reject) => {
      this.httpC.post('http://localhost:5010/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/add', demande)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  updateDemande(demande : DemandeEtudiant){

    return new Promise((resolve, reject) => {

      this.httpC.patch('http://localhost:5010/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/patch', demande)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteDemande(id_demande: string){
      return new Promise((resolve, reject) => {
        this.httpC.delete(`http://localhost:5010/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/delete/${id_demande}`)
          .forEach(data =>
            resolve(data)
          ).catch((err) => {
            reject(err);
          });
      });
  }

  getListDemande(id_etudiant : string,etatDemande:string,year:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`http://localhost:5010/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/${id_etudiant}/${etatDemande}/${year}`)
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
