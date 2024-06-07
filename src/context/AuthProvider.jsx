import { createContext, useState , useContext, useEffect} from "react";

const AuthContext=createContext({});

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [allUsers,setAllUsers]=useState([]);

    useEffect(()=>{
        const storedUser=localStorage.getItem('currUser');
        const storedUsers=localStorage.getItem('allUsers');
        if(storedUser){
            setUser(JSON.parse(storedUser));
            console.log(user);
        }
        if(storedUsers){
            setAllUsers(JSON.parse(storedUsers));
            console.log(allUsers);
        }
    },[]);

    const register=(recentUser)=>{
        const newAllUsers=[...allUsers,recentUser];
        localStorage.setItem('allUsers',JSON.stringify(newAllUsers));
        setAllUsers(newAllUsers);
    }

    const login=(currentUser)=>{
            localStorage.setItem('currUser',JSON.stringify(currentUser));
            setUser(currentUser);
    }

    const logOut=()=>{
        localStorage.removeItem('currUser');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,setUser,allUsers,setAllUsers,login,register,logOut}}>
               {children}
        </AuthContext.Provider>

    );

}

export default AuthContext;