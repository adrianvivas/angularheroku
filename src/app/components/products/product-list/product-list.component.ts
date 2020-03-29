import { Component, OnInit } from '@angular/core';

//Services
import { ProductService } from 'src/app/services/product.service';

//Class Product
import { Product } from 'src/app/models/product';
import { element } from 'protractor';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct()
    .snapshotChanges()
    .subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      })
    });
  }

  public onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({},product);
  }

  public onDelete($key: string){
    this.productService.deleteProduct($key);
  }

}
