export function selectCategoryAndItem(category:string, itemTitle: string) {
    const menuBar = $('#menu.navbar')
    menuBar.$('a=' + category).click()
    const openedSeeAllLink = menuBar.$('li.dropdown.open .see-all')
    expect(openedSeeAllLink).toBeDisplayed()
    openedSeeAllLink.click()
    expect($('#content')).toBeDisplayed()

    const results = $$('#content .product-layout')
    expect(results).toBeElementsArrayOfSize({ gte: 1 })
    const item = results.find(e => e.$('.caption h4').getText() == itemTitle)

    return item
}

export function clearCart() {
    const shoppingCart = $('#top-links i.fa-shopping-cart')
    expect(shoppingCart).toBeDisplayed()
    shoppingCart.click()

    const contentTitle = $('#content h1')
    expect(contentTitle).toHaveTextContaining('Shopping Cart')

    const cartItems = $$('#content button[data-original-title="Remove"]')
    cartItems.forEach(element => {
        expect(element).toBeClickable()
        element.click()
    });
    expect($('#content p')).toHaveTextContaining('shopping cart is empty')
}