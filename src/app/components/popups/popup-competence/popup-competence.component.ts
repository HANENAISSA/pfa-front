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
  @Input() id_competence: string = "-1";


  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedServiceService,
    public serviceComptence: CompetenceService
  ) {}

  ngOnInit() {
  }

  async onSubmit(form: NgForm, action: string) {
    switch (action) {
      case "add":
        this.addComp(form);
        break;
      case "update":
        this.updateComp(form);
        break;
    }
  }

  async addComp(form: NgForm) {
    try {
      const { err } = (await this.serviceComptence.addCompetence(
        { ...form.value }
      )) as any;
      if (!err) {
        this.sharedService.reloadComponent(1);
        swal("Succès!", "Ajout effectué avec succès", "success");
      }
    } catch (error) {
      swal("Echec!", "Opération non effectuée", "error");
    }
    this.activeModal.dismiss();
  }

  async updateComp(form: NgForm) {
    try {
      const { err } = (await this.serviceComptence.updateCompetence(
        {...form.value, id_competence: this.details.id_competence.toString()}
      )) as any;
      if (!err) {
        this.sharedService.reloadComponent(1);
        swal("Succès!", "Opération effectuée avec succès", "success");
      }
    } catch (error) {
      swal("Echec!", "Opération non effectuée", "error");
    }
    this.activeModal.dismiss();

  }



}
