import { useContext, createContext, useState, useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import {account} from "../lib/appwriteConfig.js"; // Import the account instance from appwrite.js

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(false);
    const [user, setUser] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        checkAuth();
    }

    const checkAuth = async () => {
        try{
            const responseSession = await account.getSession("current");
            setSession(responseSession);

            const responseUser = await account.get();
            setUser(responseUser);
        }catch (error) {
            console.log("Error checking auth:", error);
        }
        setLoading(false);
    }

    const signin = async ({email, password}) => {
        setLoading(true);
        try {
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.error("Error signing in:", error);
        }
        setLoading(false);
    };

    const signup = async ({ email, password, name }) => {
        setLoading(true);
        try {
            await account.create("unique()", email, password, name);
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession);
            const responseUser = await account.get();
            setUser(responseUser);
        } catch (error) {
            console.error("Error signing up:", error);
        }
        setLoading(false);
    };

    const signout = async () => {
        setLoading(true);
        account.deleteSession("current")
        setSession(null);
        setUser(null);
        setLoading(false);
    };

    const contextData = { session, user, signin, signout, signup };
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <SafeAreaView>
                    <Text>Loading..</Text>
                </SafeAreaView>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
