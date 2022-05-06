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
      this.httpC.post(`${environment.api}/competences/add`, competence)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  updateCompetence(id_competence){
    return new Promise((resolve, reject) => {
      this.httpC.patch(`${environment.api}/competences/update`, id_competence)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteCompetence(id_competence: string){

      return new Promise((resolve, reject) => {
        this.httpC.delete(`${environment.api}/competences/delete/${id_competence}`)
          .forEach(data =>
            resolve(data)
          ).catch((err) => {
            reject(err);
          });
      });

  }

  getListCompetence()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/competences/getAll`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });

  }

  // getCvByEtudiant()
  // {
  //   return new Promise((resolve, reject) => {
  //     this.httpC.get(`${environment.api}/cv/getCvByEtudiant`)
  //       .forEach(data =>
  //         {
  //           resolve(data)
  //         }

  //       ).catch((err) => {
  //         reject(err);
  //       });
  //   });

  // }



  loadCompetences()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/competences/loadCompetences`)
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
      this.httpC.get(`${environment.api}/competences/filterCompetences/${idomaine}`)
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
