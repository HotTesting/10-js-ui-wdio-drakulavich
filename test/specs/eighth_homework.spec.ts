// - Оптимизировать тесты которые включают проверки с зарегистрированными пользователями.
// // Используя .execute() с заполнением формы
// - Написать тесты на
// - Добавление нескольких товаров в корзину
// - Покупку товара с выбором опций - http://93.126.97.71:10082/camera/canon-eos-5d

import { App } from '../../application/application';

const app = new App()

describe("Items", function () {
  describe("for logged in user", function () {
    beforeEach(function () {
      app.home.topLinks.openLogin();
      app.login.loginWithCreds("jon@snow.com", "jon-snow-pass");
    });

    it("can be purchased with two players", function () {
      // remove all items from the cart first
      app.home.topLinks.openShoppingCart();
      app.shoppingCart.removeItemsFromShoppingCart();

      app.home.openAllForCategory("MP3 Players");

      const itemsToBuy = [
          "iPod Classic",
          "iPod Shuffle",
      ]
      for (let itemToBuy of itemsToBuy) {
        const mp3Player = app.productCategory.products.find(
          (product) => product.title() === itemToBuy
        );
        expect(mp3Player).toBeDefined();

        mp3Player.addToCart();

        app.productCategory.checkSuccesAlertText("your shopping cart");
        
        app.shoppingCart.checkItemAddedToShoppingCart(itemToBuy);
      }

      app.productCategory.topLinks.openCheckout();

      app.checkout.billingDetails.continue();
      app.checkout.deliveryDetails.continue();
      app.checkout.deliveryMethod.continue();

      app.checkout.paymentMethod.acceptTermsAndConditions();
      app.checkout.paymentMethod.continue();

      app.checkout.confirmOrder.continue();

      browser.waitUntil(() => app.confirmation.isOpened(), {
        timeoutMsg: "Expected confirmation page to be loaded",
      });
    });

    it("can be purchased with options", function () {
      // remove all items from the cart first
      app.home.topLinks.openShoppingCart();
      app.shoppingCart.removeItemsFromShoppingCart();

      browser.url("/laptop-notebook");
      const productToBuy = "HP LP3065"
      
      const product = app.productCategory.products.find(
        (product) => product.title() === productToBuy
      );
      expect(product).toBeDefined();

      product.addToCart();

      app.productWithOption.selectDate(new Date())
      app.productWithOption.addToCart()
      app.productWithOption.checkSuccesAlertText("your shopping cart");
      app.shoppingCart.checkItemAddedToShoppingCart(productToBuy);

      // checkout
      app.productWithOption.topLinks.openCheckout();

      app.checkout.billingDetails.continue();
      app.checkout.deliveryDetails.continue();
      app.checkout.deliveryMethod.continue();

      app.checkout.paymentMethod.acceptTermsAndConditions();
      app.checkout.paymentMethod.continue();

      app.checkout.confirmOrder.continue();

      browser.waitUntil(() => app.confirmation.isOpened(), {
        timeoutMsg: "Expected confirmation page to be loaded",
      });

    });
  });
});