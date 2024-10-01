"use client";


import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GuestLoginForm from "@/components/GuestLoginForm";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle traditional sign-in
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/home'); // Redirect to the home page on success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Sign In</h2>
        
        <form onSubmit={handleSignIn}>
          {/* Traditional sign-in form */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full px-4 py-2 bg-yellow-500 text-indigo-900 font-semibold rounded-md hover:bg-yellow-400 transition-colors">
            Sign In
          </button>
        </form>

        {/* Social and Guest Login Options */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-gray-400 text-sm mb-4">Or sign in with:</p>

          {/* Google Sign-In */}
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors mb-4"
            onClick={() => signIn("google", { callbackUrl: "/home" })}
          >
            Sign in with Google
          </button>

          {/* Guest Login Button */}
          <GuestLoginForm /> {/* Guest login button inside this component */}
        </div>

      </div>
    </div>
  );
}
