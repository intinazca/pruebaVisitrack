import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {
  nombre: string = '';
  email: string = '';
  edad: number | null = null;
  genero: string = '';

  guardarDatos() {
    if (this.nombre && this.email && this.edad && this.genero) {
      const datosFormulario = {
        nombre: this.nombre,
        email: this.email,
        edad: this.edad,
        genero: this.genero
      };

      axios.post('URL_DE_TU_API', datosFormulario)
        .then(response => {
          console.log('Datos enviados exitosamente:', response.data);
        })
        .catch(error => {
          console.error('Error al enviar datos:', error);
        });
    } else {
      console.error('Todos los campos deben estar completos');
    }
  }
}
