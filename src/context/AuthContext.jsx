
//create AuthContext

import {createContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext({})

//create AuthContextProvider

function AuthContextProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const getUserInfo = async (token) => {
        try{
            let response = await axios.get("http://localhost:8000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.data[0]?.errors?.message === "Unauthenticated."){
                setUserData(null)
                localStorage.removeItem("token");
                console.log("Error in Authentication");
            } else{
                setUserData(response.data);
                // console.log("userdata",userData);
            }

        } catch(error){
            console.log("Fetching user data error message",error);
        }
    }
    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token){
            getUserInfo(token)
        }
    },[])
    return (
        <AuthContext.Provider value={{userData, getUserInfo, setUserData}}>{children}</AuthContext.Provider>
    )
}

export {AuthContext, AuthContextProvider}