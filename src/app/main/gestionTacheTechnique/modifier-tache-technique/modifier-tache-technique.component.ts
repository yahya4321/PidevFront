import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TacheTechniqueService } from '../../../Services/gestionTacheTechnique/TacheTechniqueService';
import { TacheTechnique, StatutTacheTechnique } from '../../apps/model/tachTechnique';
import { User } from '../../../auth/models/user';

@Component({
  selector: 'app-modifier-tache-technique',
  templateUrl: './modifier-tache-technique.component.html',
  styleUrls: ['./modifier-tache-technique.component.scss']
})
export class ModifierTacheTechniqueComponent implements OnInit {
  tacheTechniqueId: number;
  tacheTechniqueForm: FormGroup;
  TTUpdatedSuccessfully: boolean = false;
  statutsTacheTechnique: StatutTacheTechnique[] = Object.values(StatutTacheTechnique);
  users: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private tacheTechniqueService: TacheTechniqueService
  ) { }

  ngOnInit(): void {
    this.tacheTechniqueId = +this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.loadTacheTechnique();
    this.loadUsers();
  }

  initForm(): void {
    this.tacheTechniqueForm = this.formBuilder.group({
      nomTacheTechnique: ['', Validators.required],
      descriptionTacheTechnique: ['', Validators.required],
      dateCreation: [''],
      statut_TT: [''],
      idUser: ['']
    });
  }

  loadTacheTechnique(): void {
    this.tacheTechniqueService.getTacheTechniqueById(this.tacheTechniqueId)
      .subscribe((tacheTechnique) => {
        this.tacheTechniqueForm.patchValue({
          nomTacheTechnique: tacheTechnique.nomTacheTechnique,
          descriptionTacheTechnique: tacheTechnique.descriptionTacheTechnique,
          dateCreation: tacheTechnique.dateCreation,
          statut_TT: tacheTechnique.statut_TT,
          idUser: tacheTechnique.idUser
        });
      });
  }

  loadUsers(): void {
    this.tacheTechniqueService.getDevelopers()
      .subscribe(
        users => {
          this.users = users;
        },
        error => {
          console.log('Une erreur est survenue lors de la récupération des utilisateurs : ', error);
        }
      );
  }

  onSubmit(): void {
    if (this.tacheTechniqueForm.valid) {
      const updatedTacheTechnique = {
        idTacheTechnique: this.tacheTechniqueId,
        nomTacheTechnique: this.tacheTechniqueForm.value.nomTacheTechnique,
        descriptionTacheTechnique: this.tacheTechniqueForm.value.descriptionTacheTechnique,
        dateCreation: this.tacheTechniqueForm.value.dateCreation,
        statut_TT: this.tacheTechniqueForm.value.statut_TT,
        idUser: this.tacheTechniqueForm.value.idUser
      };
  
   this.tacheTechniqueService.updateTacheTechnique(updatedTacheTechnique.idTacheTechnique, updatedTacheTechnique)
        .subscribe(
          () => {
            console.log('Tâche technique mise à jour avec succès !');
            this.TTUpdatedSuccessfully = true;
            setTimeout(() => {
              this.TTUpdatedSuccessfully = false;
              this.router.navigate(['afficher-taches-techniques']);
            }, 500);
  
            // Vérifier si l'ID de l'utilisateur a changé
            if (updatedTacheTechnique.idUser !== this.tacheTechniqueId) {
              this.tacheTechniqueService.affecterUtilisateurATache(updatedTacheTechnique.idTacheTechnique, updatedTacheTechnique.idUser)
                .subscribe(
                  () => {
                    console.log('Utilisateur affecté à la tâche technique avec succès.');
                  },
                  (assignError) => {
                    console.error('Erreur lors de l\'affectation de l\'utilisateur à la tâche technique:', assignError);
                  }
                );
            }
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la tâche technique :', error);
          }
        );
    }
  }
  
}  

  
