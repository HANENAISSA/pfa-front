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
  @Input() id_experience: string = "-1";
  @Input() title: string;
  @Input() details: any = null;
  @Input() edit: boolean = false;

  actualDate:string;

  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedServiceService,
    public serviceExperience: ExperienceService,
    public serviceComptence: CompetenceService
  ) {
    this.actualDate=new Date().toDateString()
  }

  ngOnInit() {
  }

  async onSubmit(form: NgForm, action: string) {
    switch (action) {
      case "add":
        this.addExperience(form);
        break;
      case "update":
        this.updateExperience(form);
        break;
    }
  }

  async addExperience(form: NgForm){
    try {
      const { err } =
        (await this.serviceExperience.addExperience({
          ...form.value,
        })) as any;
      if (!err) {
        this.sharedService.reloadComponent(2);
        swal("Succès!", "Ajout effectué avec succès", "success");
      }
    } catch (error) {
      swal("Échec!", "Opération non effectuée", "error");
    }
    this.activeModal.dismiss();
  }

  async updateExperience(form: NgForm) {
    try {
      const { err } = (await this.serviceExperience.updateExperience(
        {...form.value, id_experience: this.details.id_experience.toString()}
      )) as any;
      if (!err) {
        this.sharedService.reloadComponent(2);
        swal("Succès!", "Opération effectuée avec succès", "success");
      }
    } catch (error) {
      swal("Echec!", "Opération non effectuée", "error");
    }
    this.activeModal.dismiss();
  }


}
