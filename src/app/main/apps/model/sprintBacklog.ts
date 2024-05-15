import { Sprint } from '../model/sprint'; 
import { UserStory } from '../model/userStory'; 

export interface SprintBacklog {
  idSprintBacklog: number;
  nomBacklog:string;
  effortEstimation: number;
  definitionOfDone: string;
  priorite: number;
  estTermine: boolean;
  dateDebut: Date;
  dateFin: Date;
  idSprint: number;
  
}