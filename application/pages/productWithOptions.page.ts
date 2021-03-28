import { TopLinks } from "./components/toplinks.component"

export class ProductWithOptionsPage {
    topLinks: TopLinks = new TopLinks()

    private get root(): WebdriverIO.Element {
        return $('#product')
    }

    open(url: string) {
        browser.url(url)
        expect(this.root).toBeDisplayed()
    }

    selectDropdownText(text: string) {
        expect(this.root).toBeDisplayed()
        this.root.$('.required select').selectByVisibleText(text)
    }

    selectDate(mydate: Date) {
        expect(this.root).toBeDisplayed()
 
        const dateString = mydate.toISOString().split('T')[0]
        this.root.$('div .date input[type="text"]').setValue(dateString)
    }

    addToCart() {
        const addToCartButton = this.root.$('button#button-cart')
        expect(addToCartButton).toBeVisible({ message: 'Expected add to cart button to be visible' })
        addToCartButton.click()
    }

    checkSuccesAlertText(expected: string) {
        const alert = $('.alert-success')
        expect(alert).toHaveTextContaining(expected)
    }
}