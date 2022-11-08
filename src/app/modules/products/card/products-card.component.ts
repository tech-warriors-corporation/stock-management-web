import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-products-card',
    template: `
        <div class="products-card">
            <h4 class="products-card__product-name">{{ productName }}</h4>
            <h5 class="products-card__category-name">{{ categoryName }}</h5>
            <p class="products-card__unit-price" *ngIf="unitPrice">{{ unitPrice | formatToBrl }}</p>
        </div>
    `,
    styleUrls: ['./products-card.component.scss']
})
export class ProductsCardComponent{
    @Input() productName!: string
    @Input() categoryName!: string
    @Input() unitPrice!: number | null
}
