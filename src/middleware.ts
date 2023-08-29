import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware1(request: NextRequest) { 
    const path = request.nextUrl.pathname;    
    const publicPath = path === "/login" || path === "/signup";
     const notFoundPath = !config.matcher.some(matcher => 
        matcher.endsWith("*") 
            ? path.startsWith(matcher.slice(0, -1)) 
            : path === matcher
    );  
    const token = request.cookies.get("token")?.value || "";
    if (publicPath && token) { 
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    // else if (notFoundPath || path === "/custom404") {
    //      return NextResponse.redirect(new URL('/custom404', request.nextUrl));
  
    // }
}
export const config = {
    matcher: ["/", "/profile/:path*", "/login", "/signup"]
}