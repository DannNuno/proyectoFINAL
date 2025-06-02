
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonItem, IonImg} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonItem, IonImg, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit() {
  }




  emailInput: string = '';
  passwordInput: string = '';
  async onSubmit() {




    try {
      await this.authService.logine(this.emailInput, this.passwordInput);
      const alert = await this.alertController.create({
        header: 'Sesion iniciada',
        message: 'Tu sesion a sido enviado iniciada',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl("index");
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tu sesion no se pudo iniciar ',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }


  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  }
  onSignUp() {
    this.router.navigateByUrl("home");
  }
  onForgot() {
    this.router.navigateByUrl("forgot");
  }
  onHome() {
    this.router.navigateByUrl("home");
  }
}