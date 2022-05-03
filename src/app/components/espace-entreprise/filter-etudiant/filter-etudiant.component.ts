import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChercherProfilService } from '../../../services/chercher-profil.service';
import { CompetenceService } from '../../../services/competence.service';
import { PopupDemandeComponent } from '../../popups/popup-demande/popup-demande.component';
import { PopupOffreComponent } from '../../popups/popup-offre/popup-offre.component';
import { PopupShowCompetenceEtudiantComponent } from '../../popups/popup-show-competence-etudiant/popup-show-competence-etudiant.component';

@Component({
  selector: 'app-filter-etudiant',
  templateUrl: './filter-etudiant.component.html',
  styleUrls: ['./filter-etudiant.component.scss']
})
export class FilterEtudiantComponent implements OnInit {
  listEtudiant: any[] = [null];
  listEtudiantContacte: any[] = [null];
  listDepartements: any[] = [];
  listCompetences: any[] = [];
  searchText;
  tabSelected:any
  selectedidDomaine:string="-1"
 


  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  constructor( private serviceEtudiant:ChercherProfilService,
               private modalService: NgbModal,
               private competenceService:CompetenceService
    ) { }

  ngOnInit() {
    this.getAllListEtudiant();
    this.loadDepartmentsList();
    this.loadCompetences();
    this.getAllListEtudiantContacte("2");
  }


  async getAllListEtudiant() {

    try {
      const { err, rows } =
        ((await this.serviceEtudiant.getListEtudiant(
        )) as any) || [];
      if (!err) {
        this.listEtudiant = rows;
        
      }
    } catch (error) {
      this.listEtudiant = [];
      return error;
    }
  }

  async filterEtudiantsByDep(id:string) {
    try {
      const { err, rows } =
        ((await this.serviceEtudiant.filterEtudiants(id
        )) as any) || [];
      if (!err) {
        this.listEtudiant = rows;
        
      }
    } catch (error) {
      this.listEtudiant = [];
      return error;
    }
  }
  
  async filterEtudiantsByDepContacted(id:string,id_responsable:string) {
    try {
      const { err, rows } =
        ((await this.serviceEtudiant.filterEtudiantsContacte(id,id_responsable
        )) as any) || [];
      if (!err) {
        this.listEtudiantContacte = rows;
        
      }
    } catch (error) {
      this.listEtudiantContacte = [];
      return error;
    }
  }
  


  async loadDepartmentsList() {
    try {
      const { err, rows } =
        ((await this.serviceEtudiant.getDepartementsList(
        )) as any) || [];
      if (!err) {
        this.listDepartements = rows;         
      }
    } catch (error) {
      this.listDepartements = [];
      return error;
    }
  }


  showCompetencesEtudiant(etudiant){
    const modalRef = this.modalService.open(PopupShowCompetenceEtudiantComponent);
    modalRef.componentInstance.title = `Compétences Etudiant`;
    modalRef.componentInstance.etudiant = etudiant;

  }
  contacter(etudiant){
    const modalRef = this.modalService.open(PopupDemandeComponent);
    modalRef.componentInstance.title = `INVITATION A UN ENTRETIEN DE STAGE`;
  //   modalRef.componentInstance.id = Number(demande.id_offre_stage);
    modalRef.componentInstance.etudiant = etudiant;
    modalRef.componentInstance.invitation = true;
  }

  showOffresEtudiant(etudiant){
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `LISTE DES OFFRES AFFECTEES`;
    modalRef.componentInstance.etudiant = etudiant;
  }

  changeDep(event){
    this.selectedidDomaine=event.toString();//ngModel init
    this.tabSelected=[]

    if(event==-1){
       this.getAllListEtudiant();
       this.getAllListEtudiantContacte("2");
       this.loadCompetences()
       return;
    }
    this.filterEtudiantsByDep(event)
    this.filterEtudiantsByDepContacted(this.selectedidDomaine,"2")
    this.filterCompetences(event)
  }

  

  async getAllListEtudiantContacte(id_responsable:string) {

    try {
      const { err, rows } =
        ((await this.serviceEtudiant.getToutEtudiantContacte(id_responsable
        )) as any) || [];
      if (!err) {
        this.listEtudiantContacte = rows;
        
      }
    } catch (error) {
      this.listEtudiantContacte = [];
      return error;
    }
  }

  async loadCompetences() {
    try {
      const { err, rows } =
        ((await this.competenceService.loadCompetences(
        )) as any) || [];
      if (!err) {
        this.listCompetences = rows; 
      }
    } catch (error) {
      this.listCompetences = [];
      return error;
    }
  }

  async filterCompetences(idomaine:string) {

    try {
      const { err, rows } =
        ((await this.competenceService.filterCompetences(idomaine
        )) as any) || [];
      if (!err) {
        this.listCompetences = rows; 
      }
    } catch (error) {
      this.listCompetences = [];
      return error;
    }
  }

  changeCompetences(){
    if(this.tabSelected.length>0){
      
      const list=this.getSelectedValues(this.tabSelected)
      this.filterAllEtudiantsByCompetences(list)
      this.filterAllEtudiantsContactesByCompetences(list)

    }
    else{
      this.getAllListEtudiant();
      this.getAllListEtudiantContacte("2");
    }

  }


  getSelectedValues(tab){
    const cList:string[]=[]
    for (const c of tab) {
      cList.push(c.libelle)
    }
    return cList;
  }


  async filterAllEtudiantsByCompetences(list:string[]) {

    try {
      const { err, rows } =
        ((await this.competenceService.filterAllEtudiantsByCompetences(list
        )) as any) || [];
      if (!err) {
        this.listEtudiant = rows; 
      }
    } catch (error) {
      this.listEtudiant = [];
      return error;
    }
  }

  async filterAllEtudiantsContactesByCompetences(list:string[]) {

    try {
      const { err, rows } =
        ((await this.serviceEtudiant.getListEtudiantsContactesByCompetences(list
        )) as any) || [];
      if (!err) {
        this.listEtudiantContacte = rows; 
      }
    } catch (error) {
      this.listEtudiantContacte = [];
      return error;
    }
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
}
