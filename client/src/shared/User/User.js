import { createContext } from "react";

const contexteAuthentification = createContext({
    token, 
    userId,
    role, 
    handleLogin() {},
    handleLogout() {},
})