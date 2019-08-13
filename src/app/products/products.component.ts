import { Component, OnInit } from '@angular/core';
import { GardenService } from '../garden.service';
import { Product } from '../product';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private gardenService: GardenService) { }

  products: Product[];

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.gardenService.getProducts().subscribe((products) => {this.products = products; console.log(this.products)});
  }

  delete(id: number): void {
    this.gardenService.deleteProduct(id).subscribe((response) => {console.log(response);this.ngOnInit()});
  }

}
