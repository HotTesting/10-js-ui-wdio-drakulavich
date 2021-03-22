import { TopLinks } from "./components/toplinks.component"

export class LoginPage {
    topLinks: TopLinks = new TopLinks()

    open(url: string) {
        browser.url(url)
        expect($('#content')).toBeDisplayed()
    }

    loginWithCreds(email:string, password: string) {
        const loginForm = $("#content .well form");
        
        loginForm.$("#input-email").setValue("jon@snow.com");
        loginForm.$("#input-password").setValue("jon-snow-pass");
        loginForm.$('input[type="submit"]').click();
    }
}