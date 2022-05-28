import { NgbTypeaheadWindow } from "@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window";

export class Entreprise {

  id_entreprise: number;
  nom_entreprise: string;
  num_reg_commerce: string;
  localisation: string;
  site_web: string;
  id_domaine: number;

  constructor(nom_entreprise: string, num_reg_commerce: string, localisation: string, site_web: string, id_domaine: number,){
    this.nom_entreprise = nom_entreprise;
    this.num_reg_commerce = num_reg_commerce;
    this.localisation = localisation;
    this.site_web = site_web;
    this.id_domaine = id_domaine;
  }
}
