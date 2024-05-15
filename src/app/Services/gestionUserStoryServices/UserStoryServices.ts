import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStory } from '../../main/apps/model/userStory';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {
  private apiUrl = 'http://localhost:8082/userstory'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getAllUserStories(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(`${this.apiUrl}/getUserStory`);
  }

  createUserStory(userStory: UserStory): Observable<UserStory> {
    return this.http.post<UserStory>(`${this.apiUrl}/createUserStory`, userStory);
  }

  updateUserStory(id: number, userStory: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.apiUrl}/updateUserStory/${id}`, userStory);
  }

  deleteUserStory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteUserStory/${id}`);
  }

}
