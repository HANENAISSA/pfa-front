import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OffreStage } from "../../../models/offre-stage.model";
import { OffreStageServiceService } from "../../../services/offre-stage-service.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import { StagiairesService } from "../../../services/stagiaires.service";

@Component({
  selector: 'app-stagiaires',
  templateUrl: './stagiaires.component.html',
  styleUrls: ['./stagiaires.component.scss']
})
export class StagiairesComponent implements OnInit {
  listeStagiaires: OffreStage[] = [null];
  searchText:string="";
  listOffres: any[] = [];
  offreSelected:any;
  page = 1;
  pageSize = 5;
  pageSizes = [5,10,15];

  constructor(
    private offreStageServ: OffreStageServiceService,
    private stagiairesService: StagiairesService,
    public sharedService: SharedServiceService,
  ) {
  }

  ngOnInit() {
    this.loadAllOffres()
    this.getAllStagiaires();
  }
  async getAllStagiaires(id_offre?: string) {
    const id_responsable = "2";
    try {
      const { err, rows } =
        ((await this.stagiairesService.getAllSatgiaresByOffre(
          id_responsable,
          id_offre||'-1'
        )) as any) || [];
      if (!err) {
        this.listeStagiaires = rows;
      }
    } catch (error) {
      this.listeStagiaires = [];
    }
  }


   async loadAllOffres() {
    // try {
    //   const id_responsable = "2";
    //   const { err, rows } =
    //     ((await this.offreStageServ.loadAllOffres(
    //       id_responsable,
    //     )) as any) || [];
    //   if (!err) {
    //     this.listOffres = rows;
    //   }
    // } catch (error) {
    //   this.listOffres = [];
    // }
  }





  changeOffre() {
    this.listeStagiaires = [null];
    if(this.offreSelected){
        const id_offre=this.offreSelected.id_offre_stage.toString()
        this.getAllStagiaires(id_offre);
        return;
    }
    this.getAllStagiaires();
  }


  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }
}

