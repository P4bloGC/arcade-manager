import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { LogComponent } from './components/log/log.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ScreenRecorderComponent } from './components/screen-recorder/screen-recorder.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: 'log', component: LogComponent },
  { path: 'manager', component: ManagerComponent },
  {path: 'screen-recorder', component: ScreenRecorderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
