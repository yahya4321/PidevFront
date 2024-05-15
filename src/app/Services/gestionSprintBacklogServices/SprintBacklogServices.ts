// sprint.service.ts

import { Injectable } from '@angular/core';
import { SprintBacklog } from '../../main/apps/model/sprintBacklog'; // Assurez-vous d'importer correctement votre modèle
import { tap, catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importez throwError à partir de 'rxjs'




@Injectable({
  providedIn: 'root',
})
export class SprintBacklogService  {
  private apiUrl = 'http://localhost:8082/api/sprintBacklogs'; // Assurez-vous de mettre le bon chemin d'API

  constructor(private http: HttpClient) {}

  getAllSprintBacklogs(): Observable<SprintBacklog[]> {
    return this.http.get<SprintBacklog[]>(this.apiUrl);
  }

  getSprintBacklogById(id: number): Observable<SprintBacklog> {
    return this.http.get<SprintBacklog>(`${this.apiUrl}/${id}`);
  }

  createSprintBacklog(sprintBacklog: SprintBacklog): Observable<SprintBacklog> {
    return this.http.post<SprintBacklog>(this.apiUrl, sprintBacklog);
  }

  updateSprintBacklog(id: number, sprintBacklog: SprintBacklog): Observable<SprintBacklog> {
    return this.http.put<SprintBacklog>(`${this.apiUrl}/${id}`, sprintBacklog);
  }

  deleteSprintBacklog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  assignSprintToSprintBacklog(sprintBacklogId: number, sprintId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${sprintBacklogId}/assign-sprint/${sprintId}`, {});
  }
  

  unassignSprintFromSprintBacklog(sprintBacklogId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${sprintBacklogId}/unassign-sprint`, {});
  }

  assignUserStoriesToSprintBacklog(sprintBacklogId: number, userStoryIds: number[]): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${sprintBacklogId}/assign-userstories`, { userStoryIds });
  }

  unassignUserStoriesFromSprintBacklog(sprintBacklogId: number, userStoryIds: number[]): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${sprintBacklogId}/unassign-userstories`, { userStoryIds });
  }
 // getSprintBacklogsBySprintId(sprintId: number): Observable<any[]> {
  //  return this.http.get<any[]>(`${this.apiUrl}/sprintBacklog/${sprintId}`);
  //}
  getSprintBacklogsBySprintId(sprintId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sprintBacklog/${sprintId}`).pipe(
      tap(data => console.log('Service Response:', data)),
      catchError(error => {
        console.error('Service Error:', error);
        throw error;  // Rethrow the error for further handling
      })
    );
  }
  filterSprintBacklogsByDate(startDate?: Date, endDate?: Date): Observable<SprintBacklog[]> {
    let params = new HttpParams();
  
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
  
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
  
    return this.http.get<SprintBacklog[]>(`${this.apiUrl}/filterByDate`, { params });
  }

 
 
assignUserStoryToSprintBacklog(sprintBacklogId: number, userStoryId: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${sprintBacklogId}/assign-userstory/${userStoryId}`, {})
  
    }
  }
