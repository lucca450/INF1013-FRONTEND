import { Injectable } from '@angular/core';
import {User} from '../../models/users/user';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {rejects} from 'assert';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[]; // Liste de tout les utilisateurs
  usersRef : AngularFirestoreCollection<User>
  userConnected : Observable<any>
  user: User; //L'utilisateur connecté
  userSubject = new Subject<any>();
  items: Observable<User[]>

  isAuth : boolean = false;
  authSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router, public db: AngularFirestore) {

    this.usersRef = this.db.collection<User>('users')
    this.getUser();

    /*
    this.db.collection('users').valueChanges()
      .subscribe(val => console.log(val));

     */
    // Si on veut ajouter les utilisateurs à la base de données
    /*
    this.users = this.mockUserData();
    this.users.forEach(obj => {
      console.log(obj);
      this.addToServer(obj);
    })
*/

  }

  getItems(){
    return this.items;
  }

  // Fonction pour générer les données lié aux utilisateurs
  private mockUserData(): User[]{
    return[
      {interfaceName: 'User', id : 0, email : 'pierro_kool@hotmail.com', password : '123', role : 'A'},
      {interfaceName: 'User', id : 1, email : 'pierro_kool@hotmail.com2', password : '456', role : 'I'},
      {interfaceName: 'User', id : 2, email : 'pierro_kool@hotmail.com3', password : '789', role : 'I'}
    ];

  }

  // Fonction pour sauvegarder les données des utilisateurs sur le serveur
  saveUserToServer(){

/*   // firebase.database().ref('/users123').set(this.users);
    this.database.list('users').valueChanges();
    .subscribe()
*/

  }

  addToServer(user: User){
    console.log('My users : '+user);
    this.usersRef.add(user)
  }

getUser(){
    /*
  const query = this.usersRef.ref.where('email', '==', 'pierro_kool@hotmail.com').where('password', '==', '123');
  query.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      console.log('no data found');
    } else if (querySnapshot.size > 1) {
      console.log('no unique data');
    } else {
      querySnapshot.forEach(documentSnapshot => {
        this.user$ = this.db.doc(documentSnapshot.ref);
        console.log(this.user$);
        // this.afs.doc(documentSnapshot.ref).valueChanges().subscribe(console.log);
      });
    }
  });
  */


}



  // Fonction pour récupérer les utilisateurs sur le serveurs
  getUsersFromServer(){
    //this.database.co
    /*
    firebase.database().ref('/users')
      .on('value',(data: DataSnapshot) => {
        this.users = data.val() ? data.val(): [];
        }
      )
      */

  }
/*
  // Fonction pour récupérer les utilisateurs sur le serveurs
  getUsersFromServer2(){
    this.item$ = this.db.collection('users').valueChanges();
  }
*/
/*
  // Fonction pour récupérer l'utilisateur à partir de son identifiant
  getUserFromID(id: number): User{
    return this.users.filter(p => p.id === id)[0];
  }
  */

  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant de quel utilisateur qui est connecté.
  private emitUserSubject() {
    this.userSubject.next(this.user);
  }

  // Fonction pour gèrer lorsqu'on émet les données pour que les autres qui écoute le sujet soit au courant lorsque l'utilisateur est connecté ou déconnecté.
  emitAuthSubject() {
    this.authSubject.next(this.isAuth);
  }

  // Fonction pour gèrer la déconnecter
  signOut() {
    this.isAuth = false;
    this.emitAuthSubject();
  }

  // Fonction pour se connecter
   verifyUserExist(email: String, password: String){

    /*
    return new Promise(
      (resolve,reject) => {
        this.httpClient
          .get<any[]>(this.urlUserFromServer)
          .subscribe(
            (response) => {
              response.find(
                (user) => {
                  if (user.email === email && user.password === password) {
                    resolve(user);
                  }
                  reject("Le nom d'utilisateur ou le mot de passe est invalide.");
                })
            },
            (error) => {
              reject(error);
            }
          );
      }
    )
    */
   // this.db.collection('cities').
  //  firebase.database().ref('/users')
/*
    firebase.database().ref('/users')
      .on('value',(data: DataSnapshot) => {
          this.user = data.val() ? data.val(): [];
        console.log('Utilisateur : '+this.user);
        if (this.user.email === email && this.user.password === password) {
          return true;
         }
        }
      )
      */

   // return false;
 return new Promise(
 (resolve,reject) => {
     this.db.collection('/users', ref => ref.where('email', '==', email)
       .where('password', '==', password))
       .get()
       .toPromise()
       .then((querySnapshot) => {

         querySnapshot.forEach((doc: any) => {
           // doc.data() is never undefined for query doc snapshots
           this.user = doc.data();
           this.emitUserSubject();
           console.log('user : ' + this.user.email)
           console.log(doc.id, " => ", doc.data())
           resolve(this.user);

         });
         if(querySnapshot.empty)
         {
           reject("Courriel ou mot de passe invalide.")
         }
       })

       .catch((error) => {
         console.log("Error getting documents: ", error);
        reject(error);
       })

       }

   );

  }

  test()
  {
    return this.db.collection('/users',ref => ref.
    where('email','==','test')
      .where('password','==','wtf'))
  }

  signIn(/*user: any*/){
    this.isAuth = true;
    //this.user = user;
    this.emitAuthSubject();
    this.emitUserSubject();
    this.router.navigate(['person']);
  }

  getReferenceUser() {

  }
}
