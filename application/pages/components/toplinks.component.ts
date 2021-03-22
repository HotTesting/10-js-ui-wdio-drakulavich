export class TopLinks {
    private get root(): WebdriverIO.Element {
        return $('nav#top')
    }

    openCheckout() {
        this.root.$('a[title="Checkout"]').click()
    }

    private openUserDropdown() {
        const topDropdown = this.root.$("#top-links i.fa.fa-user");
        expect(topDropdown).toBeDisplayed();
        topDropdown.click();
    }

    openLogin() {
        this.openUserDropdown()

        const loginLink = this.root.$("#top-links").$("=Login");
        expect(loginLink).toBeDisplayed();
        loginLink.click();
    }

    openShoppingCart() {
        const shoppingCart = this.root.$("#top-links i.fa-shopping-cart");
        expect(shoppingCart).toBeDisplayed();
        shoppingCart.click();

        const contentTitle = $("#content h1");
        expect(contentTitle).toHaveTextContaining("Shopping Cart");
    }
    
}