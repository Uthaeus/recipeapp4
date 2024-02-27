import { createContext, useState } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    logout: () => {},
});

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        setUser,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;