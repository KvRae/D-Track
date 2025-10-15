import React, { useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "@/lib/appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<string | null>;
    signUp: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for an existing session on load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await account.get();
                setUser(user);
            } catch (err) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser().then(r =>
        {
            console.log( )
        });
    }, []);

    const signUp = async (email: string, password: string) => {
        try {
            await account.create(ID.unique(), email, password);
            const loggedUser = await signIn(email, password);
            return null

        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during sign up.";
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password);
            const user = await account.get();
            setUser(user);
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An unknown error occurred during sign in.";
        }
    };

    const signOut = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
