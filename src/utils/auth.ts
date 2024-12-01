import Cookies from "js-cookie";

export function checkAuth() {
// Confirm if the current client is logged in. This is a local check only
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    const role = Cookies.get("role");

    if (!access_token || !refresh_token || !role) return false
    return true
}

export function checkUserRole(credentials: {email: String, password: String}) {

}