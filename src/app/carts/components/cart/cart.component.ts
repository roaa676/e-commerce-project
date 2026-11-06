import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  total?: string | number;
  constructor(private service: CartsService, private build: FormBuilder, private ProductsService: ProductsService) { }
  item: any[] = [];
  carts: any[] = [];
  products: any[] = [];
  form!: FormGroup
  details: any;
  data: any
  ngOnInit(): void {
    this.form = this.build.group({
      start: [''],
      end: ['']
    })
    this.getAllCarts()
  }


  getAllCarts() {
    this.service.getAllCarts().subscribe((res: any) => {
      this.carts = res
    })
  }
  applyfilter() {
    let params = this.form.value
    this.service.getAllCarts(params).subscribe((res: any) => {
      this.carts = res
    })
  }
  deleteCart(id: number) {
    this.service.deleteCart(id).subscribe(res => {
      this.getAllCarts()
      alert("cart deleted successfully")
    })
  }

  view(index: number) {
    this.products = []
    this.details = this.carts[index];
    for (let x in this.details.products) {
      this.ProductsService.getProductById(this.details.products[x].productId).subscribe(res => {
        this.products.push({ item: res, quantity: this.details.products[x].quantity })
      })
    }
    console.log(this.details)
  }
}
