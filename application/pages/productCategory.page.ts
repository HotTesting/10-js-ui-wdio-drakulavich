import { ProductCardComponent } from "./components/productCard.component"
import { TopLinks } from "./components/toplinks.component"

export class ProductCategoryPage {
    topLinks: TopLinks = new TopLinks()

    open(url: string) {
        browser.url(url)
        expect($('#content')).toBeDisplayed()
    }

    get products(): ProductCardComponent[] {
        expect($('#content')).toBeDisplayed()
        
        return $$('div.product-layout').map(elem => {
            return new ProductCardComponent(elem)
        })
    }

    checkSuccesAlertText(expected: string) {
        const alert = $('.alert-success')
        expect(alert).toHaveTextContaining(expected)
    }

}