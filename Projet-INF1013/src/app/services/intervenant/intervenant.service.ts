import { Injectable } from '@angular/core';
import {Intervenant} from '../../models/intervenant/intervenant';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {User} from '../../models/users/user';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  intervenants: Intervenant[]; // Temporaire
  activateDesactivateSubject = new Subject<any>();
  intervenantsSubject = new Subject<any>();
  intervenantSubject = new Subject<any>();
  intervenantsFullnameSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  constructor(private router: Router, private httpClient: HttpClient, private userService: UserService) {
  }

  getAllIntervenants(){
    this.httpClient.get<Intervenant>(`http://localhost:3000/intervenants`).subscribe(
      (intervenants: any) => {
        this.emitIntervenantsSubject(intervenants);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants';
        this.emitErrorsSubject(error.error);
      }
    )
  }

  getIntervenantFromId(id: number){
    this.httpClient.get<Intervenant>(`http://localhost:3000/intervenants/`+id).subscribe(
      (intervenant: any) => {
        this.emitintervenantSubject(intervenant)
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants';
        this.emitErrorsSubject(error.error);
      }
    )
  }

  getActiveIntervenants(){
    let intervenants : Intervenant[] = [];
  this.httpClient.get<User>('http://localhost:3000/users?active=true').subscribe(
      (users: any) => {
        users.forEach( (user) => {
          this.httpClient.get<Intervenant>('http://localhost:3000/intervenants?id='+user.id).subscribe(
            (intervenant: any) => {
                intervenants.push(intervenant[0]);
                this.emitIntervenantsSubject(intervenants);
            },
            (error) => {
              const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants. Veuillez réessayer plus tard.';
              this.emitErrorsSubject(message);
            }
          )
        });
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des utilisateurs. Veuillez réessayer plus tard.';
        this.emitErrorsSubject(message);
      }
      )
  }

  addIntervenant(intervenant: Intervenant, user: User){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(intervenant);
    this.httpClient.post('http://localhost:3000/intervenants', body, {'headers': headers}).subscribe(
      (intervenant: any) => {
        this.userService.addUserToServer(user);
         this.userService.verifySubjectError.subscribe(
          (response: any) => {
            this.emitIntervenantsSubject(intervenant);
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

editIntervenant(intervenant: Intervenant, user: User){
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify(intervenant);
  this.httpClient.put('http://localhost:3000/intervenants/'+intervenant.id, body, {'headers': headers}).subscribe(
    (intervenant: any) => {
      this.userService.editUserToServer(user);
      this.userService.verifySubjectError.subscribe(
        (user: any) => {
          this.emitIntervenantsSubject(intervenant);
          this.goToMainRoute();
        },
        (error) => {
          const message = 'Un erreur au niveau du serveur est survenu lors de la modification de l\'intervenant. Veuillez réessayer plus tard';
          this.emitErrorsSubject(message);
        }
      )
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants';
      this.emitErrorsSubject(message);
    }
  )
}

ActiveDesactiveIntervenant(id: number, activeDesactive: boolean)
{
  console.log('i am call');
  const headers = { 'content-type': 'application/json'};
  const body = JSON.stringify({"active": activeDesactive});
  console.log(body);
  this.httpClient.patch('http://localhost:3000/users/'+id, body, {'headers': headers}).subscribe(
    (user: any) => {
      this.emitActivateDesactivateSubject(0);
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la suppression de l\'intervenant. Veuillez réessayer plus tard';
      this.emitErrorsSubject(message);
    }
  )
}

private goToMainRoute(){
  this.router.navigate(['intervenant']);
}

// Fonction pour récupérer le nom complet de l'intervenant à partir de son identifiant
public intervenantFullName(id: number): void {
  /*this.httpClient.get<Intervenant>(`http://localhost:3000/intervenants/` + id).subscribe(
    (intervenant: any) => {
      let fullname = intervenant.fname + ' ' + intervenant.lname;
      this.intervenantsFullnameSubject.next(fullname);
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des intervenants';
      this.emitErrorsSubject(message);
    }
  );*/

        this.httpClient.get<Intervenant>('http://localhost:3000/intervenants?id=' + id).subscribe(
          (intervenant: any) => {
            this.intervenantsFullnameSubject.next(intervenant[0]);
          },
          (error) => {
            const message = 'Une erreur au niveau du serveur est survenu lors de la récupération de l\'intervenant. Veuillez réessayer plus tard.';
            this.emitErrorsSubject(message);
          }
        );

}

  editAccount(myID: number, data: any): void {
  }

  // Fonction annuler l'étape concernant l'intervenant
  cancelIntervenant(): void {
    this.router.navigate(['intervenant']);
  }

   emitIntervenantsSubject(intervenants: any): void {
    this.intervenantsSubject.next(intervenants);
  }

  private emitIntervenantSubject(intervenants: Intervenant): void {
    this.intervenantSubject.next(intervenants);
  }
  private emitintervenantSubject(intervenants: Intervenant): void {
    this.intervenantSubject.next(intervenants);
  }

  private emitErrorsSubject(message: string): void {
    this.errorsSubject.next(message);
  }

  private emitActivateDesactivateSubject(id: number){
    this.activateDesactivateSubject.next(id);
  }
}
