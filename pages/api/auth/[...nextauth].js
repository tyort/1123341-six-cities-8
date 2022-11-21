import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import OfferRepository from '../../../src/repositories/OfferRepository';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(formNames) {
        const { email, password } = formNames;
        const offerRepository = new OfferRepository();
        const hostInJson = await offerRepository.getHost({ email });
        const host = JSON.parse(hostInJson);

        if (!host || password !== host.password) {
          return null;
        }
        return host;
      },
    }),
  ],
  pages: {
    signIn: '/login/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      // eslint-disable-next-line no-param-reassign
      token = user ? { ...token, ...user } : token;
      return token;
    },
  },
};
export default NextAuth(authOptions);
