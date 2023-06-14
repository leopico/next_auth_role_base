import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

//This is for authorization
export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === "/admin-dashboard" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    //This callbacks is comming from [...nextauth].js
    callbacks: {
      //if this authorized fn is return false then go to signIn page and then true then go to middleware fn and proceed
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

//this is for authentication
export const config = { matcher: ["/admin-dashboard", "/profile-page"] };
