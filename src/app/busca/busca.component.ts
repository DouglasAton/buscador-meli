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
    this.precoMinimo = precoMinimo ? Number(precoMinimo) : undefined;
    this.precoMaximo = precoMaximo ? Number(precoMaximo) : undefined;    

    // Chama o método 'searchProducts' do serviço MeliService e assina a resposta    
    this.meliService.searchProducts(termoPesquisado, this.precoMinimo, this.precoMaximo, condicao).subscribe({
      
      next: (data) => {
        // Verifica se a API retornou resultados
        if (data.results && data.results.length > 0) {
          // Filtra os produtos para atender aos critérios de preço, se ambos forem definidos
          this.produtos = data.results.filter((produto: any) => {
            const price = produto.price;
            const minPriceCondition = this.precoMinimo !== undefined ? price >= this.precoMinimo : true;
            const maxPriceCondition = this.precoMaximo !== undefined ? price <= this.precoMaximo : true;
            return minPriceCondition && maxPriceCondition;
          });

          // Limpa mensagem de erro se houver produtos
          if (this.produtos.length > 0) {
            this.erro = ''; // Limpa a mensagem de erro
          } else {
            this.erro = 'Nenhum produto encontrado para os critérios de preço especificados.'; // Mensagem se o filtro por preço não retornar nada
          }
        } else {
          // Se não houver resultados, exibe uma mensagem
          this.produtos = [];
          this.erro = 'Nenhum produto encontrado, favor mudar os termos de busca.'; // Define mensagem de erro se não houver resultados
        }
      },

      error: (err) => {
        // Em caso de erro na requisição
        this.erro = 'Erro ao buscar produtos. Tente novamente.'; // Define mensagem de erro
        this.produtos = []; // Limpa a lista de produtos
      }
    });
  }
}
