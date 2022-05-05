import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from '../models/competence';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private httpC: HttpClient) { }
  addCompetence(competence : Competence){

    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/competence/add`, competence)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  updateCompetence(competence : Competence){

    return new Promise((resolve, reject) => {

      this.httpC.patch(`${environment.api}/competence/update`, competence)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteCompetence(id_competence: string){

      return new Promise((resolve, reject) => {
        this.httpC.delete(`${environment.api}/competence/delete/${id_competence}`)
          .forEach(data =>
            resolve(data)
          ).catch((err) => {
            reject(err);
          });
      });

  }

  getListCompetence(id:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/competence/getAll/${id}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }

  getCvBayEtudiont(id:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/competence/getCvByEtudiant/${id}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }



  loadCompetences()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/competence/loadCompetences`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }


  filterCompetences(idomaine:string)
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/competence/filterCompetences/${idomaine}`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }


  filterAllEtudiantsByCompetences(list:string[])
  {
    return new Promise((resolve, reject) => {
      this.httpC.post(`${environment.api}/etudiantComp/getAllEtudiantsByCompetences`,{"competencesList":list})
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
