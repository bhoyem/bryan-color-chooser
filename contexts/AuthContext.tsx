import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = {
  email: string;
};

type Session = {
  user: User;
};

type AuthContextValue = {
  session: Session | null;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const SESSION_KEY = "session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function loadSession() {
      const storedSession = await SecureStore.getItemAsync(SESSION_KEY);

      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    }

    loadSession();
  }, []);

  const login = async (email: string) => {
    const nextSession = { user: { email } };
    setSession(nextSession);
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(nextSession));
  };

  const logout = async () => {
    setSession(null);
    await SecureStore.deleteItemAsync(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
