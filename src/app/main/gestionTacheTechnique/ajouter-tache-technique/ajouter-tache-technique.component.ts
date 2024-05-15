import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TacheTechniqueService } from '../../../Services/gestionTacheTechnique/TacheTechniqueService';
import { TacheTechnique, StatutTacheTechnique } from '../../apps/model/tachTechnique';
import { UserStory } from '../../apps/model/userStory';
import { UserStoryService } from '../../../Services/gestionUserStoryServices/UserStoryServices';

@Component({
  selector: 'app-tache-technique-add',
  templateUrl: './ajouter-tache-technique.component.html',
  styleUrls: ['./ajouter-tache-technique.component.scss'],
})
export class TacheTechniqueAddComponent {
  tacheTechniqueForm: FormGroup;
  statutsTacheTechnique: StatutTacheTechnique[] = Object.values(StatutTacheTechnique);
  TacheTechniqueAddedSuccessfully = false;
  userStories: UserStory[] = []; 
  users: any[] = [];

  constructor(private formBuilder: FormBuilder, 
              private tacheTechniqueService: TacheTechniqueService,
              private userStoryService: UserStoryService ) {
    this.tacheTechniqueForm = this.formBuilder.group({
      nomTacheTechnique: ['', Validators.required],
      descriptionTacheTechnique: ['', Validators.required],
      statut_TT: [null, Validators.required],
      dateDebut: [null], // Ajoutez le champ pour la date de début
      dateFin: [null],  
      userStory: [null, Validators.required],
      idUser: [null, Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.userStoryService.getAllUserStories().subscribe((data: UserStory[]) => {
      this.userStories = data;
      this.loadUsers();
    });
  }

  loadUsers() {
    this.tacheTechniqueService.getDevelopers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log('Une erreur est survenue lors de la récupération des utilisateurs : ', error);
      }
    );
  }

  onSubmit() {
    if (this.tacheTechniqueForm.valid) {
      const formData = this.tacheTechniqueForm.value;
      this.tacheTechniqueService.createTacheTechnique(formData).subscribe(
        (createdTacheTechnique: TacheTechnique) => {
          console.log('Tâche technique ajoutée avec succès:', createdTacheTechnique);
          const userStoryId = formData.userStory;
          const userId = formData.idUser;
  
          // Assigner la tâche technique à la user story
          this.tacheTechniqueService.assignTacheTechniqueToUserStory(userStoryId, createdTacheTechnique).subscribe(
            () => {
              console.log('Tâche technique assignée à l\'histoire utilisateur avec succès.');
  
              // Affecter l'utilisateur à la tâche technique
              this.tacheTechniqueService.affecterUtilisateurATache(createdTacheTechnique.idTacheTechnique, userId).subscribe(
                () => {
                  console.log('Utilisateur affecté à la tâche technique avec succès.');
  
                  // Réinitialiser le formulaire et indiquer que la tâche technique a été ajoutée avec succès
                  this.TacheTechniqueAddedSuccessfully = true;
                  setTimeout(() => {
                    this.TacheTechniqueAddedSuccessfully = false;
                    this.tacheTechniqueForm.reset(); // Réinitialiser le formulaire après l'ajout réussi
                  }, 3000);
                },
                (assignError) => {
                  console.error('Erreur lors de l\'affectation de l\'utilisateur à la tâche technique:', assignError);
                }
              );
            },
            (assignError) => {
              console.error('Erreur lors de l\'affectation de la tâche technique à la user story:', assignError);
            }
          );
        },
        (createError) => {
          console.error('Erreur lors de l\'ajout de la tâche technique:', createError);
        }
      );
    }
  }
  
}
