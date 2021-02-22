// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AngularFireDatabaseModule} from '@angular/fire/database';

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyByvTifvAnLfpaYyyZEtGTRiWwQAhqcYUs",
    authDomain: "projet-angular-ecole.firebaseapp.com",
    databaseURL: "https://projet-angular-ecole-default-rtdb.firebaseio.com",
    projectId: "projet-angular-ecole",
    storageBucket: "projet-angular-ecole.appspot.com",
    messagingSenderId: "413874779281",
    appId: "1:413874779281:web:b8807526e8cafce2fcbb30",
    measurementId: "G-BQ2G5V26YE"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
