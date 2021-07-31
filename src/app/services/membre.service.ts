import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Membre } from '../model/membre';

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private membresUrl = 'http://127.0.0.1:8000/api/membres?page=1';
  private addMembresUrl = 'http://127.0.0.1:8000/api/membres';
 // private editMembreUrl = 'http://127.0.0.1:8000/api/membres/';


  
  constructor(private http: HttpClient, private router: Router) { }
  getMembres() {
    return this.http.get<any>(this.membresUrl);
  }

  // tslint:disable-next-line:no-shadowed-variable
  addMembre(dateDeNaissance,poids,taille,nom) {
    return this.http.post(this.addMembresUrl, {
   
        "idMembre": 0,
        "dateDeNaissance": dateDeNaissance,
        "estMembre": true,
        "poids": poids,
        "taille": taille,
        "nom":nom
      
    });
  }
  editMembre(dateDeNaissance,poids,taille,nom,id) {
    console.log('id from service' + id);
    const editMembreUrl = 'http://127.0.0.1:8000/api/membres/' + id;

    return this.http.put(editMembreUrl, {
      
        
        "dateDeNaissance": dateDeNaissance,
        "estMembre": true,
        "poids": poids,
        "taille": taille,
        "nom": nom,
      

    });

  }
  removeMembre(id) {
    const editMembreUrl = 'http://127.0.0.1:8000/api/membres/' + id;

    return this.http.delete(editMembreUrl);
  }

}
