import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
  routerLink:string
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

 const ETUDAINT_MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'Offres de stages',
        short_label: 'ODS',
        name: 'Offres de stage',
        type: 'link',
        icon: 'icofont icofont-newspaper',
        routerLink:'/etudiant/offresStages'
      },
      {
        state: 'Chercher entreprise',
        short_label: 'D',
        name: 'Chercher entreprise',
        type: 'link',
        icon: 'icofont icofont-company',
        routerLink:'/etudiant/recherche/entreprise'
      },
      {
        state: 'Demandes de stages',
        short_label: 'D',
        name: 'Demandes de stage',
        type: 'link',
        icon: 'icofont icofont-tasks',
        routerLink:'/etudiant/demandesStages'
      },
      {
        state: 'Mes stages',
        short_label: 'D',
        name: 'Mes stages',
        type: 'link',
        icon: 'icofont icofont-unique-idea',
        routerLink:'/etudiant/mesStages'
      },
    ],
  },

];

const RESPONSABLE_MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'Offres de stage',
        short_label: 'ODS',
        name: 'Offres de stage',
        type: 'link',
        icon: 'icofont icofont-company',
        routerLink:'/entreprise/offresStages'
      },
      {
        state: 'Candidatures',
        short_label: 'cdtrs',
        name: 'Candidatures',
        type: 'link',
        icon: 'icofont icofont-ui-folder',
        routerLink:'/entreprise/candidatures'
      },
      {
        state: 'Profils',
        short_label: 'n',
        name: 'Profils',
        type: 'link',
        icon: 'icofont icofont-group-students',
        routerLink:'/entreprise/recherche/profil'
      },
      {
        state: 'Stagiaires',
        short_label: 'n',
        name: 'Stagiaires',
        type: 'link',
        icon: 'icofont icofont-unique-idea',
        routerLink:'/entreprise/stagiaires'
      },
    ],
  },
];


@Injectable()
export class MenuItems {
  getAll(id_role:string): Menu[] {
    if(id_role=='1')
    return ETUDAINT_MENUITEMS;
    else
    return RESPONSABLE_MENUITEMS;

  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}