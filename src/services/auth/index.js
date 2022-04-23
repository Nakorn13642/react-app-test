
import http from "../http/index";

export async function login(email, password) {
    const response = await http.post("/user/login", {
        email: email,
        password: password
    });
    return response;
}

export async function getProfile() {
    const token = localStorage.getItem("token");
    const response = await http.get("/user/profile", {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    return response; //{ user: {id: 1, fullname: "Mary Doe"...}}
}

export function isLogin() {
    const token = localStorage.getItem("token");
    if (token) {
        return true; //เข้าระบบแล้ว
    } else {
        return false; //ยังไม่ได้ล็อคอิน
    }
}

export function logout() {
    localStorage.removeItem("token");
}