import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "../types/types";
import { doc, getDoc } from "firebase/firestore";

type AuthContextType = {
  currentUser: User | null;
  roles: string[];
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  roles: [],
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(docRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            const completeUser: User = {
              uid: user.uid,
              email: user.email ?? "",
              firstName: data.firstName ?? "",
              lastName: data.lastName ?? "",
              contact: data.contact ?? "",
              password: data.password ?? "",
              confirmPassword: data.confirmPassword ?? "",
              role: data.role ?? "",
              
            }; 
            setCurrentUser(completeUser);
            const roleData = data.role;
            const rolesArray = Array.isArray(roleData) ? roleData : [roleData];
            setRoles(rolesArray);
          } else {
            setCurrentUser(null);
            setRoles([]);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setCurrentUser(null);
          setRoles([]);
        }
      } else {
        setCurrentUser(null);
        setRoles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, roles, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
