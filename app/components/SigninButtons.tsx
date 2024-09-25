"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Google, Github } from "lucide-react";

export default function SigninButtons() {
  return (
    <div className="flex flex-col space-y-4">
      <Button
        onClick={() => signIn("google")}
        className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        <Google className="h-5 w-5" />
        <span>Sign In with Google</span>
      </Button>

      <Button
        onClick={() => signIn("github")}
        className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        <Github className="h-5 w-5" />
        <span>Sign In with GitHub</span>
      </Button>
    </div>
  );
}
