
import { Component, OnInit } from '@angular/core';
import { TacheTechnique } from '../../apps/model/tachTechnique';  
import { TacheTechniqueService } from '../../../Services/gestionTacheTechnique/TacheTechniqueService';  
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User, Role } from 'app/auth/models';




@Component({
  selector: 'app-afficher-tache-technique',
  templateUrl: './afficher-tache-technique.component.html',
  styleUrls: ['./afficher-tache-technique.component.scss']
})
export class AfficherTacheTechniqueComponent implements OnInit {

  tacheTechniques: TacheTechnique[] | null = null;
  searchQuery: string = '';
  currentuserId: number;
  userRole: Role | undefined;
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  


  constructor(private tacheTechniqueService: TacheTechniqueService, private router: Router,private authent:AuthenticationService) { }

  ngOnInit(): void {
    this.getAllTacheTechniques();
    this.currentuserId = this.authent.currentUserValue.idUser;
    this.userRole = this.authent.currentUserValue.rolee; // Assurez-vous que currentUserValue contient la propriété 'role'
    this.getAllTacheTechniques();
    

  
  }


  getAllTacheTechniques(): void {
    if (this.userRole && this.userRole.toLowerCase() === Role.Developer.toLowerCase()) {

      this.tacheTechniqueService.obtenirTachesParDevAffecteeId(this.currentuserId)
        .subscribe(tacheTechniques => {
          this.tacheTechniques = tacheTechniques;
          console.log('Tâches techniques récupérées kkkkkkkkkkkk :', this.tacheTechniques);
        });
   } else {      

      // Sinon, affichez toutes les tâches techniques
      this.tacheTechniqueService.getAllTacheTechniques()
        .subscribe(tacheTechniques => {
          this.tacheTechniques = tacheTechniques;
          console.log('Tâches techniques récupérées bbbbbbbbbbb:', this.tacheTechniques);
        });
    }
  }
  ouvrirFormulaireUpdate(id: number,idDev: number): void {
    this.router.navigate(['/TT', id, 'tacheTechnique']);
  }

  deleteTacheTechnique(id: number): void {
    this.tacheTechniqueService.deleteTacheTechnique(id).subscribe(
      () => {
        console.log('Tâche technique supprimée avec succès !');
        this.getAllTacheTechniques();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la tâche technique :', error);
      }
    );
  }
  onSearch(): void {
    this.searchTachesTechniques();
  }
 

  searchTachesTechniques(): void {
    if (this.searchQuery.trim() !== '') {
      this.tacheTechniqueService.searchTachesTechniques(this.searchQuery).subscribe(
        (result) => {
          this.tacheTechniques = result;
        },
        (error) => {
          console.error('Erreur lors de la recherche :', error);
        }
      );
    }
  }
}
