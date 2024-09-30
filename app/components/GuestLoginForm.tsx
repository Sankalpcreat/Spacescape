"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Use Next.js router

export default function GuestLoginForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize router

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/guest-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Guest login successful! You have ${data.credits} credits.`);
        router.push('/home'); // Redirect to /home after successful guest login
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="guest-login-form">
      <button 
        onClick={handleGuestLogin} 
        disabled={loading} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Logging in...' : 'Guest Login'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
