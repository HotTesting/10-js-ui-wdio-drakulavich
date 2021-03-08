/**
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - browser.pause() allowed
 - copy/paste is allowed
 - prefer css selectors
 - don't forget about assertions
 */

  // this test gives you 20 points
  // http://93.126.97.71:10082/index.php?route=account/return/add
  // Notice that datepicker is optional
  describe("Product return", function() {
    it("can be submited", function() {
        browser.url('/index.php?route=account/return/add')
        const content = $('#content')
        expect(content).toBeDisplayed()

        content.$('#input-firstname').setValue('Jon')
        content.$('#input-lastname').setValue('Snow')
        content.$('#input-email').setValue('snow@atnt.com')
        content.$('#input-telephone').setValue('380435452455')
        content.$('#input-order-id').setValue('my-return-id')

        content.$('#input-product').setValue('shiny iphone 12')
        content.$('#input-model').setValue('iphone-12-code-here')

        content.$('input[type="radio"][name="return_reason_id"][value="1"]').click() // Dead On Arrival
        content.$('input[type="submit"]').click()

        expect(content.$('p')).toHaveTextContaining('Thank you for submitting your return request')
    });
  });

  // http://93.126.97.71:10082/index.php?route=account/voucher
  // this test gives you 20 points
  describe("Gift Certificate", function() {
    it("can be purchased", function() {
        browser.url('/index.php?route=account/voucher')
        const content = $('#content')
        expect(content).toBeDisplayed()
        
        content.$('#input-to-name').setValue('Tyrion Stark')
        content.$('#input-to-email').setValue('Tyrion@Stark.com')
        content.$('#input-from-name').setValue('JJ Abrams')
        content.$('#input-from-email').setValue('jj@abra.ms')

        content.$('input[type="radio"][name="voucher_theme_id"][value="7"]').click() // Birthday
        content.$('input[type="checkbox"][name="agree"][value="1"]').click() // I understand that gift certificates are non-refundable.
        content.$('input[type="submit"]').click()

        expect(content.$('p')).toHaveTextContaining('Thank you for purchasing a gift certificate!')
    });
  });   

  // this test gives you 20 points
  // http://93.126.97.71:10082/index.php?route=information/contact
  describe("Contact us form", function() {
    it("must send messages to shop administration", function() {
      browser.url('/index.php?route=information/contact')
      const content = $('#content')
      expect(content).toBeDisplayed()
      
      content.$('#input-name').setValue('Tyrion Stark')
      content.$('#input-email').setValue('Tyrion@Stark.com')
      content.$('#input-enquiry').setValue('Where is my order?')

      content.$('input[type="submit"]').click()

      expect(browser).toHaveUrlContaining('/index.php?route=information/contact/success')
    });
  });

// Each implemented test gives you 20 points 
describe("Items search", function() {
    it("should show results in case multiple items matches", function() {
      browser.url('/index.php?route=common/home')
      const search = $('#search')
      expect(search).toBeDisplayed()

      search.$('input[name="search"]').setValue('mac')
      search.$('button[type="button"]').click()

      const results = $$('#content .product-layout')
      expect(results).toBeElementsArrayOfSize({ gte: 2 })
    });
  
    it("should redirect to 'no matching results' in case no items matched @debug", function() {
      browser.url('/index.php?route=common/home')
      const search = $('#search')
      expect(search).toBeDisplayed()

      search.$('input[name="search"]').setValue('cat')
      search.$('button[type="button"]').click()

      expect($('#content')).toHaveTextContaining('There is no product that matches the search criteria.')
    });
  });
  
