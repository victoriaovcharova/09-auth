'use client'
import { useUserData } from "@/lib/store/noteStore";
import { checkSession} from "@/lib/ClientApi";
import { getMe } from "@/lib/ClientApi";
import React, { useEffect } from "react";

type Props = {
    children: React.ReactNode
}

const AuthProvider = ({children}: Props) =>{
    const {setData, clearData} = useUserData()



    useEffect(() =>{
        const fetchUser = async () =>{
            const isAuth = await checkSession()

            if(isAuth){
                const user = await getMe()

                if(user){
                    setData(user)
                }
                else{
                    clearData()
                }
            }

        }

        fetchUser();
    }, [setData, clearData])

    return children;
}


export default AuthProvider;