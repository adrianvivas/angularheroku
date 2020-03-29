import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduct();
    this.resetForm();
  }

  public onSubmit(productForm: NgForm){
    if(productForm.value.$key == null){
      this.productService.insertProduct(productForm.value)
    }
    else{
      this.productService.updateProduct(productForm.value)
    }
    this.resetForm(productForm);
  }

  public resetForm(productForm?: NgForm){
    if(productForm != null){
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }
}
