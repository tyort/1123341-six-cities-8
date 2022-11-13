import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import OfferRepository from '../../../src/repositories/OfferRepository';

let host;

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
        offerRepository.getHost({ email }).then((response) => {
          host = JSON.parse(response);
        });

        if (!host || password !== host.password) {
          return null;
        }

        return host;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log('писька');
      return { ...session, user: host };
    },
  },
  pages: {
    signIn: '/login/login',
  },
};
export default NextAuth(authOptions);
