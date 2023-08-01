import clientPromise from '@/utils/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
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

  // session 에다가 저장해서 사용하기
  // * 필요 db adapter
  // 어딘가에 저장한다.
  // 구조 - users (사용자), accounts (사용자 계정), sessions (세션)

  adapter: MongoDBAdapter(clientPromise),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
