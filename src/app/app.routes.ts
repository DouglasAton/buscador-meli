import { RouterModule, Routes } from '@angular/router'; // Importa os módulos necessários para roteamento
import { BuscaComponent } from './busca/busca.component'; // Importa o componente de busca
import { ProdutoComponent } from './produto/produto.component'; // Importa o componente de produto
import { NgModule } from '@angular/core'; // Importa o decorador NgModule do Angular

// Define as rotas da aplicação
export const routes: Routes = [
    { path: '', component: BuscaComponent }, // Rota padrão que carrega o componente de busca
    { path: 'produto/:id', component: ProdutoComponent }, // Rota para visualizar detalhes de um produto, usando um ID dinâmico
];

// Configura o módulo de roteamento
@NgModule({
    imports: [RouterModule.forRoot(routes)], // Importa as rotas definidas
    exports: [RouterModule] // Exporta o RouterModule para que possa ser utilizado em toda a aplicação
})
export class AppRoutingModule { }
