import { Component, EnvironmentInjector } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit {
  [x: string]: any;
  products: Product[] = []
  categories: string[] = [];
  loading: boolean = false;
  cartproducts: any[] = [];
  base64: any = '';
  form!: FormGroup

  constructor(private service: ProductsService, private build: FormBuilder) { }

  //calling
  ngOnInit(): void {
    this.getproducts()
    this.getCategories()
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }
  getproducts() {
    this.loading = true
    this.service.getAllproducts().subscribe((res: any) => {
      this.products = res
      this.loading = false
    }, error => {
      this.loading = false
      alert(error)
    })
  }

  getCategories() {
    this.loading = true
    this.service.getALlCategories().subscribe((res: any) => {
      this.categories = res
      this.loading = false
    }, error => {
      this.loading = false
      alert(error)
    })
  }


  filterCategory(event: any) {
    let value = event.target.value;
    (value == "all") ? this.getproducts() : this.getproductsCategory(value)

  }
  getproductsCategory(keyword: string) {
    this.loading = true
    this.service.getproductsByCategory(keyword).subscribe((res: any) => {
      this.products = res
      this.loading = false
    }
    )
  }
  addTocart(event: any) {
    // to send data : JSON.stringify()
    // to recieve data : JSON.parse()
    if ("cart" in localStorage) {
      this.cartproducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartproducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert(" this product is already in your cart")
      } else {
        this.cartproducts.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartproducts))
      }
      this.cartproducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartproducts))
    }
    else {
      this.cartproducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartproducts))
    }
  }
  getSelectedCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value)
    console.log(this.form)
  }
  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64)
    };
  }
  addProduct() {
    const model = this.form.value
    this.service.createProduct(model).subscribe(res => {
      alert("Add Product Successfully")
    })
  }
  update(item:any) {
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category
    })
    this.base64 = item.image
  }
}