// Importations
import { Component, OnInit } from '@angular/core';
import { SprintService } from '../../Services/gestionSprintServices/SprintService';
import { Sprint } from '../apps/model/sprint';
import { User } from 'app/auth/models';
import { TacheTechniqueService } from '../../Services/gestionTacheTechnique/TacheTechniqueService';
import { UserTasksStats } from 'app/auth/models';

@Component({
  selector: 'app-tableau-bord',
  templateUrl: './tableau-bord.component.html',
  styleUrls: ['./tableau-bord.component.scss']
})
export class TableauBordComponent implements OnInit {
  // Propriétés
  sprints: Sprint[] = [];
  selectedSprint: number | null = null;
  sprintProgression: number = 0;
  devs: User[] = [];

  constructor(private sprintService: SprintService, private tacheTechniqueService: TacheTechniqueService) { }

  ngOnInit(): void {
    this.loadSprints();
    this.loadDevsWithTasks();
  }

  // Méthode pour charger les sprints
  loadSprints(): void {
    this.sprintService.getAllSprints().subscribe(sprints => {
      console.log('Tous les sprints:', sprints);
      this.sprints = sprints;
    });
  }

  // Méthode pour charger les développeurs avec leurs tâches
  loadDevsWithTasks(): void {
    this.tacheTechniqueService.getDevelopers().subscribe(
      devs => {
        this.devs = devs;
        console.log('Développeurs récupérés avec succès :', devs);
        this.loadTasksForDevs();
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des développeurs :', error);
      }
    );
  }
  
  // Méthode pour charger les tâches pour chaque développeur
  loadTasksForDevs(): void {
    this.devs.forEach(dev => {
      this.tacheTechniqueService.getNombreTachesParStatut(dev.idUser).subscribe(
        stats => {
          const tasksStats: UserTasksStats = {
            userId: dev.idUser,
            nombreTachesEnCours: stats['Encours'],
            nombreTachesAFaire: stats['Afaire'],
            nombreTachesTerminees: stats['Terminée'],
            progression: 0 // Cette propriété sera calculée et mise à jour dans le template HTML
          };
          // Calculer la progression en pourcentage
          const totalTasks = stats['Encours'] + stats['Afaire'] + stats['Terminée'];
          if (totalTasks > 0) {
            tasksStats.progression = (stats['Terminée'] / totalTasks) * 100;
          }
          // Assigner les statistiques des tâches au développeur actuel
          dev.tasksStats = tasksStats;
        },
        error => {
          console.error('Erreur lors du chargement des tâches pour le développeur', dev.idUser, ':', error);
        }
      );
    });
  }
  getProgressType(percentage: number): string {
    if (percentage >= 0 && percentage < 25) {
      return 'primary';
    } else if (percentage >= 25 && percentage < 50) {
      return 'danger';
    } else if (percentage >= 50 && percentage < 75) {
      return 'info';
    } else if (percentage >= 75 && percentage < 100) {
      return 'success';
    } else {
      return 'warning';
    }
  }
  

  // Méthode pour gérer la sélection d'un sprint
  onSprintSelected(): void {
    if (this.selectedSprint !== null) {
      console.log('ID du sprint sélectionné :', this.selectedSprint);
      this.sprintService.getSprintProgression(this.selectedSprint).subscribe(
        progression => {
          console.log('Progression du sprint :', progression);
          this.sprintProgression = progression;
        },
        error => {
          console.error('Erreur lors de la récupération de la progression du sprint :', error);
        }
      );
    }
  }
}
