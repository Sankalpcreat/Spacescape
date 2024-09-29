"use client";

import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { PhotoIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { ErrorNotification } from "@/components/ErrorNotification";
import { ActionPanel } from "@/components/ActionPanel";
import { ImageDropzone } from "@/components/ImageDropzone";
import { UploadedImage } from "@/components/UploadedImage";
import { ImageOutput } from "@/components/ImageOutput";
import { SelectMenu } from "../selectmenu";
import { useImageUpload } from "../ hooks/useImageUpload";
import ClientLayout from '../components/ClientLayout';
import { useToast } from "@/components/ui/use-toast"; // Use your custom toast hook

const themes = ["Modern", "Vintage", "Minimalist", "Professional"];
const rooms = ["Living Room", "Dining Room", "Bedroom", "Bathroom", "Office"];

function fileSize(size: number): string {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function HomePage() {
  const {
    outputImage,
    base64Image,
    loading,
    error,
    file,
    onImageDrop,
    removeImage,
    setLoading,
    setError,
    setOutputImage,
  } = useImageUpload();

  const [theme, setTheme] = useState<string>(themes[0]);
  const [room, setRoom] = useState<string>(rooms[0]);
  const [showMessage, setShowMessage] = useState(false);
  const [credits, setCredits] = useState<number>(0); // Track user credits
  const { toast, Toast } = useToast(); // Use the toast hook

  // Fetch user credits on component mount
  useEffect(() => {
    async function fetchUserCredits() {
      try {
        const res = await fetch("/api/get-credits");
        const data = await res.json();
  
        console.log("Credits API Response:", data); // Debugging response
  
        if (res.ok) {
          setCredits(data.credits);
          toast(`You have ${data.credits} credits left`); // Show initial credits
        } else {
          setError("Unable to fetch credits.");
          toast("Unable to fetch credits.");
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
        setError("Unable to fetch credits.");
        toast("Unable to fetch credits.");
      }
    }
  
    fetchUserCredits();
  }, []);

  // Image submission logic
  async function submitImage() {
    if (!file) {
      setError("Please upload an image.");
      toast("Please upload an image."); // Show toast message for missing image
      return;
    }

    if (credits <= 0) {
      toast("You have run out of credits. Please purchase more.");
      return;
    }

    setLoading(true);
    setShowMessage(true);

    try {
      const response = await fetch("/api/replicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image, theme, room }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        toast(result.error);
        setLoading(false);
        return;
      }

      setOutputImage(result.output[1]);
      setLoading(false);

      // Deduct one credit after successful image generation
      const newCredits = credits - 1;
      setCredits(newCredits);

      if (newCredits === 0) {
        toast("You have run out of credits. Please purchase more.");
      } else {
        toast(`Image generated! You have ${newCredits} credits left.`);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast("Something went wrong while generating the image.");
      setLoading(false);
    }
  }

  setTimeout(() => {
    setShowMessage(false);
  }, 10000);

  // Download generated image
  function downloadOutputImage() {
    if (outputImage) {
      const isBase64 = outputImage.startsWith("data:image");
      if (isBase64) {
        saveAs(outputImage, "output.png");
      } else {
        saveAs(outputImage, "output.png");
      }
    }
  }

  return (
    <ClientLayout>
      <div className="relative w-full h-full min-h-screen">
        <main className="relative z-10 flex min-h-screen flex-col py-10 lg:pl-72">
          {error && <ErrorNotification errorMessage={error} />}
          <ActionPanel isLoading={loading} submitImage={submitImage} />

          {showMessage && (
            <div className="mx-4 mt-5 text-center text-lg font-semibold text-white bg-indigo-600 p-2 rounded-md">
              Wait for 10 seconds to generate the image...
            </div>
          )}

          <section className="mx-4 my-10 mt-9 flex w-fit flex-col space-y-8 lg:mx-6 lg:flex-row lg:space-x-8 lg:space-y-0 xl:mx-8">
            <SelectMenu
              label="Model"
              options={themes}
              selected={theme}
              onChange={setTheme}
            />
            <SelectMenu
              label="Room type"
              options={rooms}
              selected={room}
              onChange={setRoom}
            />
          </section>

          <section className="mt-10 grid flex-1 gap-6 px-4 lg:px-6 xl:grid-cols-2 xl:gap-8 xl:px-8">
            {!file ? (
              <ImageDropzone
                title="Drag 'n drop your image here or click to upload"
                onImageDrop={onImageDrop}
              />
            ) : (
              <UploadedImage
                image={file}
                removeImage={removeImage}
                file={{ name: file.name, size: fileSize(file.size) }}
              />
            )}

            <ImageOutput
              title="AI-generated output goes here"
              downloadOutputImage={downloadOutputImage}
              outputImage={outputImage}
              icon={SparklesIcon}
              loading={loading}
            />
          </section>
          <Toast />
        </main>
      </div>
    </ClientLayout>
  );
}
