// src/lib/oauth.ts
"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGithub() {
  // mark this function as a Server Action
  "use server";

  // initialize Appwrite admin client
  const { account } = await createAdminClient();

  // read the incoming request’s headers
  const headersList = await headers();
  const origin = headersList.get("origin") ?? "";

  // create the OAuth URL and redirect there
  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/oauth`,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
}


export async function signUpWithGoogle() {
  // mark this function as a Server Action
  "use server";

  // initialize Appwrite admin client
  const { account } = await createAdminClient();

  // read the incoming request’s headers
  const headersList = await headers();
  const origin = headersList.get("origin") ?? "";

  // create the OAuth URL and redirect there
  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/sign-up`
  );

  return redirect(redirectUrl);
}