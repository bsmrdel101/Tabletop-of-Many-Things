import { ready } from '../scripts/tools/utils';
import { registerUser } from '../controllers/userController';

export default function registerPage() {
    ready(() => {
        bindEventToFormSubmit();
    }, '.register-page');

    const bindEventToFormSubmit = () => {
        const usernameInput: HTMLInputElement = <HTMLInputElement>document.getElementById('register-user-username');
        const passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById('register-user-password');
        (<HTMLButtonElement>document.getElementById('register-user-btn')).addEventListener('click', (e) => {
            e.preventDefault();
            registerUser({ username: usernameInput.value, password: passwordInput.value });
        });
    }

    return (`
        <div class="register-page">
            <div class="box__form box__form--register-user-form">
                <center>
                    <form>
                        <h1>Register</h1>
                        <label class="box__form--register-username">Username
                            <input placeholder="name" id="register-user-username" required>
                        </label>
                        <label>Password
                            <input placeholder="password" type="password" id="register-user-password" required>
                        </label>
                        <button id="register-user-btn">Submit</button>
                    </form>
                    <a href="/login">Login</a>
                </center>
            </div>
        </div>
    `);
}
