import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from "sweetalert";
import { OffreStage } from '../../../models/offre-stage.model';
import { OffreStageServiceService } from '../../../services/offre-stage-service.service';
import { SharedServiceService } from '../../../services/shared-service.service';
import { PopupOffreComponent } from '../../popups/popup-offre/popup-offre.component';

@Component({
  selector: 'app-list-offres-stage',
  templateUrl: './list-offres-stage.component.html',
  styleUrls: ['./list-offres-stage.component.scss']
})
export class ListOffresStageComponent implements OnInit {

  listStage:OffreStage[]=[null];
  year:string;
  listYears:[]=[];
  searchText:string;
  etat:string;

  page = 1;
  pageSize = 5;
  pageSizes = [5,10,15];

  constructor(private offreStageServ: OffreStageServiceService,
    private router :Router,
    private modalService: NgbModal,public sharedService:SharedServiceService) {

     }

  ngOnInit() {
    this.year=new Date().getFullYear().toString();
    this.getAllOffreYears();
    this.etat="0";
    this.getAllOffreStages(new Date().getFullYear().toString(),this.etat);
  }


  async getAllOffreYears(){
    try {
      const {err,rows}=await this.sharedService.getYears(0)as any||[];
      if(!err){
        this.listYears=rows;
      }

    } catch (error) {
      this.listYears=[];
      return error;

    }

  }


  async getAllOffreStages(year:string,etat:string){
    const id_responsable="2";
    try {
      const {err,rows}=await this.offreStageServ.getAllOffreStages(id_responsable,etat,year)as any||[];
      if(!err){
        this.listStage=rows;
      }

    } catch (error) {
      this.listStage=[];
      return error;

    }

  }


  updateOffre(offre:OffreStage){
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `MODIFICATION D'UNE OFFRE`;
    modalRef.componentInstance.id = Number(offre.id_offre_stage);

    modalRef.componentInstance.offreStage = {...offre};

  }

  passerOffre(offre:OffreStage){
    const cryptedData=this.sharedService.encryptData(JSON.stringify(offre))
    this.router.navigate(['/entreprise/modif'],{ queryParams: { data: cryptedData } })
  }

  supprimerOffre(id_offre:string){
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `SUPPRESSION OFFRE`;
    modalRef.componentInstance.id = Number(id_offre);

  }
  AddOffre(){
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `NOUVELLE OFFRE`;

  }

  async showOffre(id_offre_stage: string) {
    this.getOneOffreDetails(id_offre_stage, (details) => {
      const modalRef = this.modalService.open(PopupOffreComponent);
      modalRef.componentInstance.title = `DETAILS OFFRE`;
      modalRef.componentInstance.id = Number(id_offre_stage);
      modalRef.componentInstance.show = true;
      modalRef.componentInstance.details = details[0];
    });
  }

  showAddOffre(){
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `NOUVELLE OFFRE`;
    modalRef.componentInstance.show = true;

  }

  async getOneOffreDetails(id_offre_stage:string,callback){
    try {
      const {err,rows}=await this.offreStageServ.getOneOffreDetails(id_offre_stage)as any||[];
      if(!err){
        callback(rows)
      }

    } catch (error) {
      return error;

    }

  }



  changeEtat(event){
    this.listStage = [null];
    const etat=event.nextId.toString();
    this.etat=etat;
    this.getAllOffreStages(this.year,etat);


  }



  changeYear(year:string){
    this.listStage = [null];
    this.year=year;
    console.log(year);

    this.getAllOffreStages(year,this.etat);

  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }


  async closeOpenOffre(id_offre_stage:number,id_etat_offre:string){
    try {
      const {err,rows}=await this.offreStageServ.closeOpenOffre(id_offre_stage.toString(),id_etat_offre)as any||[];
      if(!err){
        swal("Succès!", "Opération effctuée avec succès", "success");
        this.getAllOffreStages(this.year,this.etat);

      }

    } catch (error) {
      swal("Échec!", "Opération non effectuée", "error");
      return error;

    }
  }


  // async offreExpired(){//postponed for a later date
  //   try {
  //     const {err,rows}=await this.offreStageServ.offreExpired()as any||[];
  //     if(!err){

  //       this.getAllOffreStages(this.year,this.etat);

  //     }

  //   } catch (error) {

  //     return error;

  //   }
  // }
}
