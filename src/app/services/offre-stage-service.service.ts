import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

      this.httpC.patch('${environment.api}/offrestage/update', offreStage)
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


  getAllOffreStages(id_responsable:string,etat:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/offrestage/getAll/${id_responsable}/${etat}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }

  getAllOffresEntreprise(id_entreprise:string){

    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/offrestage/getAllOffresEntreprise/${id_entreprise}`)

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
      this.httpC.get(`${environment.api}/offrestage/getOneOffreEntreprise/${id_offre_stage}`)

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

      this.httpC.get(`${environment.api}/offrestage/getAllOffresEntrepriseNotRegistred`)
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

      this.httpC.patch(`${environment.api}/offrestage/update_Nbr_vue`, {"id_offre_stage":id_offre_stage})
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  updateOffrePostulations(id_offre_stage : string){

    return new Promise((resolve, reject) => {

      this.httpC.patch(`${environment.api}/offrestage/update_Nbr_postulations`, {id_offre_stage})
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  closeOpenOffre(id_offre_stage : string,id_etat_offre:string){

    return new Promise((resolve, reject) => {

      this.httpC.patch(`${environment.api}/offrestage/closeOpenOffre`, {id_offre_stage,id_etat_offre})
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }


  getAllOffresOuvertes(id_responsable:string){

    return new Promise((resolve, reject) => {

      this.httpC.get(`${environment.api}/offrestage/getAllOffresOuvertes/${id_responsable}`)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }


  getOffresEtudiantsContactes(id_responsable:string,id_etudiant:string){

    return new Promise((resolve, reject) => {

      this.httpC.get(`${environment.api}/offrestage/getOffresEtudiantsContactes/${id_responsable}/${id_etudiant}`)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }


  offreExpired(){

    return new Promise((resolve, reject) => {

      this.httpC.patch(`${environment.api}/offrestage/offreExpired`,null)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }


  loadAllOffres(id_responsable:string){

    return new Promise((resolve, reject) => {

      this.httpC.get(`${environment.api}/offrestage/loadAllOffres/${id_responsable}`)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }


}
