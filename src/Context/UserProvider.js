import { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiProvider';

const UserContext = createContext();


export default function UserProvider({ children }) {
    const [user, setUser] = useState();
    const api = useApi();
    const [Name , setName] = useState();
  
    useEffect(() => {
      (async () => {
        if (api.isAuthenticated()) {
           const response = await api.get('/Auth/GetUser?token=' + localStorage.getItem('accessToken'));
           setUser(response.ok ? response.body : null);
          
        }
        else {
          setUser(null);
        }
      })();
    }, [api]);
  
    const login = async (username, password) => {
      const result = await api.login(username, password);
      if (result === 'ok') {
        setName(username);
        const response = await api.get('/Auth/GetUser?token=' + localStorage.getItem('accessToken'));
        setUser(response.ok ? response.body : null);
      }
      return result;
    };
  
    return (
      <UserContext.Provider value={{ user, setUser, login }}>
        {children}
      </UserContext.Provider>
    );
  }
  
  export function useUser() {
    return useContext(UserContext);
  }