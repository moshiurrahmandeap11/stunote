import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts/AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // google provider
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // email, password signup
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // email, password login
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // onauthchange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    },[])

    const userInfo = {
        googleLogin,
        user,
        loading,
        createUser,
        loginUser,
    }

    return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;