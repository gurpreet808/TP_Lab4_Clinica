import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimeNGModule } from './modulos/prime-ng/prime-ng.module';
import { ConfirmationService, MessageService } from 'primeng/api';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    SpinnerComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(
      () => initializeApp(
        {
          apiKey: "AIzaSyBQFBqcKAi0T_n31pMmSp23FlWYaDZw2go",
          authDomain: "tpfinal-lab4-singh.firebaseapp.com",
          projectId: "tpfinal-lab4-singh",
          storageBucket: "tpfinal-lab4-singh.appspot.com",
          messagingSenderId: "292522545303",
          appId: "1:292522545303:web:dcb73dad82c9529270d9d2",
          measurementId: "G-XPQBDSJLYK"
        }
      )
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    PrimeNGModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
