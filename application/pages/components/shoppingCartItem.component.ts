export class ShoppingCartItemComponent {
    constructor(private root: WebdriverIO.Element) {

    }

    removeFromCart() {
        const removeFromCartButton = this.root.$('button[data-original-title="Remove"]')
        expect(removeFromCartButton).toBeVisible({ message: 'Expected remove from cart button to be visible' })
        removeFromCartButton.click()
    }
}