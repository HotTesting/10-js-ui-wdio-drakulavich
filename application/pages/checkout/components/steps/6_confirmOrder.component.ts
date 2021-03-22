export class ConfirmOrderComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-checkout-confirm').parentElement()
    }

    continue() {
        const continueButton = this.root.$('input[type="button"][value="Confirm Order"]')
        expect(continueButton).toBeClickable({ message: 'Expected Confirm Order button to be visible' })
        continueButton.click()
    }
}