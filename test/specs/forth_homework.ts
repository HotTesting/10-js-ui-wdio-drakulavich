
// Use http://93.126.97.71:10082/mp3-players to simplify these tests. Mp3 players does not have custom params on details page.
import {itemByTitle} from '../helpers/util'
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
            
            // open mp3 players
            $('a=MP3 Players').click()
            const openedSeeAllLink = $('.dropdown.open .see-all')
            openedSeeAllLink.click()
        });

        it('can be added to wishlist', function () {
            const nano = itemByTitle('iPod Nano')
            
            nano.$('.fa-heart').click()

            const alert = $('.alert-success')
            expect(alert).toHaveTextContaining('your wish list')
        })

         
        it('can be selected for comparison', function () {
            const nano = itemByTitle('iPod Nano')
            
            nano.$('.fa-exchange').click()

            const alert = $('.alert-success')
            expect(alert).toHaveTextContaining('your product comparison')
        })

        it('can be added to cart', function () {
            const shuffle = itemByTitle('iPod Shuffle')
            
            shuffle.$('.fa-shopping-cart').click()

            const alert = $('.alert-success')
            expect(alert).toHaveTextContaining('your shopping cart')
            
            const cart = $('#cart-total i.fa-shopping-cart')
            expect(cart).toHaveTextContaining('1 item(s)')
        })
    })

 
    it('can be selected for comparison by guest', function () {

    })
 
    it('can be added to cart by guest', function () {
 
    })
 })