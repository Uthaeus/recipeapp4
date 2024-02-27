import { createContext, useState } from "react";

export const UserContext = createContext({
    user: {},
    initializeUser: () => {},
    logout: () => {},
    isLoggedIn: false
});

function UserContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    const initializeUser = (data) => {
        setUser(data);
        setIsLoggedIn(true);
    };

    const value = {
        user,
        initializeUser,
        logout,
        isLoggedIn
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;