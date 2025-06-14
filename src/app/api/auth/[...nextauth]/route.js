import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                try {
                    const res = await axios.post("http://localhost:3000/api/v1/user/googlelogin", {
                        email: profile.email,
                        name: profile.name,
                        googleId: profile.sub,
                        image: profile.picture,
                    });

                    token.backendToken = res.data.token;
                } catch (err) {
                    console.error("Backend login failed:", err.message);
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.backendToken = token.backendToken;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };