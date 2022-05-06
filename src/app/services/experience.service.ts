import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from '../models/experience';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private httpC: HttpClient) { }
  getExperience()
  {
    return new Promise((resolve, reject) => {
      this.httpC.get(`${environment.api}/experience/getAll`)
        .forEach(data =>
          {
            resolve(data)
          }

        ).catch((err) => {
          reject(err);
        });
    });
  }

  addExperience(experience : Experience){
    return new Promise((resolve, reject) => {
      this.httpC.post(`http://localhost:5010/experience/add`, experience)
        .forEach(data =>{
          resolve(data)
        }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  updateExperience(experience : Experience){

    return new Promise((resolve, reject) => {

      this.httpC.patch(`http://localhost:5010/experience/update`, experience)
        .forEach(data =>
          resolve(data)
        ).catch((err) => {
          reject(err);
        });
    });
  }

  deleteExperience(id_experience: string){
      return new Promise((resolve, reject) => {
        this.httpC.delete(`http://localhost:5010/experience/delete/${id_experience}`)
          .forEach(data =>
            resolve(data)
          ).catch((err) => {
            reject(err);
          });
      });

  }

}
