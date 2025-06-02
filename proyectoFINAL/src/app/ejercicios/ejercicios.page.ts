import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonItemDivider, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonLabel,  IonItemDivider,HttpClientModule, IonButton]
})
export class EjerciciosPage implements OnInit {

  
   grupos: any[] = [];

  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit() {
    this.http.get<any>('assets/ejercicios.json').subscribe(data => {
      this.grupos = data.grupos_musculares;
      console.log('Grupos cargados:', this.grupos);
    });
  }
  verEjercicios(grupo: any) {
    this.router.navigate(['/grupo-ejercicios'], {
      state: { grupo }
    });

  }
  volver() {
    localStorage.removeItem('ejercicioActual');
    window.history.back();
  }
}
