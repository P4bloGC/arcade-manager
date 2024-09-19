import { Component } from '@angular/core';
import { MonitorService } from '../../services/monitor.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent {
  systemInfo: any;

  constructor(private monitorService: MonitorService) { }

  ngOnInit() {
    this.getSystemInfo();
  }

  getSystemInfo() {
    this.monitorService.getSystemInfo().subscribe(data => {
      this.systemInfo = data;
      console.log(this.systemInfo);
    });
  }

}
