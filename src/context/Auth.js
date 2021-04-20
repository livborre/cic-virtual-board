import React, { useEffect, useState, useContext } from "react";
import { db, auth } from "../firebase";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)

    function signup(name, email, password) {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then(usercredential => {
                let id = usercredential.user.uid
                db.collection('users').doc(id).set({name})
            });
    }

    function login(email, password) {
            return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(email, password) {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        });
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    if(loading){
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider value={value} >
        {children}
        </AuthContext.Provider>
    );
};