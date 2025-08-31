import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContexts/AuthContexts';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';



const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // google provider
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // facebook provider
    const facebookLogin = () => {
        return signInWithPopup(auth, facebookProvider)
    }

    // github provider
    const githubLogin = () => {
        return signInWithPopup(auth, githubProvider)
    }

    // email, password signup
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // email, password login
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout 
    const logOut = () => {
        return signOut(auth)
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
        facebookLogin,
        githubLogin,
        logOut,
    }

    return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;