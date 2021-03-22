import { ShoppingCartItemComponent } from "./components/shoppingCartItem.component"


export class ShoppingCartPage {
    open(url: string) {
        browser.url(url)
        expect($('#content')).toBeDisplayed()
    }

    get items(): ShoppingCartItemComponent[] {
        return $$('#content form tbody tr').map(elem => {
            return new ShoppingCartItemComponent(elem)
        })
    }

    removeItemsFromShoppingCart() {
        this.items.forEach(item => item.removeFromCart())
        expect($('#content p')).toHaveText('Your shopping cart is empty!')
    }

    checkItemAddedToShoppingCart(title: string) {
        const cart = $("#cart-total i.fa-shopping-cart");
        expect(cart).toBeVisibleInViewport();
        cart.click();

        const cartDropdown = $("#cart .dropdown-menu");
        expect(cartDropdown).toHaveTextContaining(title);
    }
}