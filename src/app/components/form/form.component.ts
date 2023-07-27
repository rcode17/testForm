import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../../services/form-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Output() formSubmitted = new EventEmitter<void>();

  form: FormGroup;

  opciones = [
    { nombre: 'Desarrollador Java', valor: 'op1' },
    { nombre: 'Desarrollador Angular', valor: 'op2' },
    { nombre: 'Analista de pruebas', valor: 'op3' },
    
  ];


  constructor(private fb: FormBuilder, private formService: FormServiceService, private router:Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10),Validators.pattern(/^[0-9]+$/)]],
      expWork: ['', Validators.required],
      pInterest: ['', Validators.required],
      //cvAttach!: File;

    });
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.formService.enviarFormulario(formData).subscribe(
        response => {
          // Manejo de la respuesta exitosa
          console.log('Respuesta exitosa:', response);
          this.formService.setMessage(response.message);
          this.formSubmitted.emit();
          this.router.navigate(['/confirmacion']);
        },
        error => {
          // Manejo del error
          console.error('Error en la solicitud:', error);
          console.log('Respuesta error:', error);
        }
      );
      }else{
        console.log("llenar todos los campos");
    }
  }

}
