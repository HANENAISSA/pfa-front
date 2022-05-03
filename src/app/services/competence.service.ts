import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from '../models/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  constructor(private httpC: HttpClient) { }
  addCompetence(competence : Competence){

    return new Promise((resolve, reject) => {
      this.httpC.post('http://localhost:5010/competence/add', competence)
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

      this.httpC.patch('http://localhost:5010/competence/update', competence)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteCompetence(id_competence: string){

      return new Promise((resolve, reject) => {
        this.httpC.delete(`http://localhost:5010/competence/delete/${id_competence}`)
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
      this.httpC.get(`http://localhost:5010/competence/getAll/${id}`)
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
      this.httpC.get(`http://localhost:5010/competence/getCvByEtudiant/${id}`)
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
      this.httpC.get(`http://localhost:5010/competence/loadCompetences`)
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
      this.httpC.get(`http://localhost:5010/competence/filterCompetences/${idomaine}`)
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
      this.httpC.post(`http://localhost:5010/etudiantComp/getAllEtudiantsByCompetences`,{"competencesList":list})
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
