export class DemandeEtudiant {

  id_demande : string;
  date_demande : string;
  description: string;
  etat : string;
  id_etudiant?: string;

  constructor(id_demande: string,	date_demande: string,	description: string, etat	: string, id_etudiant?: string){
    this.id_demande = id_demande;
    this.date_demande = date_demande;
    this.description = description;
    this.etat = etat;
    this.id_etudiant = id_etudiant;
  }
}
