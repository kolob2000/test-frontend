class UserService {
    constructor(username, token) {
        if (!username || !token) {
            throw new Error("Missing username or token");
        }
        this._username = username;
        this._token = token;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get token() {
        throw new Error("You are not allowed to get password");
    }

    async authenticateUser() {
        try {
            const response = await fetch(`https://examples.com/api/user/authenticate`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': this._token,
                }
            })
            if (!response.ok) {
                return false;
            }
            return true;
        } catch (error) {
            alert(error.message);
        }

    }

    static async loginUser(username, password) {
        const response = await fetch(`https://examples.com/api/user/login`,
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        return await response.json();
    }
}

let userService;
$('#login').submit(async function () {
    const username = $('#username').val();
    const password = $('#password').val();
    try {
        const result = await UserService.loginUser(username, password);
        userService = new UserService(username, result.token);
        document.location.href = '/home';
    } catch (error) {
        alert(error.message);
    }
});
