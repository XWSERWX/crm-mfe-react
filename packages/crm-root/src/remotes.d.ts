declare module 'auth/AuthApp' {
  const AuthApp: import('react').FC<{
    dispatch: import('react').Dispatch<import('./app/store/SimpleStore').AppAction>;
    isAuthenticated: boolean;
    user: import('@crm/types').User | null;
    onLoginSuccess?: () => void;
  }>;
  export default AuthApp;
}

declare module 'clients/ClientsApp' {
  const ClientsApp: import('react').FC<{
    dispatch: import('react').Dispatch<import('./app/store/SimpleStore').AppAction>;
    clients?: import('@crm/types').Client[];
  }>;
  export default ClientsApp;
}

declare module 'deals/DealsApp' {
  const DealsApp: import('react').FC<{
    dispatch: import('react').Dispatch<import('./app/store/SimpleStore').AppAction>;
    deals?: import('@crm/types').Deal[];
  }>;
  export default DealsApp;
}
