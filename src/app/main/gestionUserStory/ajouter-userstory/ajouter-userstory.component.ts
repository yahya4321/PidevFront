

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStory, StatutUserStory } from '../../apps/model/userStory';
import { UserStoryService } from '../../../Services/gestionUserStoryServices/UserStoryServices';
import { SprintBacklogService } from '../../../Services/gestionSprintBacklogServices/SprintBacklogServices'; // Importez le service du sprint backlog

@Component({
  selector: 'app-ajouter-userstory',
  templateUrl: './ajouter-userstory.component.html',
  styleUrls: ['./ajouter-userstory.component.scss']
})
export class AjouterUserstoryComponent implements OnInit {
  userStoryForm: FormGroup;
  statutList = Object.values(StatutUserStory); // Liste des valeurs de l'énumération StatutUserStory
  sprintBacklogs: any[] = [];

  constructor(private fb: FormBuilder, private userStoryService: UserStoryService,private sprintBacklogService: SprintBacklogService) {
    this.userStoryForm = this.fb.group({
      titre_US: ['', Validators.required],
      description_US: ['', Validators.required],
      statut_US: ['', Validators.required],
      velocite_US: ['', Validators.required],
      sprintBacklog: ['', Validators.required] // Vous devrez peut-être ajuster cela en fonction de votre logique métier
    });
  }

  ngOnInit(): void {
    this.sprintBacklogService.getAllSprintBacklogs().subscribe((data: any[]) => {
      this.sprintBacklogs = data;
    });
  }

  onSubmit(): void {
    if (this.userStoryForm.valid) {
      const userStoryData: UserStory = this.userStoryForm.value;
      this.userStoryService.createUserStory(userStoryData).subscribe(
        (response) => {
          console.log('User story ajoutée avec succès : ', response);
          
          const sprintBacklogId = this.userStoryForm.get('sprintBacklog')?.value;
   
          
          this.sprintBacklogService.assignUserStoryToSprintBacklog(sprintBacklogId, response.idUserStory).subscribe(
            (result) => {
              console.log('User Story affectée au Sprint Backlog avec succès.',result);
              // Réinitialisez le formulaire après l'ajout réussi
            
            },
            (error) => {
              console.error('Erreur lors de l\'affectation de la User Story au Sprint Backlog : ', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la user story : ', error);
        }
      );
    } else {
      console.log('Formulaire invalide. Veuillez vérifier les champs.');
    }
  }
}

