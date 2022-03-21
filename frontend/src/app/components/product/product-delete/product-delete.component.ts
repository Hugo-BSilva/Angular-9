import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id!).subscribe((product) => {
      this.product = product;
    })
  }

  deleteProduct(): void{
    this.productService.delete(this.product.id!).subscribe(() => {
      this.router.navigate(['/products']);
      this.productService.showMessage("Produto EXCLUÍDO com sucesso", true);
    })
    
  }

  cancel(): void{
    this.router.navigate(['/products']);
    this.productService.showMessage("Produto não foi deletado");
  }
}
