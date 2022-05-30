import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OffreStageServiceService } from "../../../../services/offre-stage-service.service";
import { SharedServiceService } from "../../../../services/shared-service.service";

import swal from "sweetalert";
import { DatePipe } from "@angular/common";



@Component({
  selector: "app-edit-offre-stage",
  templateUrl: "./edit-offre-stage.component.html",
  styleUrls: ["./edit-offre-stage.component.scss"],
})
export class EditOffreStageComponent implements OnInit {
  // @Input('offrePass') offreStage ;

  offre: FormData;
  pdfUpload: File;
  uploaded: boolean = false;
  offreStage :any;
  actualDate:string;
  type: string;




  constructor(
    private offreService: OffreStageServiceService,
    public sharedService: SharedServiceService,
    private route: Router,
    private actifRoute:ActivatedRoute,
    public datepipe: DatePipe
  ) {
    this.offre = new FormData();

  }

  ngOnInit() {
    this.actifRoute.queryParams.subscribe(res=>{
      const decryptedData=this.sharedService.decryptData(res.data);
      this.offreStage=JSON.parse(decryptedData);
      this.type=this.offreStage.type;
    });
    this.actualDate=new Date().toDateString()
  }



  async updateOffre(f: NgForm) {
    const { dd, ddure,  titre, description } = f.value;
    try {
      this.offre.append("titre", titre);
      this.offre.append("date_debut", dd.toString());
      this.offre.append("type", this.type);
      this.offre.append("description", description);

      if (this.type != "Optionnel") {
        const duree=this.getDuree(this.type)
        this.offre.append("duree",duree );
        this.offre.append("date_fin", this.setDate(dd, duree));
      }
      else {
        this.offre.append("duree", ddure.toString());
        this.offre.append("date_fin", this.setDate(dd, ddure));

      }
      // this.offre.append("date_fin", this.setDate(dd, ddure));
      // if (this.getEtat()) this.offre.append("id_etat_offre_stage", "1");
      // else this.offre.append("id_etat_offre_stage", "2");
      this.offre.append(
        "id_offre_stage",
        this.offreStage.id_offre_stage.toString()
        );

      const { err} = (await this.offreService.updateOffreStage(
        this.offre
      )) as any;
      if (!err) {
        swal("Succès!", "Offre modifiée ! ", "success");
        this.route.navigate(["/entreprise/offresStages"]);
      }
    } catch (error) {
      swal("Echec!", error.error.message, "warning");
    }
  }




  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.pdfUpload = file;
      this.uploaded = true;
      this.offre.append("cahier_charge", file, file.name);
    }
  }

  setDate(dd, duree) {
    const datedebut = new Date(dd);
    const newDate = new Date(datedebut.setMonth(datedebut.getMonth() + Number(duree)));
    return this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }

  getType(event) {
    this.type = event.target.value;
  }

  getDuree(type) {
    if(type === 'PFE')
        return '6'
    return '1'
  }

}
