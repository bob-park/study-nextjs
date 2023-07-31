import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH2_GITHUB_ID as string,
      clientSecret: process.env.OAUTH2_GITHUB_SECRET as string,
    }),
  ],
  secret: '12345',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
