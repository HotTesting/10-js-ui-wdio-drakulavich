// - Переписать существующие тесты чтобы они использовали PageObject и PageComponent паттерны. Опционально - использовать Application
// - Написать тест на покупку зарегистрированным пользователем, и гостем
// - Тест на покупку где биллинг адрес и деливери адрес разные
// - Переписать использование browser.pause(...) на expect или waitUntil

import { App } from '../../application/application';

const app = new App()

describe('Items', function () {
    // You must be logged in to use wishlist
    describe('for logged in user', function() {
        beforeEach(function () {
          app.home.topLinks.openLogin();
          app.login.loginWithCreds("jon@snow.com", "jon-snow-pass");
        });

        it('can be added to wishlist', function () {
            app.home.openAllForCategory("MP3 Players");

            const iPodNano = app.productCategory.products.find(
              (product) => product.title() === "iPod Nano"
            );
            expect(iPodNano).toBeDefined();

            iPodNano.addToWishList();

            app.productCategory.checkSuccesAlertText("your wish list");
        })

         
        it('can be selected for comparison', function () {
            app.home.openAllForCategory("MP3 Players");

            const iPodNano = app.productCategory.products.find(
              (product) => product.title() === "iPod Nano"
            );
            expect(iPodNano).toBeDefined();

            iPodNano.compareThisProduct();

            app.productCategory.checkSuccesAlertText("your product comparison");
        })

        it('can be added to cart', function () {
          // remove all items from the cart first
          app.home.topLinks.openShoppingCart();
          app.shoppingCart.removeItemsFromShoppingCart();

          app.home.openAllForCategory("MP3 Players");
          const iPodShuffle = app.productCategory.products.find(
            (product) => product.title() === "iPod Shuffle"
          );
          expect(iPodShuffle).toBeDefined();

          iPodShuffle.addToCart();

          app.productCategory.checkSuccesAlertText("your shopping cart");

          app.shoppingCart.checkItemAddedToShoppingCart(iPodShuffle.title());
        })

        it('can be purchased with different delivery address', function () {
          // remove all items from the cart first
          app.home.topLinks.openShoppingCart();
          app.shoppingCart.removeItemsFromShoppingCart();

          app.home.openAllForCategory("MP3 Players");

          const iPodClassic = app.productCategory.products.find(
            (product) => product.title() === "iPod Classic"
          );
          expect(iPodClassic).toBeDefined();
    
          iPodClassic.addToCart();

          app.productCategory.topLinks.openCheckout();

          app.checkout.billingDetails.continue();

          app.checkout.deliveryDetails.selectNewShipping();
          app.checkout.deliveryDetails.fillShippingDetails({
            firstName: "Jon",
            lastName: "Second Buyer",
            address1: "new address field",
            city: "new city field",
            postCode: "435645",
            country: "Belarus",
            region: "Horad Minsk",
          });
          app.checkout.deliveryDetails.continue();

          app.checkout.deliveryMethod.continue();
    
          app.checkout.paymentMethod.acceptTermsAndConditions();
          app.checkout.paymentMethod.continue();
    
          app.checkout.confirmOrder.continue();
    
          browser.waitUntil(() => app.confirmation.isOpened(), {
            timeoutMsg: "Expected confirmation page to be loaded",
          });

        })
    })
 
    it('can be selected for comparison by guest', function () {
        app.home.openAllForCategory("MP3 Players");

        const iPodNano = app.productCategory.products.find(
          (product) => product.title() === "iPod Nano"
        );
        expect(iPodNano).toBeDefined();

        iPodNano.compareThisProduct();

        app.productCategory.checkSuccesAlertText("your product comparison");
    })
 
    it('can be added to cart by guest', function () {
        app.home.openAllForCategory("MP3 Players");
        
        const iPodTouch = app.productCategory.products.find(
          (product) => product.title() === "iPod Touch"
        );
        expect(iPodTouch).toBeDefined();

        iPodTouch.addToCart();

        app.productCategory.checkSuccesAlertText("your shopping cart");

        app.shoppingCart.checkItemAddedToShoppingCart(iPodTouch.title());
    })

    it("can be purchased by guest", function () {
      app.home.openAllForCategory("MP3 Players");

      const iPodClassic = app.productCategory.products.find(
        (product) => product.title() === "iPod Classic"
      );
      expect(iPodClassic).toBeDefined();

      iPodClassic.addToCart();

      app.productCategory.topLinks.openCheckout();

      app.checkout.checkoutOptions.selectGuestCheckout();
      app.checkout.checkoutOptions.continue();

      app.checkout.billingDetails.fillBillingDetails({
        firstName: "Jon",
        lastName: "Unregistered",
        email: `test+${Date.now()}@test.com`,
        telephone: "37534534895",
        address1: "address field",
        city: "city field",
        postCode: "123123",
        country: "Belarus",
        region: "Horad Minsk",
      });
      app.checkout.billingDetails.continue();

      app.checkout.deliveryMethod.continue();

      app.checkout.paymentMethod.acceptTermsAndConditions();
      app.checkout.paymentMethod.continue();

      app.checkout.confirmOrder.continue();

      browser.waitUntil(() => app.confirmation.isOpened(), {
        timeoutMsg: "Expected confirmation page to be loaded",
      });
    });
 })