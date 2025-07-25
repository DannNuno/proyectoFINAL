import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonList, IonItem, IonButton,IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { I } from '@angular/common/common_module.d-Qx8B6pmN';

@Component({
  selector: 'app-grupo-ejercicios',
  templateUrl: './grupo-ejercicios.page.html',
  styleUrls: ['./grupo-ejercicios.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem,IonButton,IonImg]
})
export class GrupoEjerciciosPage implements OnInit {

 

  grupo: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.grupo = navigation?.extras.state?.['grupo'];
  }
  ngOnInit(): void {
    
  }
    verEjercicio(id: any) {
    // Guarda el ejercicio seleccionado si quieres pasarlo completo
   const ejercicio = this.grupo?.ejercicios?.find((e: any) => e.id === id);

    localStorage.setItem('ejercicioActual', JSON.stringify(ejercicio));
      
    // Redirige al detalle
    this.router.navigate(['/detalle-ejercicio', id ]);
  }

  volver() {
    
    localStorage.removeItem('ejercicioActual');
    window.history.back();
  }
}
