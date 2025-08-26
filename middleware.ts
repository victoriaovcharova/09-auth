import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "@/lib/ServerApi";
import { parse } from "cookie";
const privateRoutes = ['/profile']
const publicRoutes = ['/sign-in', '/sign-up']

export async function middleware(request: NextRequest){


    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;
    const refreshToken = cookiesStore.get('refreshToken')?.value;

    const {pathname} = request.nextUrl;

    const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route))
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))


    if(!accessToken){
        if(refreshToken){
            const data = await checkServerSession()
            const setCookie = data.headers['set-cookie']
            if(setCookie){
                const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]
                
                for(const cookieStr of cookieArray){
                        const parsed = parse(String(cookieStr));

                        const options = {
                            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                            path: parsed.Path,
                            maxAge: Number(parsed['Max-Age'])

                        }

                        if(parsed.accessToken){
                            cookiesStore.set('accessToken', parsed.accessToken, options)
                        }

                        if(parsed.refreshToken){
                            cookiesStore.set('refreshToken', parsed.refreshToken, options)
                        }
                        
                    }
                    if(publicRoutes){
                        return NextResponse.redirect(new URL('/', request.url), {headers:{
                            Cookie: cookiesStore.toString()
                        }});
                        
                    }
                    if(privateRoutes){
                        return NextResponse.next({
                            headers:{
                                Cookie: cookiesStore.toString()
                            }
                        })
                    }
                    

                    

                }
            }
            if(isPublicRoute){
                return NextResponse.next();
            }

            if(isPrivateRoute){
                return NextResponse.redirect(new URL('/sign-in', request.url));
            }
            if(isPublicRoute){
                return NextResponse.next();
            }


        }
        
    }


    



export const config = {
    matcher: ['/profile/:path*', '/sign-in', '/sign-up']
}