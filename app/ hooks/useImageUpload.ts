import { useState } from "react";

export function useImageUpload() {
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  function onImageDrop(acceptedFiles: File[]) {
    // Handle image drop logic
    const file = acceptedFiles[0];
    setFile(file);
    convertImageToBase64(file);
  }

  function convertImageToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setBase64Image(reader.result as string);
  }

  function removeImage() {
    setFile(null);
    setOutputImage(null);
  }

  return {
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
  };
}
