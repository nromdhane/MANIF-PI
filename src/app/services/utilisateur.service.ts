import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { utilisateur } from '../model/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private utilisateurUrl = 'http://127.0.0.1:8000/api/users?page=1';
  private addUtilisateurUrl = 'http://127.0.0.1:8000/api/users';
  //private editUtilisateurUrl = 'http://127.0.0.1:8000/api/utilisateurs/';
  //private removeUtilisateurUrl = 'http://127.0.0.1:8000/api/utilisateurs/';

  constructor(private http: HttpClient, private router: Router) { }
  getUtilisateurs() {
    return this.http.get<any>(this.utilisateurUrl);
  }
  getUtilisateursparid(id) {
    let identifier=id.split("/")[3];
    const getparidUtilisateurUrl = 'http://127.0.0.1:8000/api/users/' + identifier;
    return this.http.get<any>(getparidUtilisateurUrl);
  }


  // tslint:disable-next-line:no-shadowed-variable
  addUtilisateur(email, roles, password,lattitude,longitude,reset_token) {
    return this.http.post(this.addUtilisateurUrl, {
    
        "email":email,
        "roles":roles?roles: [
          "ROLE_USER"
        ],
        "resetToken":reset_token?reset_token: "123",
        "lattitude": lattitude,
        "longitude": longitude,
        "password": password


    });
  }
  editUtilisateur(email, roles, password,lattitude,longitude,reset_token, id) {
    console.log('id from service' + id);
    let identifier=id.split("/")[3];
    const editUtilisateurUrl = 'http://127.0.0.1:8000/api/users/' + identifier;

    return this.http.put(editUtilisateurUrl, {
      'email': email,
      'roles': roles,
      'password': password,
      'lattitude': lattitude,
      'longitude': longitude,
      'resetToken': reset_token,

    });

  }
  removeUtilisateur(id) {
    let identifier=id.split("/")[3];
    const removeUtilisateurUrl = 'http://127.0.0.1:8000/api/users/' + identifier;

    return this.http.delete(removeUtilisateurUrl);
  }
}
