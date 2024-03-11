import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import 'jquery';
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  nombre: string = '';
  email: string = '';
  edad: number | null = null;
  genero: string = '';

  usuarios: any;

  async ngOnInit() {
    await this.obtenerUsuarios(); 
  }

  async obtenerUsuarios(){
    axios.get('http://localhost:3700/api/get')
      .then(response => {
        console.log('Datos obtenidos:', response.data);
        
        this.usuarios =  response.data.users;
        console.log("this.usuarios: ", this.usuarios);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }

  guardarDatos() {
    if (this.nombre && this.email && this.edad && this.genero) {
      const datosFormulario = {
        name: this.nombre,
        email: this.email,
        age: this.edad,
        gender: this.genero
      };
      console.log("datosFormulario: ", datosFormulario);
      
      axios.post('http://localhost:3700/api/post', datosFormulario)
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
  
  eliminarUsuario(id: string) {
    console.log('Eliminar usuario con id:', id);
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este usuario?');

    if (confirmacion) {
      axios.delete(`http://localhost:3700/api/delete/${id}`)
        .then(response => {
          console.log('Usuario eliminado con éxito:', response.data);
          this.obtenerUsuarios();
        })
        .catch(error => {
          console.error('Error al eliminar usuario:', error);
        });
    }
  }

  nombreEditar: string = '';
  emailEditar: string = '';
  edadEditar: number | null = null;
  generoEditar: string = '';
  idUsuarioSeleccionado: string | null = null;

  abrirModal(id: string, nombre: string, email: string, edad: number, genero: string) {    
    this.nombreEditar = nombre;
    this.emailEditar = email;
    this.edadEditar = edad;
    this.generoEditar = genero;
    this.idUsuarioSeleccionado = id;
    $('#editarUsuarioModal').modal('show');
  }

  editarUsuario() {
    console.log("Entraaa");
    console.log("this.idUsuarioSeleccionado: ", this.idUsuarioSeleccionado);
    
    if (this.idUsuarioSeleccionado) {
      const datosEditados = {
        name: this.nombreEditar,
        email: this.emailEditar,
        age: this.edadEditar,
        gender: this.generoEditar
      };
      console.log("datosEditados: ", datosEditados);
      

      axios.put(`http://localhost:3700/api/put/${this.idUsuarioSeleccionado}`, datosEditados)
      .then(response => {
        console.log('Usuario actualizado con éxito:', response.data);
    
        this.obtenerUsuarios();
        $('#editarUsuarioModal').modal('hide');
      })
      .catch(error => {
        console.error('Error al actualizar usuario:', error);
      });
    
    }
  }

  cancelarEdicion() {
    this.nombreEditar = '';
    this.emailEditar = '';
    this.edadEditar = null;
    this.generoEditar = '';
    this.idUsuarioSeleccionado = null;

    $('#editarUsuarioModal').modal('hide');
  }
}
