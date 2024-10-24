import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})

export class ProdutoComponent implements OnInit {
  produto: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getProdutoDetalhe(id);
  }

  getProdutoDetalhe(id: string | null) {
    this.http.get(`https://api.mercadolibre.com/items/${id}`).subscribe(
      (data) => {
        this.produto = data;
      },
      (error) => {
        console.error('Erro ao buscar os detalhes do produto:', error);
      }
    );
  }
}
