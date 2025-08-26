'use client'
import Image from "next/image";
import css from './edit.module.css'
import { useRouter } from "next/navigation";
import { getMeUpdata} from "@/lib/ClientApi";
import { getMe} from "@/lib/ClientApi";
import React, { useEffect, useState } from "react";

const Edit =  () =>{
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')

    const router = useRouter()
    const handleCancel = () =>{
        router.push('/profile')
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(event.target.value);
    }
     
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        await getMeUpdata({userName: userName})
        
    }

    useEffect(() =>{
        getMe()
        .then((value) =>{
            setUserEmail(value.email)
        })
        
    }, [])
    return(
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
                />

                <form  className={css.profileInfo}>
                <div className={css.usernameWrapper}>
                    <label htmlFor="username">Username:</label>
                    <input value={userName} onChange={handleChangeName} id="username"
                    type="text"
                    className={css.input}
                    />
                </div>
                
                
                <p>Email: {userEmail}</p>
                
                

                <div className={css.actions}>
                    <button onSubmit={() => handleSubmit}  type="submit" className={css.saveButton}>
                    Save
                    </button>
                    <button onClick={handleCancel} type="button" className={css.cancelButton}>
                    Cancel
                    </button>
                </div>
                </form>
            </div>
        </main>

    )
}

export default Edit;