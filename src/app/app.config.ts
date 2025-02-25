import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';

// Import routes and interceptors
import { routes } from './app.routes';
import { headerInterceptor } from './core/interceptor/header.interceptor';
import { loadInterceptor } from './core/interceptor/loading/load.interceptor';

// Create HttpLoader for translations
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Configure translation module
const translateModuleConfig = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient]
  }
};

// Configure HTTP client
const httpClientConfig = withInterceptors([
  headerInterceptor,
  loadInterceptor
]);

export const appConfig: ApplicationConfig = {
  providers: [
    // Router configuration
    provideRouter(routes),
    
    // HTTP configuration
    provideHttpClient(
      withFetch(),
      httpClientConfig
    ),
    provideRouter(routes, withHashLocation()),
    
    // Browser and animations
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    
    // Third-party modules
    provideToastr(),
    importProvidersFrom(
      NgxSpinnerModule,
      TranslateModule.forRoot(translateModuleConfig)
    )
  ]
};