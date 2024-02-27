import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ArticlesReducers } from './store/articles/reducer';
import { ArticlesEffects } from './store/articles/effects';


export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({'articles': ArticlesReducers}),
    provideEffects([ArticlesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
