export function itemByTitle(itemTitle: string) {
    const results = $$('#content .product-layout')
    const item = results.find(e => e.$('.caption h4').getText() == itemTitle)

    return item
}