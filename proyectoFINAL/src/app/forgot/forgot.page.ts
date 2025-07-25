
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonItem, IonImg } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonItem, IonImg, CommonModule, FormsModule]
})
export class ForgotPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
  ) { }


  ngOnInit() {
  }
  emailInput: string = '';

  async onSubmit() {




    try {
      await this.authService.resetPassword(this.emailInput)
      const alert = await this.alertController.create({
        header: 'Contraseña enviada',
        message: 'Tu contraseña se envio',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl("login");
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tu sesion no se pudo encontrar ',
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
    this.router.navigateByUrl("login");
  }
}