import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

type GitHubProfile = {
  id: number;
  login: string;
  bio: string | null;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({
      user: { name, email, image },
      profile,
    }) {
      if (!profile) {
        return false;
      }

      const githubProfile = profile as unknown as GitHubProfile;

      const { id, login, bio } = githubProfile;

      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
    
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id,
        });
        
        token.id = user?._id;
    
      }
    
      return token;
    },
    
    async session({ session, token }) {    
      Object.assign(session, {
        id: token.id,
      });
    
    
      return session;
    },
  },
});