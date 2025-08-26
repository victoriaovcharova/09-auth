'use client'
import { useUserData } from '@/lib/store/noteStore';
import css from './sign-up.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/ClientApi';
import { RegisterRequest } from '@/lib/api';
import { ApiError } from 'next/dist/server/api-utils';
const SignUp = () =>{
    const {setData} = useUserData()
    const router = useRouter();
    const [error, setError] = useState('');

    const handleRegister = async (formData: FormData) =>{
        try{
            const data = Object.fromEntries(formData) as RegisterRequest;
            const response = await register(data);
            
            
            

            if(response){
                setData(response);
                router.push('/profile')
            }
            else{
                setError('Invalid email or password');
            }
        }catch(error){
            
            setError((error as ApiError).message)
                 
            
        }
        
    }
    return(
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
                <form className={css.form} action={handleRegister}>
                    <div className={css.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" className={css.input} required />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" className={css.input} required />
                    </div>

                    <div className={css.actions}>
                        <button type="submit" className={css.submitButton}>
                            Register
                        </button>
                    </div>

                    <p className={css.error}>Error</p>
            </form>
        </main>

    )
}

export default SignUp;