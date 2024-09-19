import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { HttpClientModule } from '@angular/common/http';
import { DownloaderComponent } from './components/downloader/downloader.component';
import { LogComponent } from './components/log/log.component';
import { ManagerComponent } from './components/manager/manager.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ScreenRecorderComponent } from './components/screen-recorder/screen-recorder.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MonitorComponent,
    DownloaderComponent,
    LogComponent,
    ManagerComponent,
    ScreenRecorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
