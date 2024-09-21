import { useState } from 'react';

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Show toast for 3 seconds
  };

  const Toast = () =>
    toastMessage ? (
      <div className="fixed bottom-4 right-4 bg-black text-white py-2 px-4 rounded-lg shadow-lg z-50">
        {toastMessage}
      </div>
    ) : null;

  return { toast, Toast };
};
