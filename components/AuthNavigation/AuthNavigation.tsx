'use client'

import css from './AuthNavigation.module.css'
import Link from 'next/link';
import { useUserData } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/ClientApi';

const AuthNavigation = () =>{
    const router = useRouter();
    const handleLogOut = async () =>{
        await logout()
        clearData()
        router.push(`/sign-in`)

    }
    const {clearData, isAuthenticated} = useUserData()
    return(
        <>
            {isAuthenticated  
                 ?(<>
                    <li className={css.navigationItem}>
                        <Link prefetch={false}  href="/profile"  className={css.navigationLink}>
                            Profile
                        </Link>
                    </li>

                    <li className={css.navigationItem}>
                        <p className={css.userEmail}>User email</p>
                        <button onClick={handleLogOut} className={css.logoutButton}>
                            Logout
                        </button>
                    </li>
                </>)
                : (
                    <>
                        <li className={css.navigationItem}>
                            <Link prefetch={false} href="/sign-in"  className={css.navigationLink}>
                                Login
                            </Link>
                        </li>

                        <li className={css.navigationItem}>
                            <Link prefetch={false} href="/sign-up"  className={css.navigationLink}>
                                Sign up
                            </Link>
                        </li>
                    </>
                )

            }
             

            

            

        
        </>
    )
}



export default AuthNavigation;