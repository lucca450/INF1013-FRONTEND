import { Injectable } from '@angular/core';
import {Intervenant} from '../../models/intervenant/intervenant';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {User} from '../../models/users/user';
import {UserService} from '../user/user.service';
import formatErrorMsg = jasmine.formatErrorMsg;

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {
  intervenants: Intervenant[];
  intervenantSubject = new Subject<any[]>();
  errorsSubject: Subject<string> = new Subject<string>();
  userSubscrition: Subscription;
  constructor(private router: Router, private httpClient: HttpClient, private userService: UserService) {
/*
    this.getIntervenants().subscribe(
      (intervenants: any) => {
        this.intervenants = intervenants;
        this.emitIntervenantSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    )

 */
  }

  getActiveInternants(){
/*
    let data: any = [
      {
        id: '',
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        active: ''
      }
    ];

 */

    this.intervenants = [];
  this.httpClient.get<User>('http://localhost:3000/users?active=true').subscribe(
      (users: any) => {

        users.forEach( (user) => {

          this.httpClient.get<Intervenant>('http://localhost:3000/intervenants?id='+user.id).subscribe(
            (intervenant: any) => {
              console.log(intervenant[0]);
              this.intervenants.push(intervenant[0]);
              this.emitIntervenantSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          )
          // this.intervenants = intervenants;
        });
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
      )
  }

  // Fonction pour récupérer les intervenants sur le serveurs

  getIntervenants(){
    return this.httpClient.get<Intervenant>(`http://localhost:3000/intervenants`);
  }

  addIntervenantToServer(intervenant: Intervenant, user: User){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(intervenant);
    this.httpClient.post('http://localhost:3000/intervenants', body, {'headers': headers}).subscribe(
      (intervenant: any) => {
        this.userService.addUserToServer(user);
        this.userSubscrition = this.userService.verifyError.subscribe(
          (response: any) => {
            this.addIntervenant(intervenant);
            this.goToMainRoute();
          },
          (error: any) => {
            this.emitErrorsSubject(error);
          }
        )
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de l\'intervenant. Veuillez réessayer plus tard';
        this.emitErrorsSubject(message);
      }
    )
}

editIntervenantToServer(intervenant: Intervenant, user: User){
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify(intervenant);
  this.httpClient.put('http://localhost:3000/intervenants/'+intervenant.id, body, {'headers': headers}).subscribe(
    (intervenant: any) => {
      this.userService.editUserToServer(user);
      this.userSubscrition = this.userService.verifyError.subscribe(
        (user: any) => {
          this.editIntervenant(intervenant);
          this.goToMainRoute();
        },
        (error) => {
          const message = 'Un erreur au niveau du serveur est survenu lors de la modification de l\'intervenant. Veuillez réessayer plus tard';
          this.emitErrorsSubject(message);
        }
      )
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la modification de l\'intervenant. Veuillez réessayer plus tard';
      this.emitErrorsSubject(message);
    }
  )
}

deleteIntervenantToServer(id: number)
{
  const user = this.userService.getUserFromID(id);
  user.active = !user.active;
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify(user);
  this.httpClient.put('http://localhost:3000/users/'+user.id, body, {'headers': headers}).subscribe(
    (intervenant: any) => {
      this.userService.editUserToServer(user);
      this.userSubscrition = this.userService.verifyError.subscribe(
        (user: any) => {
          this.editIntervenant(intervenant);
          this.goToMainRoute();
        },
        (error) => {
          const message = 'Un erreur au niveau du serveur est survenu lors de la modification de l\'intervenant. Veuillez réessayer plus tard';
          this.emitErrorsSubject(message);
        }
      )
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la modification de l\'intervenant. Veuillez réessayer plus tard';
      this.emitErrorsSubject(message);
    }
  )
}


addIntervenant(intervenant: any): void {
  this.intervenants.push(intervenant);
  this.emitIntervenantSubject();
}

private goToMainRoute(){
  this.router.navigate(['intervenant']);
}

  // Fonction pour récupérer l'intervenant à partir de son identifiant
  getIntervenantFromID(id: number): Intervenant{
    const index = this.getIntervenantIndexFromId(id);
    return this.intervenants[index];
  }

  getIntervenantIndexFromId(id: number): any {

  for (let i = 0 ; i < this.intervenants.length; i++) {
    if (this.intervenants[i].id == id) {
    return i;
    }
  }
  }


  // Fonction pour modifier un intervenant
 private editIntervenant(intervenant: any): void {
    const index = this.getIntervenantIndexFromId(intervenant.id);
    this.intervenants[index] = intervenant;
    this.emitIntervenantSubject();
  }

private  deleteIntervenant(id: number){
    const index = this.getIntervenantIndexFromId(id);
    this.intervenants.splice(index, 1);
    this.emitIntervenantSubject();
  }

  // Fonction pour récupérer le nom complet de l'intervenant à partir de son identifiant
  public intervenantFullName(id: number): string {
    let intervenant: Intervenant;

    intervenant = this.getIntervenantFromID(id);
    console.log(intervenant.fname + ' ' + intervenant.lname);
    return intervenant.fname  + ' ' + intervenant.lname;
  }

  // Fonction annuler l'étape concernant l'intervenant
  cancelIntervenant(): void {
    this.router.navigate(['intervenant']);
  }

  // Fonction pour modifier le compte de l'intervenant
  editAccount(myID: number, data: any): void {

    try {
      const itemIndex = this.intervenants.findIndex(item => item.id === myID);
      data.id = this.intervenants[itemIndex].id;
      this.intervenants[itemIndex] = data;
      this.router.navigate(['intervenant']);
    }catch (e) {
      alert('Erreur lors de la modification.');
    }
  }
/*
  getMaxId(){
    let max = 0;
    this.intervenants.forEach(character => {
      if (character.id > max) {
        max = character.id;
      }
    });
    return max+1;
  }

 */

  private emitIntervenantSubject(): void {
    this.intervenantSubject.next(this.intervenants.slice());
  }

  private emitErrorsSubject(message: string): void {
    this.errorsSubject.next(message);
  }
}
