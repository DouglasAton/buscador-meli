import { ApplicationConfig } from '@angular/core'; // Importa o tipo ApplicationConfig do Angular
import { provideRouter } from '@angular/router'; // Importa a função para fornecer a configuração de roteamento

import { routes } from './app.routes'; // Importa as rotas definidas no arquivo app.routes
import { provideClientHydration } from '@angular/platform-browser'; // Importa a função para hidratação do cliente
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importa funções para fornecer o cliente HTTP

// Configuração da aplicação Angular
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Fornece as rotas para a aplicação
    provideClientHydration(), // Hidrata o cliente, útil para melhorar a performance
    provideHttpClient(withFetch()) // Fornece o cliente HTTP configurado para utilizar a API Fetch
  ]
};

