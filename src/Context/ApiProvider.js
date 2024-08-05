import { createContext, useContext } from 'react';
import  BlogApiClient  from "../services/ApiClient" 

const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const api = new BlogApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
    return useContext(ApiContext);
  }