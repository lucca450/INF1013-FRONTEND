import { Injectable } from '@angular/core';
import {Intervenant} from '../../models/intervenant/intervenant';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {User} from '../../models/users/user';
import {MatTableDataSource} from '@angular/material/table';
import {EducationLevel} from '../../models/educationLevel/education-level';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {
  intervenants: Intervenant[];
  intervenantSubject = new Subject<any[]>();
  constructor(private router: Router/*, public db: AngularFirestore*/) {
/*
    this.intervenantFromDb$ = this.db.collection('/intervenants').valueChanges();
    this.intervenantFromDb$.subscribe(
      (value: any) => {
        this.intervenants = value;
      }
    );
*/
    /*
    // Si on veut ajouter les intervenants à la base de données
    this.intervenants = this.mockIntervenantData();
    this.intervenants.forEach(obj => {
      console.log(obj);
      this.addIntervenantToServer(obj);
    })
  */

   // this.intervenants = this.mockIntervenantData();
   // this.saveIntervenantToServer();
    // this.getIntervenantFromServer();
    this.getIntervenants();
    console.log('all fine');
  }


  /*
  intervenantCollection: AngularFirestoreCollection<Intervenant> = this.db.collection<Intervenant>('intervenants');
  intervenantSubject = new Subject<any[]>();
  intervenantFromDb$: any;



*/

  /*
    // Fonction pour sauvegarder les données des intervenants sur le serveur
     saveIntervenantToServer(): void{
      this.httpClient.put(this.urlIntervenantFromServer, this.intervenants)
        .subscribe(
          () => {
            console.log('Enregistrement réeussie');
          },
        (error) => {
            console.log('Erreur ! : ' + error);
        }
      );
    }
  */
  // Fonction pour récupérer les intervenants sur le serveurs

  getIntervenants(){

    fetch('http://localhost:3000/Intervenants')
      .then((response =>
          response.json()
      ))
      .then((json) =>
      {
        console.log('call intervenant');
        this.intervenants = json;
        this.emitIntervenantSubject();
      })
  }




  // Fonction pour générer les données lié aux intervenants
  private mockIntervenantData(): Intervenant[]{
    return[
      {interfaceName: 'Intervenant', id : 0, lname : 'nomIntervenant', fname : 'prénomIntervenant', email : 'pierro_kool@hotmail.com', phone : '8196932091', address : '320 rue Amazone'},
      {interfaceName: 'Intervenant', id : 1, lname : 'nomIntervenant2', fname : 'prénomIntervenant2', email : 'pierro_kool@hotmail.com2', phone : '8196932092', address : '321 rue Amazone'},
      {interfaceName: 'Intervenant', id : 2, lname : 'nomIntervenant3', fname : 'prénomIntervenant3', email : 'pierro_kool@hotmail.com3', phone : '8196932093', address : '322 rue Amazone'}
    ];
  }
  addIntervenantToServer(intervenant: Intervenant){
    return new Promise(
      ((resolve, reject) => {
    fetch("http://localhost:3000/Intervenants", {
      method: "POST",
    body: JSON.stringify({
      interfaceName: intervenant.interfaceName,
      id: intervenant.id,
      lname: intervenant.lname,
      fname: intervenant.fname,
      email: intervenant.email,
      phone: intervenant.phone,
      address: intervenant.address
  }),
    headers: {
    "Content-type": "application/json; charset=UTF-8"
    }
  })
      .then((result) => result.json())
      .then((response)=> {
        if(response)
        {
          this.addIntervenant(intervenant);
          resolve(true);
        }
        else
        {
          reject("Erreur au niveau du serveur lors de l'ajout. Veuillez réessayer plus tard.")
        }
      })
    })
  )
}

editIntervenantToServer(intervenant: Intervenant){
  return new Promise(
    ((resolve, reject) => {
  fetch("http://localhost:3000/Intervenants/"+intervenant.id, {
    method: "PUT",
    body: JSON.stringify({
      interfaceName: intervenant.interfaceName,
      id: intervenant.id,
      lname: intervenant.lname,
      fname: intervenant.fname,
      email: intervenant.email,
      phone: intervenant.phone,
      address: intervenant.address
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then((result) => result.json())
    .then((response)=> {
      if(response)
      {
        this.editIntervenant(intervenant);
        resolve(true);
      }
      else
      {
        reject("Erreur au niveau du serveur lors de la modification. Veuillez réessayer plus tard.")
      }
     })
    })
  )
}

deleteIntervenantToServer(id: number)
{
  return new Promise(
    ((resolve, reject) => {
  fetch("http://localhost:3000/Intervenants/"+id, {
  method: "DELETE"
  })
    .then((result) => result.json())
    .then((response)=> {
      if(response)
      {
        this.deleteIntervenant(id);
        resolve(true);
      }
      else
      {
        reject("Erreur au niveau du serveur lors de la suppression. Veuillez réessayer plus tard.")
      }
    })
    })
  )
}

/*
  addIntervenantToServer(intervenant: Intervenant): void{
    this.intervenantCollection.add(intervenant);
  }


  editIntervenantToServer(intervenant: Intervenant): void{
    this.intervenantCollection.add(intervenant);
  }
  */

  /*

   getIntervenantFromServer(): void{
    this.httpClient
      .get<any[]>(this.urlIntervenantFromServer)
      .subscribe(
        (response) => {
          this.intervenants = response;
          this.emitIntervenantSubject();
        },
        (error) => {
          console.log('erreur intervenant ! : ' + error);
        }
      );
  }
  */


addIntervenant(intervenant: any): void {

  this.intervenants.push(intervenant);
  this.router.navigate(['intervenant']);
}

  // Fonction pour récupérer l'intervenant à partir de son identifiant
  getIntervenantFromID(id: number): Intervenant{
    let index = this.getIntervenantIndexFromId(id);
    return this.intervenants[index];
  }

  getIntervenantIndexFromId(id: number): any {

  for(let i = 0 ; i<this.intervenants.length; i++)
    if(this.intervenants[i].id == id)
    return i;
  }


/*
  getIntervenantsTEST(): any{
    return this.db.collection ('intervenants').snapshotChanges();
  }

 */

  // Fonction pour modifier un intervenant
  editIntervenant(intervenant: any): void {
    const index = this.getIntervenantIndexFromId(intervenant.id);
    this.intervenants[index] = intervenant;
    this.router.navigate(['intervenant']);
  }

  deleteIntervenant(id: number){
    const index = this.getIntervenantIndexFromId(id);
    this.intervenants.splice(index,1);
    this.emitIntervenantSubject();
  }

  // Fonction pour récupérer le nom complet de l'intervenant à partir de son identifiant
  public intervenantFullName(id: number): string {
    let intervenant: Intervenant;
    // tslint:disable-next-line:only-arrow-functions typedef
    intervenant = this.intervenants.find(function(i: Intervenant) {
      return i.id === id;
    });
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

  private emitIntervenantSubject(): void {
    this.intervenantSubject.next(this.intervenants.slice());
  }
}
