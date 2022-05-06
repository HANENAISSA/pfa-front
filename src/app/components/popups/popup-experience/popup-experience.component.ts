import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CompetenceService } from "../../../services/competence.service";
import { ExperienceService } from "../../../services/experience.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import swal from "sweetalert";

@Component({
  selector: "app-popup-experience",
  templateUrl: "./popup-experience.component.html",
  styleUrls: ["./popup-experience.component.scss"],
})
export class PopupExperienceComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() id_exp: string = "-1";
  @Input() title: string;
  @Input() object: any = null;
  @Input() details: any = null;
  @Input() edit: boolean = false;
  model: any = {};
  maycv: any[] = [];
  disabled:boolean=false;

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedServiceService,
    public serviceExperience: ExperienceService,
    public serviceComptence: CompetenceService
  ) {}

  ngOnInit() {
    this.getMyCV("1");
  }

  async onSubmit(form: NgForm, typeOp: string) {
    switch (typeOp) {
      case "add":
        this.addExper(form);
        break;
      case "update":
        this.updateExper(form);
        break;
      default:
        break;
    }
  }

  async getMyCV(id: string) {
    try {
      const { err, rows, message } =
        (await this.serviceComptence.getCvByEtudiant()) as any;
      if (!err && rows.length > 0) {
        this.maycv = rows;
      }
    } catch (error) {
      return error;
    }
  }

  async addExper(form: NgForm){
    try {
      this.disabled=true;
      const { err, rows, message } =
        (await this.serviceExperience.addExperience({
          ...form.value,
          id_cv: this.maycv[0].id_cv,
        })) as any;
      if (!err) {
        swal("Succès!", "Ajout effectué avec succès", "success");
        this.activeModal.dismiss();
        this.sharedService.reloadComponent(2);
      }
    } catch (error) {
      this.disabled=false;
      swal("Échec!", "Opération non effectuée", "error");
      this.activeModal.dismiss();
      return error;
    }
  }

  async updateExper(form: NgForm) {
    try {
      this.disabled=true;
      const { err, rows } = (await this.serviceExperience.updateExperience(
        {...form.value, id_experience: this.details.id_experience.toString()}
      )) as any;
      if (!err) {
        swal("Succès!", "Opération effectuée avec succès", "success");
        this.activeModal.dismiss();
        this.sharedService.reloadComponent(2);
      }
    } catch (error) {
      this.disabled=false;
      swal("Echec!", "Opération non effectuée", "error");
      this.activeModal.dismiss();
      return error;
    }
  }

  async deleteExper() {
    try {
      this.disabled=true;
      const { err, rows } = (await this.serviceExperience.deleteExperience(this.id_exp)) as any;
      if (!err) {
        swal("Succès!", "Opération effectuée avec succès", "success");
        this.activeModal.dismiss();
        this.sharedService.reloadComponent(2);
      }
    } catch (error) {
      this.disabled=false;
      // this.activeModal.dismiss();
      swal("Echec!", "Opération non effectuée", "error");
      return error;
    }
  }
}
