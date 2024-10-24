// Importa os módulos necessários do Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MeliService } from '../services/meli.service'; // Importa o serviço para interagir com a API
import { Router } from '@angular/router'; // Importa o Router para navegação

// Define o componente 'app-busca'
@Component({
  selector: 'app-busca', // Seletor para usar o componente no HTML
  standalone: true, // Define que este componente é independente
  imports: [CommonModule, HttpClientModule], // Importa módulos comuns e o módulo HTTP
  templateUrl: './busca.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./busca.component.scss'] // Caminho para os estilos SCSS do componente
})
export class BuscaComponent {
  // Declaração de variáveis
  produtos: any[] = []; // Array para armazenar os produtos buscados
  erro: string = ''; // Mensagem de erro, se houver
  precoMinimo: number | undefined; // Variável para armazenar o preço mínimo (se necessário)
  precoMaximo: number | undefined; // Variável para armazenar o preço máximo (se necessário)

  // Construtor do componente que injeta o serviço MeliService e o Router
  constructor(private meliService: MeliService, private router: Router) { }

  abrirProduto(id: string): void {
    this.router.navigate(['/produto', id]); // Redireciona para a rota do produto
  }

  // Função para alternar a exibição dos detalhes do produto
  toggleDetails(produto: any) {
    // Alterna a propriedade 'expanded' do produto
    produto.expanded = !produto.expanded;

    // Se o produto está sendo expandido e não possui descrição, busca os detalhes
    if (produto.expanded && !produto.description) {
      this.meliService.getProdutoDetalhe(produto.id).subscribe((detalhes) => {
        produto.description = detalhes.description; // Supondo que a API retorne 'description'
      });
    }
  }

  // Função que captura os valores dos inputs e faz a busca
  buscarProdutos(termoPesquisado: string, precoMinimo?: string, precoMaximo?: string, condicao?: string): void {
    // Converte os preços mínimos e máximos de string para número, se fornecidos
    this.precoMinimo = precoMinimo ? Number(precoMinimo) : undefined; // Define o preço mínimo
    this.precoMaximo = precoMaximo ? Number(precoMaximo) : undefined; // Define o preço máximo

    // Chama o método 'searchProducts' do serviço MeliService e assina a resposta
    this.meliService.searchProducts(termoPesquisado, this.precoMinimo, this.precoMaximo, condicao).subscribe({
      // Se a busca for bem-sucedida, armazena os resultados e limpa a mensagem de erro
      next: (data) => {
        // Filtra os produtos para atender aos critérios de preço, se ambos forem definidos
        this.produtos = data.results.filter((produto: any) => {
          const price = produto.price;
          const minPriceCondition = this.precoMinimo !== undefined ? price >= this.precoMinimo : true; // Verifica se o preço é maior ou igual ao mínimo
          const maxPriceCondition = this.precoMaximo !== undefined ? price <= this.precoMaximo : true; // Verifica se o preço é menor ou igual ao máximo
          return minPriceCondition && maxPriceCondition; // Retorna true se atender aos critérios de preço
        });
        this.erro = ''; // Limpa mensagens de erro
      },
      // Se ocorrer um erro durante a busca, exibe a mensagem de erro e limpa a lista de produtos
      error: (err) => {
        this.erro = 'Erro ao buscar produtos. Tente novamente.'; // Define mensagem de erro
        this.produtos = []; // Limpa a lista de produtos
      }
    });
  }
}
