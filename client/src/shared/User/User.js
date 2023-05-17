import { createContext } from "react";

const contexteAuthentification = createContext({
    token: null, 
    userId: null,
    role: "guess", 
    handleLogin() {},
    handleLogout() {},
})