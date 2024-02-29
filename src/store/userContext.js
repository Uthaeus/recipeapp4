import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { db } from "../firebase-config";

import { auth } from "../firebase-config";

export const UserContext = createContext({
    user: {},
    logout: () => {},
    isLoggedIn: false
});

function UserContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await new Promise((resolve, reject) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                });
            });
    
            if (user) {
                if (!user.role) {
                    const userRef = doc(db, "users", user.uid);
                    const userSnapshot = await getDoc(userRef);
                    const userData = userSnapshot.data();
                    const userRole = userData.role ? userData.role : "user";
                    
                    setUser({ ...userData, role: userRole });
                } else {
                    setUser(user);
                }
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        };
    
        fetchUserData();
    }, []);

    const logout = () => {
        signOut(auth);
    };

    const value = {
        user,
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