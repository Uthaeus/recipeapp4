import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                getDoc(userRef).then((userSnapshot) => {
                    if (userSnapshot.exists()) {
                        setUser({ ...userSnapshot.data(), id: currentUser.uid });
                        setIsLoggedIn(true);
                    } else {
                        setUser(null);
                        setIsLoggedIn(false);
                    }
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error', errorCode, errorMessage);
                });
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });
    
        return () => {
            unsubscribe();
        };
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