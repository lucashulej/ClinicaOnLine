import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  loguearse(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then((response: any) => {
        resolve(response);
      },(error: any) => {
        console.log(error);
        switch(error.code) {
          case "auth/wrong-password":
            reject("Contrasena Incorrecta");
            break;
          case "auth/user-not-found":
            reject("Usuario No Encontrado");
            break;
          case "auth/invalid-email":
            reject("Mail Invalido");
            break;
          case "auth/wrong-password":
            reject("Contrasena Invalida");
            break;
          case "auth/argument-error":
            reject("Campos Vacios");
            break;
          default:
            reject(error.code);
            break;
        }
      });
    });
  }

  registrarse(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((response: any) => {
        this.enviarMailDeVerificacion();
        resolve(response);
      },(error: any) => {
        console.log(error);
        switch(error.code) {
          case "auth/weak-password":
            reject("Contrasena Corta");
            break;
          case "auth/user-not-found":
            reject("usuario no encontrado");
            break;
          case "auth/invalid-email":
            reject("Mail Invalido");
            break;
          case "auth/wrong-password":
            reject("Contrasena Invalida");
            break;
          case "auth/email-already-in-use":
            reject("Ta Exiiste una Cuenta con ese Mail");
            break;
          case "auth/argument-error":
            reject("Campos Vacios");
            break;
          default:
            console.log(error.code);
            reject(error.code);
            break;
        }
      });
    });
  }

  obtenerUsuario() {
    return this.afAuth.currentUser;
  }

  desloguearse() {
    this.afAuth.signOut();
  }

  async enviarMailDeVerificacion(){
    return await (await this.afAuth.currentUser).sendEmailVerification(); 
  }
}
