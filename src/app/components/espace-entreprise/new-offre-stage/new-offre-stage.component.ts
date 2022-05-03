import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import swal from 'sweetalert';
import { OffreStageServiceService } from "../../../services/offre-stage-service.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import { DatePipe } from '@angular/common'

@Component({
  selector: "app-new-offre-stage",
  templateUrl: "./new-offre-stage.component.html",
  styleUrls: ["./new-offre-stage.component.scss"],
})
export class NewOffreStageComponent implements OnInit {

  pdfUpload: File;
  uploaded: boolean = false;
  offre: FormData;
  optionele = true;
  type: string;
  duree: string;
  disabled:boolean=false;
  actualDate:string;

  constructor(
    private offreService: OffreStageServiceService,
    public sharedService: SharedServiceService,
    private route: Router,
    public datepipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.offre = new FormData();
    this.actualDate=new Date().toDateString()
  }
  setDate(dd, duree) {
    const datedebut = new Date(dd);
    const newDate = new Date(datedebut.setMonth(datedebut.getMonth() + Number(duree)));
    return this.datepipe.transform(newDate, 'yyyy-MM-dd');
  }
  async addOffre(f: NgForm) {

    try {
      this.disabled=true;
      const { dd, titre, ddure, description } = f.value;
      this.offre.append("type", this.type);
      this.offre.append("date_debut", dd.toString());
      this.offre.append("id_responsable_entreprise", "2");
      this.offre.append("titre", titre);
      this.offre.append("description", description);


      if (this.type != "Optionnel") {
        this.offre.append("duree", this.duree);
        this.offre.append("date_fin", this.setDate(dd, this.duree));
      }
      else {
        this.offre.append("duree", ddure);
        this.offre.append("date_fin", this.setDate(dd, ddure));

      }

      const { err } = this.offreService.addOffreStage(
        this.offre
      ) as any;
      if (!err) {
        swal("Succès!", "Ajout effectué avec succès", "success");
        this.route.navigate(['/entreprise/offresStages']);
      }
    } catch (error) {
      this.disabled=false;
      swal("Echec!", "Opération non effectuée", "error");

      return error;
    }
  }

  fileChange(event) {

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file)
      this.pdfUpload = file;
      this.uploaded = true;
      this.offre.append('cahier_charge', file, file.name);
    }
  }

  getType(event) {
    this.type = event.target.options[event.target.options.selectedIndex].text;
    this.duree = event.target.value;
  }
}
