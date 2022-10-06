import { ready } from '../scripts/utils';
import { loginUser } from '../controllers/userController';

export default function loginPage() {
    ready(() => {
        bindEventToFormSubmit();
    }, '.login-page');

    const bindEventToFormSubmit = () => {
        const usernameInput: HTMLInputElement = <HTMLInputElement>document.getElementById('login-user-username')!;
        const passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById('login-user-password')!;
        (<HTMLButtonElement>document.getElementById('login-user-btn')).addEventListener('click', (e) => {
            e.preventDefault();
            loginUser({ username: usernameInput.value, password: passwordInput.value });
        });
    }
    
    return (`
        <div class="login-page">
            <div class="box__form box__form--login-user-form">
                <center>
                    <form>
                        <h1>Login</h1>
                        <label class="box__form--login-username">Username
                            <input placeholder="name" id="login-user-username" required>
                        </label>
                        <label>Password
                            <input placeholder="password" type="password" id="login-user-password" required>
                        </label>
                        <button id="login-user-btn">Submit</button>
                    </form>
                    <a href="/register">Register</a>
                </center>
            </div>
        </div>
    `);
}
