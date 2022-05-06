import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert";
import { CompetenceService } from "../../../services/competence.service";
import { SharedServiceService } from "../../../services/shared-service.service";

@Component({
  selector: "app-popup-competence",
  templateUrl: "./popup-competence.component.html",
  styleUrls: ["./popup-competence.component.scss"],
})
export class PopupCompetenceComponent implements OnInit {
  @Input() edit: boolean = false;
  @Input() details: any = null;
  @Input() title: string;
  @Input() id_com: string = "-1";

  @Output() passTabid: EventEmitter<number> = new EventEmitter();
  disabled:boolean=false;

  maycv: any[] = [];
  model: any = {};

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedServiceService,
    public serviceComptence: CompetenceService
  ) {}

  ngOnInit() {
    this.getMyCV();
  }
  async onSubmit(form: NgForm, typeOp: string) {
    switch (typeOp) {
      case "add":
        this.addComp(form);
        break;
      case "update":
        this.updateComp(form);
        break;
      default:
        break;
    }
  }

  async getMyCV() {
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

  async addComp(form: NgForm) {
    try {
      this.disabled=true;
      const { err, rows, message } = (await this.serviceComptence.addCompetence(
        { ...form.value, id_cv: this.maycv[0].id_cv }
      )) as any;
      if (!err) {
        swal("Succès!", "Ajout effectué avec succès", "success");
        this.activeModal.dismiss();
        this.sharedService.reloadComponent(1);
      }
    } catch (error) {
      this.disabled=false;
      swal("Echec!", "Opération non effectuée", "error");
      this.activeModal.dismiss();
      return error;
    }
  }

  async updateComp(form: NgForm) {
    try {
      this.disabled=true;
      const { err, rows } = (await this.serviceComptence.updateCompetence(
        {...form.value, id_competence: this.details.id_competence.toString()}
      )) as any;
      if (!err) {
        this.activeModal.dismiss();
        this.sharedService.reloadComponent(1);
        swal("Succès!", "Opération effectuée avec succès", "success");
      }
    } catch (error) {
      this.disabled=false;
      this.activeModal.dismiss();
      swal("Echec!", "Opération non effectuée", "error");
      return error;
    }

  }

  async deleteComp() {
    try {
      this.disabled=true;
      const { err, rows } = (await this.serviceComptence.deleteCompetence(this.id_com)) as any;
      if (!err) {
        this.activeModal.dismiss();
        this.sharedService.reloadComponent(1);
        swal("Succès!", "Opération effectuée avec succès", "success");
      }
    } catch (error) {
      this.activeModal.dismiss();
      this.disabled=false;
      swal("Echec!", "Opération non effectuée", "error");
      return error;
    }
  }

}
