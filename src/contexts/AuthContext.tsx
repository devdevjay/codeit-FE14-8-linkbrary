
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import { login as apiLogin } from "@/services/api";

type User = {
  id: string;
  email: string;
  name: string;
};

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('linkbrary_user');
    const token = localStorage.getItem('linkbrary_token');
    
    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('linkbrary_user');
        localStorage.removeItem('linkbrary_token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, accept any email/password combination
      // In a real app, this would validate against a backend
      const response = await apiLogin(email, password).catch(() => {
        // Fallback for demo
        return {
          user: {
            id: '1',
            email,
            name: email.split('@')[0]
          },
          token: 'demo-token-12345'
        };
      });
      
      const { user, token } = response;
      
      setCurrentUser(user);
      setIsLoggedIn(true);
      
      localStorage.setItem('linkbrary_user', JSON.stringify(user));
      localStorage.setItem('linkbrary_token', token);
      
      toast.success("로그인 성공! 환영합니다!");
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      return false;
    }
  };

  const signup = async (email: string, name: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, you'd create the user in your backend here
      toast.success("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('linkbrary_user');
    localStorage.removeItem('linkbrary_token');
    
    toast.success("로그아웃 되었습니다");
  };

  const value = {
    currentUser,
    isLoggedIn,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
