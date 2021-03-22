export class DeliveryMethodComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-shipping-method').parentElement()
    }

    continue() {
        const continueButton = this.root.$('input[type="button"][value="Continue"]')
        expect(continueButton).toBeClickable({ message: 'Expected Continue button to be visible' })
        continueButton.click()
    }
}