import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DemandeEtudiantService } from "../../../services/demande-etudiant.service";
import swal from "sweetalert";
import { CandidatureEtudiantService } from "../../../services/candidature-etudiant.service";
import { ChercherProfilService } from "../../../services/chercher-profil.service";
import { EntrepriseServiceService } from "../../../services/entreprise-service.service";
import { OffreStageServiceService } from "../../../services/offre-stage-service.service";
import { SharedServiceService } from "../../../services/shared-service.service";

@Component({
  selector: "app-popup-demande",
  templateUrl: "./popup-demande.component.html",
  styleUrls: ["./popup-demande.component.scss"],
})
export class PopupDemandeComponent implements OnInit {
  // @Input() show:boolean=false;
  @Input() details: any = null;
  @Input() title: string;
  @Input() invitation: boolean;
  // @Input() demande:any=null;
  @Input() accepted: boolean = false;
  @Input() etat: string;
  @Input() etudiant = null;
  @Input() tabid: string = "-1";
  actualDate: string;
  entrepriseInfo: any;
  msg_body: string = `Suite à la consultation des profils existant sur la plateforme, nous vous propose une offre de stage au sein de notre entreprise . En effet, vos compétences ont retenues notre attention c'est pourquoi nous vous invitons à passer un entretien pour un stage qui peut être considéré comme un atout pour atteindre votre objectif professionnel .Nous nous tenons à votre disposition pour toute information complémentaire .`;
  listOffres = [];
  htmlinputType: string = "text";
  offreSelected: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public sharedService: SharedServiceService,
    private candidatureService: CandidatureEtudiantService,
    private entrepriseService: EntrepriseServiceService,
    private profilService: ChercherProfilService,
    private offreStageServ: OffreStageServiceService,
    private demandeService:DemandeEtudiantService
  ) {}

  ngOnInit() {
    this.actualDate = new Date().toISOString().slice(0, 16);
    this.getOffresEtudiantsTousContacts();
    this.loadEntrepriseInfo();
  }

  async loadEntrepriseInfo() {
    try {
      const { err, rows } =
        ((await this.entrepriseService.getEntrpriseInfo()) as any) || [];
      if (!err) {
        this.entrepriseInfo = rows[0];
      }
    } catch (error) {
      this.entrepriseInfo = null;
    }
  }

  async onSubmit(fadd?) {
    let etat = "2";
    let text = "";
    if (this.accepted) {
      etat = "1";
      text = `<div style="text-align: justify;text-justify: inter-word;"><p style="color:black">Bonjour <strong>${
        this.details.nom
      } ${
        this.details.prenom
      }</strong>,</p> <p style="color:black">Dans le prolongement de nos échanges, nous avons le plaisir de vous confirmer notre accord initial pour votre demande de stage au sein de notre entreprise <strong style="color:#294a70">${
        this.details.nom_entreprise
      }</strong> située à <strong style="color:#294a70">${
        this.details.localisation
      }</strong>.</p><p style="color:black">Votre entretien se déroulera au <strong style="color:#294a70">${this.sharedService.formatDate(
        fadd.value.dd,
        true
      )}</strong>.</p><p style="color:black">Priére de confirmer le rendez-vous .</p></div>`;
    }
    const payload = {
      receivers: this.details.email,
      //  receivers:"barhoumsouidene@gmail.com, aissahanen08@gmail.com,youssefbenmiled40@gmail.com",//this.demande.email
      subject: "INVITATION A UN ENTRETIEN DE STAGE",
      text: text,
      id_etat_demande_stage_entreprise: etat,
      id_demande: this.details.id_demande_stage_entreprise.toString(),
    };
    try {
      const { err } =
        ((await this.candidatureService.sendMail(payload)) as any) || [];
      if (!err) {
        switch (etat) {
          case "1":
            swal("Succès!", "Confirmation effectuée avec succès", "success");
            break;
          case "2":
            swal("Succès!", "Mise en attente effectuée avec succès", "success");
            break;
        }
        this.sharedService.reloadComponent();
      }
    } catch (error) {
      swal("Echec!", "Opération non effectuée", "error");
    }
    this.activeModal.dismiss();
  }

  replyDemande(accept: boolean) {
    this.activeModal.dismiss();
    const modalRef = this.modalService.open(PopupDemandeComponent);
    modalRef.componentInstance.title = `ACCEPTATION CANDIDATURE`;
    modalRef.componentInstance.accepted = accept;
    modalRef.componentInstance.details = this.details;
  }

  async invite(invitationForm: NgForm) {
    const { dentretien, mbdy } = invitationForm.value;
    const text = `
      <div style="text-align: justify;text-justify: inter-word;">
      <p style="color:black">Bonjour Mme/Mr <strong>${this.etudiant.nom} ${
      this.etudiant.prenom
    }</strong>,</p>
      <p style="color:black">${mbdy}</p>
      <p style="color:black">Priére de confirmer le rendez-vous le <strong style="color:#294a70">${this.sharedService.formatDate(
        dentretien,
        true
      )}</strong>.</p>
      <p style="color:black"><strong style="color:#294a70">${
        this.entrepriseInfo && this.entrepriseInfo.nom_entreprise
      }</strong> situé à <strong style="color:#294a70">${
      this.entrepriseInfo && this.entrepriseInfo.localisation
    }</strong>.</p>
      <p style="color:black">Bien cordialement .</p>
      </div>`;
    const payload = {
      id_etudiant: this.etudiant.id_etudiant,
      id_offre_stage_entreprise: this.offreSelected.id_offre_stage,
      receivers: this.etudiant.email,
      subject: `ENTRETIEN DE STAGE EN ${this.offreSelected.titre}`,
      text: text,
    };
    try {
      const { err } =
        ((await this.profilService.contacterProfil(payload)) as any) || [];
      if (!err) {
        this.sharedService.reloadComponent();
        swal("Succès!", "Confirmation effctuée avec succès", "success");
      }
    } catch (error) {
      swal("Echec!", "Opération non effectuée", "error");
    }
    this.activeModal.dismiss();
  }

  async getOffresEtudiantsTousContacts() {
    try {
      const { err, rows } =
        ((await this.offreStageServ.getOffresEtudiantsTousContacts(
          this.etudiant.id_etudiant,
          this.tabid
        )) as any) || [];
      if (!err) {
        this.listOffres = rows;
      }
    } catch (error) {
      this.listOffres = [];
    }
  }

  geninputtype() {
    this.htmlinputType = "datetime-local";
  }

  refuseDemande(){
    console.log(this.details);
    swal({
      title: "Voulez-vous refuser la demande?",
      buttons:['cancel','confirm'],
      closeOnEsc:true,
      closeOnClickOutside:true
    }).then(async(result) => {
      if(result){
        try {
          const { err } =
            ((await this.demandeService.decideDemande(this.details.id_demande_stage_entreprise.toString())) as any) || [];
          if (!err) {
            this.sharedService.reloadComponent();
            swal("Succès!", "Demande refusée", "warning");
          }
        } catch (error) {
          swal("Echec!", "Opération non effectuée", "error");
        }
      }
    });
    this.activeModal.dismiss();

  }
}
