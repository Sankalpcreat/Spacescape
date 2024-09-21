import { FaTrashAlt } from "react-icons/fa";

type UploadedImageProps = {
  image: File;
  removeImage(): void;
  file: {
    name: string;
    size: string;
  };
};

export function UploadedImage({
  file,
  image,
  removeImage,
}: UploadedImageProps) {
  return (
    <section className="relative min-h-[400px] w-full rounded-lg">
      {/* Image Button */}
      <button className="relative block h-full w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <img
          src={URL.createObjectURL(image)}
          alt={image.name}
          className="h-full w-full object-cover rounded-lg" // Ensure the image covers the whole card
        />
      </button>

      {/* Trash Button for Deletion */}
      <button
        className="group absolute right-4 top-4 rounded bg-yellow-500 p-2 text-black"
        onClick={removeImage}
      >
        <FaTrashAlt className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Image Name and Size Display */}
      <div className="text-md absolute left-4 bottom-4 bg-gray-800 bg-opacity-60 p-2 text-white rounded">
        {file.name} ({file.size})
      </div>
    </section>
  );
}
