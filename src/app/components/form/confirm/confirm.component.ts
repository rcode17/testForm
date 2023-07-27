import { Component } from '@angular/core';
import { FormServiceService } from '../../../services/form-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  successMsg: string = '';

  constructor(private formService: FormServiceService,private router:Router){
    this.successMsg = this.formService.getMessage();
  }

  regresarAlFormulario(): void {
    this.router.navigate(['/formulario']);
  }

}
