"use client";


import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle traditional sign-up
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      router.push('/signin'); // Redirect to the sign-in page after signup
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>
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
            Sign Up
          </button>
        </form>

      

        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-yellow-500 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
}
