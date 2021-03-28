import { TopLinks } from "./components/toplinks.component"

export class LoginPage {
    topLinks: TopLinks = new TopLinks()

    open(url: string) {
        browser.url(url)
        expect($('#content')).toBeDisplayed()
    }

    loginWithCreds(email:string, password: string) {
        const user = {
            email: 'jon@snow.com',
            password: 'jon-snow-pass'
        }

        browser.execute(function (_user) {
            console.dir(_user)
            const loginForm = "#content .well form";

            document.querySelector(loginForm + ' input#input-email').value = _user.email;
            document.querySelector(loginForm + ' input#input-password').value = _user.password;

            document.querySelector(loginForm + ' input[type="submit"]').click();
        }, user)
    }
}