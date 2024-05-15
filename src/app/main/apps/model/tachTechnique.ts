

import { UserStory } from '../model/userStory'; 
import { User } from 'app/auth/models';    

export interface TacheTechnique {
  idTacheTechnique: number;
  nomTacheTechnique: string;
  descriptionTacheTechnique: string;
//userStory: UserStory;
  dateCreation: Date;
  dateModification?: Date;
  statut_TT: StatutTacheTechnique;
  idUser:number;
 // devAffectee: User;
}

// statut-tache-technique.enum.ts

export enum StatutTacheTechnique {
  Encours = 'Encours',
  Afaire = 'Afaire',
  Terminée = 'Terminée'
}
