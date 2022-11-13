import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import OfferRepository from '../../../src/repositories/OfferRepository';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },

  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      async authorize(formNames) {
        const { email, password } = formNames;
        const offerRepository = new OfferRepository();
        const host = await offerRepository.getHost({ email });

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
};
export default NextAuth(authOptions);
