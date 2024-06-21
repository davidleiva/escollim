import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // Aquí puedes almacenar información del usuario

  const iniciarSesion = (datosUsuario) => {
    // Lógica para iniciar sesión en el contexto
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    // Lógica para cerrar sesión en el contexto
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};
