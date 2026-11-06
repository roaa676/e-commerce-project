import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  push(res: Object) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  
   getAllproducts() {
    return this.http.get('https://fakestoreapi.com/products')
  }
  getALlCategories() {
    return this.http.get('https://fakestoreapi.com/products/categories')
  }
  getproductsByCategory(keyword: string) {
    return this.http.get('https://fakestoreapi.com/products/category/' + keyword)
  }
  getProductById(id : any) {
    return this.http.get('https://fakestoreapi.com/products/' + id)
  }  
  createProduct(model:any) {
    return this.http.post('https://fakestoreapi.com/products' , model)
  }
}

 