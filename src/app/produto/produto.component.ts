import { HttpClient } from '@angular/common/http'; // Importa o módulo HttpClient para realizar requisições HTTP
import { Component, OnInit } from '@angular/core'; // Importa os decorators para definir um componente e o ciclo de vida
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute para acessar parâmetros da rota

@Component({
  selector: 'app-produto', // Define o seletor do componente
  standalone: true, // Indica que o componente é independente
  imports: [], // Especifica módulos que este componente irá importar (atualmente vazio)
  templateUrl: './produto.component.html', // Caminho para o template HTML do componente
  styleUrl: './produto.component.scss' // Caminho para os estilos SCSS do componente
})
export class ProdutoComponent implements OnInit { // Classe do componente que implementa OnInit
  produto: any; // Variável para armazenar os detalhes do produto

  constructor(private route: ActivatedRoute, private http: HttpClient) { } // Injeta ActivatedRoute e HttpClient

  ngOnInit(): void { // Método do ciclo de vida que é chamado após a inicialização do componente
    const id = this.route.snapshot.paramMap.get('id'); // Obtém o ID do produto a partir dos parâmetros da rota
    this.getProdutoDetalhe(id); // Chama a função para buscar os detalhes do produto
  }

  // Função para buscar os detalhes do produto usando o ID
  getProdutoDetalhe(id: string | null) {
    this.http.get(`https://api.mercadolibre.com/items/${id}`).subscribe( // Realiza a requisição GET para a API
      (data) => {
        this.produto = data; // Armazena os dados do produto retornados pela API
      },
      (error) => {
        console.error('Erro ao buscar os detalhes do produto:', error); // Registra o erro no console, caso ocorra
      }
    );
  }
}
