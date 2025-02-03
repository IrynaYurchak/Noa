// import {ApplicationConfig, importProvidersFrom} from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideStorage, getStorage } from '@angular/fire/storage';
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {SharedModule} from "./shared/shared.module";
// import { ToastrModule } from 'ngx-toastr';
//
// export const appConfig: ApplicationConfig = {
//   providers:
//     [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
//     importProvidersFrom(BrowserAnimationsModule),
//     importProvidersFrom(
//       BrowserAnimationsModule,
//
//       ToastrModule.forRoot({})
//     ),
//     SharedModule,
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore()),
//     provideStorage(() => getStorage()),
//
//     provideAnimationsAsync(),
//   ]
//
// };
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    // Маршрутизація
    provideRouter(routes),

    // SSR (опціонально)
    provideClientHydration(),

    // Анімації
    provideAnimations(),

    // Firebase
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

    // Модулі
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ),
  ],
};
