import { ConfirmationPage } from "./pages/checkout/confirmation.page";
import { CheckoutPage } from "./pages/checkout/index";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { ProductCategoryPage } from "./pages/productCategory.page";
import { ProductWithOptionsPage } from "./pages/productWithOptions.page";
import { ShoppingCartPage } from "./pages/shoppingCart.page";


export class App {
    home: HomePage
    login: LoginPage
    shoppingCart: ShoppingCartPage
    productCategory: ProductCategoryPage
    checkout: CheckoutPage
    confirmation: ConfirmationPage
    productWithOption: ProductWithOptionsPage

    constructor() {
        this.home = new HomePage()
        this.login = new LoginPage()
        this.shoppingCart = new ShoppingCartPage()
        this.productCategory = new ProductCategoryPage()
        this.checkout = new CheckoutPage()
        this.confirmation = new ConfirmationPage()
        this.productWithOption = new ProductWithOptionsPage()
    }
}