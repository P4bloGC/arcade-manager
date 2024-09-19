import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ScreenRecorderService } from '../../services/screen-recorder.service';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrl: './screen-recorder.component.css'
})
export class ScreenRecorderComponent {
  fps: string = "30";
  showLog: boolean = false;
  isLoading: boolean = false;
  captureList: any = null;
  captureSrc: string = '';

  @ViewChild('logModal') logModal!: ElementRef;


  constructor(private screenRecorderService: ScreenRecorderService, private managerService: ManagerService, private renderer: Renderer2){}

  ngOnInit(){
    this.getCaptureList();
  }

  startRecording(){
    this.showLog = true;
    this.isLoading = true;
    this.openModal();
    this.screenRecorderService.startRecording(this.fps).subscribe();
  }

  stopRecording(){
    this.screenRecorderService.stopRecording().subscribe();
    this.isLoading = false;
  }

  setFpsvalue(value: string){
    this.fps = value;
  }

  getCaptureList(){
    this.screenRecorderService.getCaptureList().subscribe(data => {
      this.captureList = data;
    })
  }

  serveCapture(path: string){
    this.managerService.viewMultimedia(path).subscribe(
      (response: Blob) => {
        const url = URL.createObjectURL(response);
          this.captureSrc = url;    
      },
      (error) => {
        console.error('Error al enviar solicitud de descarga:', error);
      }
    );
  }

  deleteCapture(path: string){
    this.managerService.deleteFile(path).subscribe(data =>{
      this.getCaptureList();
    })
  }

  openModal() {
    this.renderer.addClass(this.logModal.nativeElement, 'show');
    this.renderer.setStyle(this.logModal.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.logModal.nativeElement, 'backgroundColor', 'rgba(0,0,0,0.5)');
  }

  closeModal() {
    this.showLog = false;
    this.renderer.removeClass(this.logModal.nativeElement, 'show');
    this.renderer.setStyle(this.logModal.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.logModal.nativeElement, 'backgroundColor', 'transparent');
  }
  

}
