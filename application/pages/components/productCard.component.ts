export class ProductCardComponent {
    constructor(private root: WebdriverIO.Element) {

    }

    title(): string {
        return this.root.$('h4').getText();
    }

    addToCart() {
        const addToCartButton = this.root.$('button[onclick*="cart.add"] i.fa-shopping-cart')
        expect(addToCartButton).toBeVisible({ message: 'Expected add to cart button to be visible' })
        addToCartButton.click()
    }

    addToWishList() {
        const addToWishListButton = this.root.$('.fa-heart')
        expect(addToWishListButton).toBeVisible({ message: 'Expected add wishlist button to be visible' })
        
        addToWishListButton.click()
    }

    compareThisProduct() {
        const addToComparisonButton = this.root.$('.fa-exchange')
        expect(addToComparisonButton).toBeVisible({ message: 'Expected add to comparison button to be visible' })
        
        addToComparisonButton.click()
    }
}