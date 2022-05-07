import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeEtudiant } from '../models/demande-etudiant';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeEtudiantService {

  constructor(private httpC: HttpClient) { }

  addDemande(demande : DemandeEtudiant){
    return new Promise((resolve, reject) => {
      this.httpC.post('${environment.api}/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/add', demande)
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

      this.httpC.patch(`${environment.api}/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/patch`, demande)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteDemande(id_demande: string){
      return new Promise((resolve, reject) => {
        this.httpC.delete(`${environment.api}/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/delete/${id_demande}`)
          .forEach(data =>
            resolve(data)
          ).catch((err) => {
            reject(err);
          });
      });
  }

  getListDemande(etatDemande:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/demandeEtudiantStageEntreprise/getAllDemandesEtudiant/${etatDemande}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }


  decideDemande(id_demande_stage:string,etat_demande:string='4')
  {
    return new Promise((resolve, reject) => {
      this.httpC.put(`${environment.api}/demandeEtudiantStageEntreprise/decide/${id_demande_stage}/${etat_demande}`,null)
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
