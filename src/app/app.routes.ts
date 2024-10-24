import { RouterModule, Routes } from '@angular/router';
import { BuscaComponent } from './busca/busca.component';
import { ProdutoComponent } from './produto/produto.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', component: BuscaComponent },
    { path: 'produto/:id', component: ProdutoComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }