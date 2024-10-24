// Importa os módulos necessários do Angular
import { Injectable } from '@angular/core'; // Decorador para tornar a classe um serviço injetável
import { HttpClient } from '@angular/common/http'; // Importa o HttpClient para fazer requisições HTTP
import { Observable } from 'rxjs'; // Importa Observable para manipulação de dados assíncronos

// O decorador Injectable permite que este serviço seja injetado em outros componentes ou serviços
@Injectable({
  providedIn: 'root' // Faz com que o serviço esteja disponível em toda a aplicação
})
export class MeliService {
  // URL base da API do Mercado Livre para buscar produtos
  private apiUrl = 'https://api.mercadolibre.com/sites/MLB/search';
  private detailUrl = 'https://api.mercadolibre.com/items'; // URL base para buscar detalhes de um produto

  // Construtor do serviço, onde o HttpClient é injetado
  constructor(private http: HttpClient) { }

  // Método para buscar produtos com base em vários critérios
  searchProducts(term: string, minPrice?: number, maxPrice?: number, condition?: string): Observable<any> {
    // Cria um array para armazenar os parâmetros da query
    let params: string[] = [];
    // Adiciona o termo de busca ao array de parâmetros
    params.push(`q=${term}`);

    // Se o preço mínimo estiver definido, adiciona ao array de parâmetros
    if (minPrice !== undefined) {
      params.push(`price_min=${minPrice}`);
    }

    // Se o preço máximo estiver definido, adiciona ao array de parâmetros
    if (maxPrice !== undefined) {
      params.push(`price_max=${maxPrice}`);
    }

    // Se a condição do produto estiver definida, adiciona ao array de parâmetros
    if (condition) {
      params.push(`condition=${condition}`);
    }

    // Combina todos os parâmetros em uma string de query separada por '&'
    const query = params.join('&');

    // Realiza a requisição GET à API com os parâmetros da query e retorna um Observable
    return this.http.get(`${this.apiUrl}?${query}`);
  }

  // Método para buscar detalhes de um produto pelo ID
  getProdutoDetalhe(id: string): Observable<any> {
    // Realiza a requisição GET à API com o ID do produto e retorna um Observable
    return this.http.get(`${this.detailUrl}/${id}`);
  }
}
