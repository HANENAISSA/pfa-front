import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffreStageServiceService {

  constructor(private httpC:HttpClient) {

  }

  addOffreStage(offreStage : FormData){
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/offrestage/add`, offreStage)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  updateOffreStage(offreStage : FormData){

    return new Promise((resolve, reject) => {

      this.httpC.put(`${environment.api}/offrestage/update`, offreStage)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteOffreStage(id_offre_stage: string){


      return new Promise((resolve, reject) => {
        this.httpC.delete(`${environment.api}/offrestage/delete/${id_offre_stage}`)
          .forEach(data =>
            resolve(data)
          ).catch((err) => {
            reject(err);
          });
      });

  }


  getAllOffreStages(etat:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/offrestage/get/all/${etat}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }


  getOneOffreDetails(id_offre_stage:string){

    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/offrestage/get/one/offre/entreprise/${id_offre_stage}`)

        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }

  getAllOffreNonPostuleStages()
  {
    return new Promise((resolve, reject) => {

      this.httpC.get(`${environment.api}/offrestage/get/all/offres/entreprise/notregistred`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }


  updateOffreVues(id_offre_stage : string){

    return new Promise((resolve, reject) => {

      this.httpC.put(`${environment.api}/offrestage/update/nbr/vue/${id_offre_stage}`,null)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  updateOffrePostulations(id_offre_stage : string){

    return new Promise((resolve, reject) => {

      this.httpC.put(`${environment.api}/offrestage/update/nbr/postulations/${id_offre_stage}`,null)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  closeOpenOffre(id_offre_stage : string,id_etat_offre:string){

    return new Promise((resolve, reject) => {

      this.httpC.put(`${environment.api}/offrestage/close/open`, {id_offre_stage,id_etat_offre})
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }


  getOffresEtudiantsTousContacts(id_etudiant:string,tabid:string){
    let api:string;
    switch (tabid) {
      case '0':
        api=`${environment.api}/offrestage/get/offres/etudiants/noncontactes/${id_etudiant}`
        break;
        case '1':
          api=`${environment.api}/offrestage/get/offres/etudiants/contactes/${id_etudiant}`
          break;
    }
    return new Promise((resolve, reject) => {
      this.httpC.get(api)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }
}
