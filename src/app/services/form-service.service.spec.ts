import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormServiceService } from './form-service.service';
import { environment } from '../../environments/environment';
import { FormBuilder } from '@angular/forms';

describe('FormServiceService', () => {
  let service: FormServiceService;
  let httpTestingController: HttpTestingController;
  let formBuilder: FormBuilder;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormServiceService]
    });
    
    service = TestBed.inject(FormServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
    formBuilder = TestBed.inject(FormBuilder);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería enviar el formulario', () => {
    //const formData = { /* Coloca aquí los datos del formulario que deseas enviar */ };
    const formData = formBuilder.group({
      // Coloca aquí los campos de tu formulario y sus valores simulados
      name: 'valor1',
      email: 'valor2@fgfdg',
      phone: '3012321423',
      expWork: 'valor4',
      pInterest: 'valor2'
      // ...
    });
    const mockResponse = {message: 'El formulario se envió con exito.' };

    service.enviarFormulario(formData).subscribe((response) => {
      console.log(response);
      // Verifica que la respuesta del servidor sea igual a la respuesta simulada
      expect(response).toEqual(mockResponse.message); 
    });

    // Verifica que se realice una sola solicitud a la URL del servicio
    const req = httpTestingController.expectOne(apiUrl); 
    // Verifica que la solicitud sea POST
    expect(req.request.method).toBe('POST'); 
    // Verifica que el cuerpo de la solicitud sea igual al objeto formData
    expect(req.request.body).toBe(formData); 

    // Simula la respuesta del servidor para completar la solicitud
    req.flush(mockResponse.message); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
