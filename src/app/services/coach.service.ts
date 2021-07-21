import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from '../model/coach';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private coachsUrl = 'http://127.0.0.1:8000/api/coaches?page=1';
  private addCoachUrl = 'http://127.0.0.1:8000/api/coaches';
   private editCoachUrl = 'http://127.0.0.1:8000/api/coaches/';

   constructor(private http: HttpClient, private router: Router) { }
   getCoachs() {
     return this.http.get<any>(this.coachsUrl);
   }
 
   // tslint:disable-next-line:no-shadowed-variable
   addCoach(nom, prenom, disponibilite, email, specialite, activite) {
     return this.http.post(this.addCoachUrl, {
       'nom': nom,
       'prenom': prenom,
       'email': email,
       'disponibilite': disponibilite,
       //'specialite': specialite,
       //'activite': activite,
     });
   }
   editCoach(email, disponibilite, id) {
     console.log('id from service' + id);
     const editCoachUrl = 'http://127.0.0.1:8000/api/coaches/' + id;
 
     return this.http.put(editCoachUrl, {
       'email': email,
       'disponibilite': disponibilite,
       
 
     });
 
   }
   removeCoach(id) {
     const editCoachUrl = 'http://127.0.0.1:8000/api/coaches/' + id;
 
     return this.http.delete(editCoachUrl);
   }
 
 }
 