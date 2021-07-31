import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Coach } from './model/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
 private salleUrl='http://127.0.0.1:8000/api/salle_de_sports?page=1';
 private addCoachUrl='http://127.0.0.1:8000/api/salle_de_sports/';


  constructor(private http: HttpClient, private router: Router) { }
  getSalles(){
    return this.http.get<any>(this.salleUrl);
  }

  editSalle(nom, description, id) {
    console.log('id from service' + id);
    const editSalleUrl = 'http://127.0.0.1:8000/api/salle_de_sports/' + id;

    return this.http.put(editSalleUrl, {
      'nom': nom,
      'description': description,
      

    });

  }
  removeSalle(id) {
    const deleteSalleUrl = 'http://127.0.0.1:8000/api/salle_de_sports/' + id;

    return this.http.delete(deleteSalleUrl);
  }
  
  addSalle(nom,description) {
    return this.http.post(this.addCoachUrl, {
      'nom': nom,
      'description': description
      
      //'activite': activite,
    });
  }

}
