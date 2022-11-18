// import { createContext, useContext, useState } from "react";

// interface ContextProps {
//     user: any;
//     setUser: (user: any) => void
// }

// const AuthContext = createContext<ContextProps>(null!);

// function AuthProvider({children}: any) {
//     const [user, setUser] = useState(null);


//     return (
//         <AuthContext.Provider
//         value={{
//             user,
//             setUser
//         }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

// function useAuth() {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider ');
//     }
//     return context;
// }

// export {AuthProvider, useAuth};