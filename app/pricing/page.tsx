"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket, Star, Zap } from "lucide-react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const pricingPlans = [
    {
      name: "Starter Pro",
      credits: 10,
      price: 49,
      description: "For beginners or small projects starting their design journey",
      icon: Star,
    },
    {
      name: "Professional Suite",
      credits: 40,
      price: 99,
      description: "Perfect for professionals with regular design needs",
      icon: Rocket,
      popular: true,
    },
    {
      name: "Enterprise Max",
      credits: 100,
      price: 149,
      description: "Ultimate package for large enterprises and power users",
      icon: Zap,
    },
  ];

  const handlePurchase = async (planName: string, planPrice: number) => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, planPrice }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert("Failed to create Stripe session.");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            Choose Your <span className="text-yellow-300">Plan</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
            Purchase a plan and get your credits to power your design journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-indigo-800 bg-opacity-50 backdrop-blur-lg border-2 ${
                plan.popular ? "border-yellow-300" : "border-purple-500"
              } relative overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-300 text-indigo-900 px-3 py-1 rounded-bl-lg font-semibold text-sm">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <plan.icon className="h-12 w-12 text-yellow-300" />
                </div>
                <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
                <CardDescription className="text-gray-300 text-center">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold mb-2">₹{plan.price}</p>
                <p className="text-lg mb-4">{plan.credits} Credits</p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>Access to all design tools</li>
                  <li>Priority rendering</li>
                  <li>24/7 support</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-yellow-500 text-indigo-900 hover:bg-yellow-400"
                  onClick={() => handlePurchase(plan.name, plan.price)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Purchase"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Designs?</h2>
          <p className="text-xl mb-8">Start creating professional designs with the perfect plan for you!</p>
          <Button className="bg-yellow-500 text-indigo-900 hover:bg-yellow-400 text-lg px-8 py-3 rounded-full">
            Get Started <Rocket className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
