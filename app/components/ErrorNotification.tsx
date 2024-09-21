import { XCircleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from 'react';

type ErrorNotificationProps = {
  errorMessage: string;
};

export function ErrorNotification({ errorMessage }: ErrorNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="mx-4 mb-10 rounded-md bg-red-100 p-4 shadow-lg lg:mx-6 xl:mx-8 transition-all duration-300 ease-in-out">
      <div className="flex justify-between">
        <div className="flex">
          <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
          <p className="ml-3 text-sm font-semibold text-red-900">
            {errorMessage}
          </p>
        </div>
        <button onClick={() => setIsVisible(false)}>
          <XMarkIcon className="h-6 w-6 text-red-500 hover:text-red-700" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
