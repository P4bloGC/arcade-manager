import { Component, ComponentFactoryResolver, ViewContainerRef, ElementRef, ViewChild, Renderer2 } from '@angular/core'; import { FormBuilder } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LogComponent } from '../log/log.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

  systemList: any = [];
  gameList: any = null;
  files: File[] = [];

  idSystem: number = 0;
  
  imageSrc: string | ArrayBuffer | null = null;
  videoSrc: string | ArrayBuffer | null = null;
  
  romSelected: string = '';
  gameDesc: string = '';
  typeUpload: string = '';
  
  viewVisor: boolean = false;
  showLog: boolean = false;
 
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileUploadModal') fileUploadModal!: ElementRef;

  systemListForm = this.fb.group({
    'systems': [[]],
  });

  constructor(private managerService: ManagerService, private fb: FormBuilder, private resolver: ComponentFactoryResolver, private vcr: ViewContainerRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.getAllSystems();
  }

  getAllSystems() {
    this.managerService.getAllSystems().subscribe(data => {
      this.systemList = data;
      console.log(this.systemList);
    });
  }

  getSystemGameList(idSystem: string) {
    this.idSystem = Number(idSystem);
    this.managerService.getSystemGameList(this.idSystem).subscribe(data => {
      if(data == ''){
        this.gameList = null;
      }else{
        this.gameList = data;
      }
      console.log(this.gameList);
    });
  }

  getGameMultimedia(videoPath: string, logoPath: string, romName: string, desc: string) {
    this.viewVisor = true;
    this.imageSrc = null;
    this.videoSrc = null;
    this.romSelected = romName;
    this.gameDesc = desc;
    this.fileView(logoPath, 'image');
    this.fileView(videoPath, 'video');
  }

  fileView(path: string, type: string) {
    this.managerService.viewMultimedia(path).subscribe(
      (response: Blob) => {
        const url = URL.createObjectURL(response);
        if (type == 'image') {
          this.imageSrc = url;
        }
        if (type == 'video') {
          this.videoSrc = url;
        }
      },
      (error) => {
        console.error('Error al enviar solicitud de descarga:', error);
      }
    );
  }

  showDownloadOptions() {
    Swal.fire({
      title: 'Seleccione las opciones de descarga',
      html: `
        <input type="checkbox" id="roms" name="downloadOption" value="roms">
        <label for="roms">ROMs</label><br>
        <input type="checkbox" id="videos" name="downloadOption" value="videos">
        <label for="videos">Videos</label><br>
        <input type="checkbox" id="logos" name="downloadOption" value="logos">
        <label for="logos">Logos</label><br>
        <input type="checkbox" id="emulators" name="downloadOption" value="emulators">
        <label for="emulators">Emulador</label><br>
      `,
      showCancelButton: true,
      focusConfirm: false,
      inputValidator: (value) => {
        const checkboxes = document.querySelectorAll('input[name="downloadOption"]:checked');
        if (checkboxes.length === 0) {
          return 'Debes seleccionar al menos una opción';
        }
        return null;
      },
      preConfirm: () => {
        const selectedOptions: string[] = [];
        const checkboxes = document.querySelectorAll('input[name="downloadOption"]:checked') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
          selectedOptions.push(checkbox.value);
        });
        return selectedOptions;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.downloadMultimedia(result.value);
      }
    });
  }

  downloadMultimedia(multimediaTypes: any) {
    this.showLogComponent();
    this.managerService.downloadMultimedia(this.idSystem, multimediaTypes)
      .subscribe(
        (response) => {
          Swal.close();
          console.log('Solicitud de descarga enviada correctamente:', response);
        },
        (error) => {
          console.error('Error al enviar solicitud de descarga:', error);
        }
      );
  }

  deleteGame(videoPath: string, logoPath: string, romPath: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFile(videoPath);
        this.deleteFile(logoPath);
        this.deleteFile(romPath);
        this.getSystemGameList(this.idSystem.toString());
        this.viewVisor = false;
      }
    });
  }

  deleteFile(filePath: string){
    this.managerService.deleteFile(filePath).subscribe(
      (response) =>{
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'El juego se ha eliminado correctamente.',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al eliminar el juego.',
        });
      }
    );
  }

  showLogComponent() {
    Swal.fire({
      title: 'Procesando Archivos...',
      html: '<div id="dynamic-container"></div><div class="spinner"></div>',
      showCloseButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        const factory = this.resolver.resolveComponentFactory(LogComponent);
        const container = document.getElementById('dynamic-container');
        const vcr = this.vcr.createComponent(factory);

        if (container && vcr.location.nativeElement) {
          container.appendChild(vcr.location.nativeElement);
        }
      }
    });
  }

  onFileChanged(event: any, type: string) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('idSystem', this.idSystem.toString());
      formData.append('romName', this.romSelected);
      formData.append('type', type);
  
      this.managerService.uploadFile(formData).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Archivo subido exitosamente',
            text: 'El archivo se ha subido correctamente.',
          });
          this.getSystemGameList(this.idSystem.toString());
          this.viewVisor = false;
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al subir el archivo',
            text: error.message || 'Ocurrió un error inesperado.',
          });
        }
      );
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
    (event.target as HTMLElement).classList.add('dragover');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('dragover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    (event.target as HTMLElement).classList.remove('dragover');

    if (event.dataTransfer?.files.length) {
      this.files = Array.from(event.dataTransfer.files);
      this.uploadFiles(this.files);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      this.files = Array.from(event.target.files);
      this.uploadFiles(this.files);
    }
  }

  uploadFiles(files: File[]) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file, file.name);
    });
    formData.append('idSystem', this.idSystem.toString()); 
    formData.append('romName', ''); // Ajusta esto según tu lógica
    formData.append('type', this.typeUpload);

    this.managerService.uploadMultipleFiles(formData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Archivos subidos exitosamente',
          text: 'Los archivos se han subido correctamente.',
        });
        this.resetFileInput();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al subir los archivos',
          text: error.message || 'Ocurrió un error inesperado.',
        });
      }
    );
  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  openModal() {
    this.typeUpload = '';
    this.resetFileInput()
    this.renderer.addClass(this.fileUploadModal.nativeElement, 'show');
    this.renderer.setStyle(this.fileUploadModal.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.fileUploadModal.nativeElement, 'backgroundColor', 'rgba(0,0,0,0.5)');
  }

  resetFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
      this.files = [];
    }
  }

  closeModal() {
    this.renderer.removeClass(this.fileUploadModal.nativeElement, 'show');
    this.renderer.setStyle(this.fileUploadModal.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.fileUploadModal.nativeElement, 'backgroundColor', 'transparent');
  }

  setTypeUpload(type: string){
    this.typeUpload = type;
  }

 
  
  


}
