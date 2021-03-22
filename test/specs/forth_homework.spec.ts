
// Use http://93.126.97.71:10082/mp3-players to simplify these tests. Mp3 players does not have custom params on details page.
import {selectCategoryAndItem, clearCart} from '../helpers/util'
// bonus points:
// - use preconditions
// - use dataprovider
describe('Items', function () {
    // You must be logged in to use wishlist

    describe('for logged in user', function() {
        beforeEach(function () {
            const topDropdown = $('#top-links i.fa.fa-user')
            expect(topDropdown).toBeDisplayed()
            topDropdown.click()

            const loginLink = $('#top-links').$('=Login')
            expect(loginLink).toBeDisplayed()
            loginLink.click()

            const loginForm = $('#content .well form')
            expect(loginForm).toBeDisplayed()

            loginForm.$('#input-email').setValue('jon@snow.com')
            loginForm.$('#input-password').setValue('jon-snow-pass')
            loginForm.$('input[type="submit"]').click()
        });

        it('can be added to wishlist', function () {
            const item = 'iPod Nano'
            const selectedItem = selectCategoryAndItem('MP3 Players', item)
            
            selectedItem.$('.fa-heart').click()

            const alert = $('.alert-success')
            expect(alert).toHaveTextContaining('your wish list')
        })

         
        it('can be selected for comparison', function () {
            const item = 'iPod Nano'
            const selectedItem = selectCategoryAndItem('MP3 Players', item)
            
            selectedItem.$('.fa-exchange').click()

            const alert = $('.alert-success')
            expect(alert).toHaveTextContaining('your product comparison')
        })

        it('can be added to cart', function () {
            clearCart()
            const item = 'iPod Shuffle'
            const selectedItem = selectCategoryAndItem('MP3 Players', item)
            
            selectedItem.$('.fa-shopping-cart').click()

            const alert = $('div#product-category div.alert-success')
            expect(alert).toHaveTextContaining('your shopping cart')
            
            const cart = $('#cart-total i.fa-shopping-cart')
            expect(cart).toBeVisibleInViewport()
            cart.click()

            const cartDropdown = $('#cart .dropdown-menu')
            expect(cartDropdown).toHaveTextContaining(item)
        })
    })
 
    it('can be selected for comparison by guest', function () {
        const item = 'iPod Nano'
        const selectedItem = selectCategoryAndItem('MP3 Players',item)

        selectedItem.$('.fa-exchange').click()

        const alert = $('.alert-success')
        expect(alert).toHaveTextContaining('your product comparison')
    })
 
    it('can be added to cart by guest', function () {
        const item = 'iPod Touch'
        const selectedItem = selectCategoryAndItem('MP3 Players', item)

        selectedItem.$('.fa-shopping-cart').click()

        const alert = $('div#product-category div.alert-success')
        expect(alert).toHaveTextContaining('your shopping cart')

        const cart = $('#cart-total i.fa-shopping-cart')
        expect(cart).toBeVisibleInViewport()
        cart.click()

        const cartDropdown = $('#cart .dropdown-menu')
        expect(cartDropdown).toHaveTextContaining(item)
    })
 })