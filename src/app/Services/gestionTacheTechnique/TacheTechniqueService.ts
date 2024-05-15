import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TacheTechnique } from '../../main/apps/model/tachTechnique';
import { catchError ,tap  } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../../auth/models/user';


@Injectable({
  providedIn: 'root',
})
export class TacheTechniqueService {
  private apiUrl = 'http://localhost:8082/api/tacheTechniques';

  constructor(private http: HttpClient) {}

  createTacheTechnique(tacheTechnique: TacheTechnique): Observable<TacheTechnique> {
    return this.http.post<TacheTechnique>(`${this.apiUrl}/create`, tacheTechnique);
  }

  assignTacheTechniqueToUserStory(userStoryId: number, tacheTechnique: TacheTechnique): Observable<TacheTechnique> {
    return this.http.put<TacheTechnique>(`${this.apiUrl}/assignToUserStory/${userStoryId}`, tacheTechnique);
  }

  updateTacheTechnique(id: number, tacheTechnique: TacheTechnique): Observable<TacheTechnique> {
    return this.http.put<TacheTechnique>(`${this.apiUrl}/${id}`, tacheTechnique);
  }

  getAllTacheTechniques(): Observable<TacheTechnique[]> {
    return this.http.get<TacheTechnique[]>(`${this.apiUrl}`);
  }

  getTacheTechniqueById(id: number): Observable<TacheTechnique> {
    return this.http.get<TacheTechnique>(`${this.apiUrl}/${id}`);
  }

  deleteTacheTechnique(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  unassignTacheTechnique(tacheTechniqueId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${tacheTechniqueId}/unassign`, {});
  }
  getAllTacheTechniqueByUserStoryId(userStoryId: number): Observable<TacheTechnique[]> {
    return this.http.get<TacheTechnique[]>(`${this.apiUrl}/userStory/${userStoryId}`).pipe(
      tap(taches => console.log("Tâches techniques récupérées:", taches)),
      catchError(error => {
        console.error("Erreur lors de la récupération des tâches technique :", error);
        throw error;
      })
    );
    
  }
  affecterUtilisateurATache(idTache: number, idUtilisateur: number): Observable<string> {
    const url = `${this.apiUrl}/tache/${idTache}/utilisateur/${idUtilisateur}`;
    return this.http.put<string>(url, {})
    ;
  }
  getUsers(): Observable<any[]> {
    const url = `${this.apiUrl}/getAllUsers`;
    console.log('URL de la requête :', url); // Affiche l'URL de la requête dans la console
    return this.http.get<any[]>(url).pipe(
      tap(users => console.log('Utilisateurs rkkkkkkk :', users)), // Affiche les utilisateurs récupérés dans la console
      catchError(error => {
        console.error('Une erreur est survenue lors de la récupération des utilisateurs :', error); // Affiche l'erreur dans la console en cas d'échec de la requête
        throw error; // Renvoie l'erreur pour la gérer dans le composant appelant si nécessaire
      })
    );
  }
  obtenirTachesParDevAffecteeId(devAffecteeId: number): Observable<TacheTechnique[]> {
    return this.http.get<TacheTechnique[]>(`${this.apiUrl}/dev/${devAffecteeId}`);
  }
  
  
  searchTachesTechniques(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/searchAdvanced?query=${query}`);
  }
  getNombreTachesParStatut(idDev: number): Observable<any> {
    const url = `${this.apiUrl}/${idDev}/taches`;
    return this.http.get<any>(url);
  }
  getDevelopers(): Observable<User[]> {
    const url = `${this.apiUrl}/developpeurs`; 
    return this.http.get<User[]>(url);
  }
}
