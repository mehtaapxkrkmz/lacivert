import { createContext, useContext, useState, useEffect } from 'react';

// 1. Context oluştur
const AuthContext = createContext();

// 2. Sağlayıcı bileşeni
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Oturum açma
  const login = (token, user) => {
    const userWithId = {
    ...user,
    _id: user._id || user.id || '',  // _id varsa onu kullan, yoksa id'yi
    token,
  };
    setToken(token);
    setUser(userWithId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithId));
  };

  // Oturumu kapatma
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Tarayıcıyı yenilediğinde bilgileri geri yükle
  useEffect(() => {
    
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook ile context'e erişim
export const useAuth = () => useContext(AuthContext);
