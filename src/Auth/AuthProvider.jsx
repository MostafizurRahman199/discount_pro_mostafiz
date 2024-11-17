import React, { createContext, useContext, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    updateProfile,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';

import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';





// ___________________________create context

const myContext = createContext();

export const useFirebaseAuth = () => {
    return useContext(myContext);
}





const AuthProvider = ({children}) => {


    // ___________________________state
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);





    // 1. ___________________________Register with email/password

    const registerUser = async (email, password, name, photoURL) => {
        try {
            setLoading(true);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            
            // First update the profile
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            });
            
            // Then set the user with updated profile
            const updatedUser = auth.currentUser;
            setUser(updatedUser);
            
            toast.success('Registration successful!');
            return updatedUser;
        } catch (error) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };





    // ___________________________Google Sign in

    const googleSignIn = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // Set user state after successful sign-in
            setUser(result.user);
            
            toast.success('Successfully signed in with Google!');
            return result.user;
        } catch (error) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };




    // ___________________________Login with email/password

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            return result.user;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };







    // ___________________________Add forget password function

    const resetPassword = async (email) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent!');
        } catch (error) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };






    // ___________________________Add useEffect to monitor auth state

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);






    // ___________________________Add logout function

    const logOut = async () => {
        setLoading(true);
        try {
            await auth.signOut();
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };







    // ___________________________return authInfo

    const authInfo = {
        user,
        loading,
        registerUser,
        googleSignIn,
        loginUser,
        logOut,  
        resetPassword,  
    }

    return (
        <myContext.Provider value={authInfo}>
            {children}
        </myContext.Provider>
    )
}

export default AuthProvider