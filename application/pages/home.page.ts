import { TopLinks } from "./components/toplinks.component"

export class HomePage {
    topLinks: TopLinks = new TopLinks()

    openAllForCategory(categoryName: string) {
        const menuBar = $("#menu.navbar");
        menuBar.$(`a=${categoryName}`).click();
        
        const openedSeeAllLink = menuBar.$("li.dropdown.open .see-all");
        expect(openedSeeAllLink).toBeDisplayed();
        openedSeeAllLink.click();
    }
}