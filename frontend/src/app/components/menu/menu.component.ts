import { Component } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'] // Corrección de typo en `styleUrls`
})
export class MenuComponent {
  showMenu = true; 
  showForm = false;
  form: FormGroup; 

  constructor(private managerService: ManagerService, private fb: FormBuilder) {
    this.form = this.fb.group({
      frontendPath: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.getAllSystems();
  }

  getAllSystems(): void {
    this.managerService.getAllSystems().subscribe({
      next: (data) => {
        const systemList = data;
        this.showMenu = systemList.length > 0;
        this.showForm = !this.showMenu;
      },
      error: (err) => {
        console.error('Error al obtener sistemas:', err); 
      },
    });
  }

  addSystems(): void {
    const frontendPath = this.form.get('frontendPath')?.value;

    if (frontendPath) {
      this.managerService.init(frontendPath).subscribe({
        next: () => {
          this.getAllSystems(); 
        },
        error: (err) => {
          console.error('Error al agregar sistemas:', err); 
        },
      });
    } else {
      console.warn('El formulario no es válido o el campo está vacío.'); 
    }
  }
}
