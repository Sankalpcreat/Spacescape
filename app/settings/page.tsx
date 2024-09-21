"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Moon, Sun, Bell, Globe, CreditCard, Save, Rocket, Star } from 'lucide-react';

export default function SpaceSettings() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const { toast, Toast } = useToast();

  const handleSaveSettings = () => {
    toast("Your cosmic preferences have been updated successfully.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16">
          <span className="text-yellow-300">Space</span>Scape Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Theme Settings */}
          <div className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-blur-md shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <Sun className="mr-3 text-yellow-400" /> Display
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Dark Mode</Label>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                 
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-blur-md shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <Bell className="mr-3 text-blue-400" /> Notifications
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label>Email Alerts</Label>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Push Notifications</Label>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                 
                />
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-blur-md shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <Globe className="mr-3 text-green-400" /> Language
            </h2>
            <Select
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
                { value: 'jp', label: '日本語' }
              ]}
              value="en"
              onChange={(value) => console.log(value)}
            />
          </div>

          {/* Billing Settings */}
          <div className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-blur-md shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-3xl font-semibold mb-6 flex items-center">
              <CreditCard className="mr-3 text-purple-400" /> Billing
            </h2>
            <Select
              options={[
                { value: 'free', label: 'Free Exploration' },
                { value: 'pro', label: 'Pro Navigator' },
                { value: 'enterprise', label: 'Galactic Empire' }
              ]}
              value="free"
              onChange={(value) => console.log(value)}
            />
            <Button className="mt-4 w-full bg-purple-700 hover:bg-purple-800">
              Manage Subscription
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-110"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Cosmic Settings
          </Button>
        </div>

        <Toast />
      </div>
    </div>
  );
}
