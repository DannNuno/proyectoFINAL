import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Firestore, collection, addDoc, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './comentarios.page.html',
})
export class ComentariosPage {
  firestore = inject(Firestore);
  auth = inject(Auth);

  nombre = '';
  comentario = '';
  comentarios: any[] = [];

  constructor() {
    this.cargarComentarios();
  }

  async agregarComentario() {
    const user = await this.auth.currentUser;
    if (!user) {
      alert('Debes iniciar sesión para comentar.');
      return;
    }

    const nuevoComentario = {
      correo: user.email,
      nombre: this.nombre,
      comentario: this.comentario,
      fecha: Timestamp.fromDate(new Date()),
    };

    const comentariosRef = collection(this.firestore, 'comentarios');

    try {
      await addDoc(comentariosRef, nuevoComentario);
      console.log('Comentario enviado');
      this.nombre = '';
      this.comentario = '';
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  }

  cargarComentarios() {
    const comentariosRef = collection(this.firestore, 'comentarios');
    const q = query(comentariosRef, orderBy('fecha', 'desc'));

    collectionData(q, { idField: 'id' }).subscribe(data => {
      this.comentarios = data;
    });
  }
}
