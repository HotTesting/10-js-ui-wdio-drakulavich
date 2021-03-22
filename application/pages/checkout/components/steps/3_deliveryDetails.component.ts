export class DeliveryDetailsComponent {
    private get root(): WebdriverIO.Element {
        return $('div#collapse-shipping-address').parentElement()
    }

    fillShippingDetails(data: {
        firstName: string,
        lastName: string,
        address1: string,
        city: string,
        postCode: string,
        country: string,
        region: string
    }) {
        console.log('[ShippingDetailsComponent] Filling shipping details step', JSON.stringify(data, null, 2))

        expect(this.root.$('#input-shipping-firstname')).toBeVisible()
        this.root.$('#input-shipping-firstname').setValue(data.firstName)
        this.root.$('#input-shipping-lastname').setValue(data.lastName)
        this.root.$('#input-shipping-address-1').setValue(data.address1)
        this.root.$('#input-shipping-city').setValue(data.city)
        this.root.$('#input-shipping-postcode').setValue(data.postCode)
        this.root.$('#input-shipping-country').selectByVisibleText(data.country)

        browser.waitUntil(
          () => {
            try {
              this.root.$('#input-shipping-zone').selectByVisibleText(data.region)
              return true;
            } catch {
              return false;
            }
          },
          {
            timeout: 3000,
            timeoutMsg: "Expected to selected the city after 3s",
          }
        );
    }

    continue() {
        const continueButton = this.root.$('input[type="button"][value="Continue"]')
        expect(continueButton).toBeClickable({ message: 'Expected Continue button to be visible' })
        continueButton.click()
    }

    selectNewShipping() {
        const newShippingAddres = this.root.$('input[type="radio"][value="new"]')
        expect(newShippingAddres).toBeClickable({ message: 'Expected New Shipping radio button to be visible' })
        newShippingAddres.click()
    }
}