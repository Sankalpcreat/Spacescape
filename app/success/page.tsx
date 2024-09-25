// app/pages/success.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  // Optional: Capture session_id to verify the payment if necessary
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (sessionId) {
      // Optionally verify the session with your backend, handle post-payment actions
      console.log("Payment successful, session ID: ", sessionId);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">There was an issue processing your payment.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="bg-black bg-opacity-60 backdrop-blur-lg rounded-lg p-8 shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-6">
          Thank you for your purchase. Your credits have been added to your account.
        </p>
        <button
          onClick={() => router.push("/home")}
          className="px-6 py-3 bg-yellow-500 text-indigo-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
