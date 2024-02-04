

import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account,user }) {
      console.log("jwt callback called",account,token);
      try{
        if (account && user) 
        {
          token.accessToken = account.access_token;
          console.log("jwt return",account);
          console.log("awef",token)
          // Send the token to the backend server
          // try {
          //   const backendRes = await fetch(`/localhost:8080`, {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       token,
          //     }),
          //   });

          //   const backendData = await backendRes.json();
          //   console.log("Backend response:", backendData);
          // } catch (error) {
          //   console.log("Error sending token to backend:", error);
          // }
          return token;
        }
      }
      catch(error){
        console.error("Error in jwt callback:", error);
        throw error;
      }
    },
    
  },
  pages: {
   signIn: "/i/login",
  },
});

export { handler as GET, handler as POST };