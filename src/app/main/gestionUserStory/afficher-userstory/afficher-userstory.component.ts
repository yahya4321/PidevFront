

import { Component, OnInit } from '@angular/core';
import { UserStory } from '../../apps/model/userStory';
import { UserStoryService } from '../../../Services/gestionUserStoryServices/UserStoryServices';
import { TacheTechniqueService } from '../../../Services/gestionTacheTechnique/TacheTechniqueService'; // Importez le service approprié pour récupérer les tâches techniques
import { TacheTechnique } from '../../apps/model/tachTechnique';


@Component({
  selector: 'app-afficher-userstory',
  templateUrl: './afficher-userstory.component.html',
  styleUrls: ['./afficher-userstory.component.scss']
})
export class AfficherUserstoryComponent implements OnInit {
  userStories: UserStory[];
  tachesTechniques: { [key: number]: TacheTechnique[] } = {};
  selectedUserStoryId: number;

  constructor(private userStoryService: UserStoryService,private tacheTechniqueService: TacheTechniqueService) { }

  ngOnInit(): void {
    this.getUserStories();
  }

  getUserStories(): void {
    this.userStoryService.getAllUserStories().subscribe(
      (userStories) => {
        this.userStories = userStories;
      },
      (error) => {
        console.error('Erreur lors de la récupération des user stories : ', error);
      }
    );
  }
  chargerUserStory(): void {
    this.userStoryService.getAllUserStories().subscribe(
      (userStories) => {
        this.userStories = userStories;
      },
      (erreur) => {
        console.error('Erreur lors du chargement des user story :', erreur);
      }
    );
  }


  supprimerUserStory(idUserStory: number): void {
    this.userStoryService.deleteUserStory(idUserStory).subscribe(
      () => {
        console.log('Sprint supprimé avec succès !');
        this.chargerUserStory();
      },
      (erreur) => {
        console.error('Erreur lors de la suppression du user story :', erreur);
      }
    );
  }
  afficherTachesTechniques(idUserStory: number): void {
    console.log("ID de l'user story :", idUserStory); // Vérifiez si l'ID de l'user story est correct
    if (this.selectedUserStoryId === idUserStory) {
      this.selectedUserStoryId = null; // Désélectionnez l'histoire utilisateur si elle est déjà sélectionnée
    } else {
      this.selectedUserStoryId = idUserStory; // Sélectionnez l'histoire utilisateur
      this.tacheTechniqueService.getAllTacheTechniqueByUserStoryId(idUserStory).subscribe(taches => {
        this.tachesTechniques[idUserStory] = taches;
        console.log("Tâches techniques associées :", this.tachesTechniques[idUserStory]);
      });
    }
  }
 
  unassignTacheTechnique(tacheTechniqueId: number): void {
    this.tacheTechniqueService.unassignTacheTechnique(tacheTechniqueId).subscribe(
      () => {
        console.log('Tâche technique désaffectée avec succès !');
        // Rafraîchir la liste des tâches techniques associées au user story immédiatement après la désaffectation
        this.tacheTechniqueService.getAllTacheTechniqueByUserStoryId(this.selectedUserStoryId).subscribe(taches => {
          this.tachesTechniques[this.selectedUserStoryId] = taches;
          console.log("Tâches techniques associées :", this.tachesTechniques[this.selectedUserStoryId]);
        });
      },
      (erreur) => {
        console.error('Erreur lors de la désaffectation de la tâche technique :', erreur);
      }
    );
  }
  
  
  
  
}

