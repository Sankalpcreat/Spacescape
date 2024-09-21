import { ThreeDots } from "react-loader-spinner";
import { FaDownload } from "react-icons/fa";
import { ImageAreaProps } from "@/types";

type ImageOutputProps = ImageAreaProps & {
  loading: boolean;
  outputImage: string | null;
  downloadOutputImage(): void;
};

export function ImageOutput({
  loading,
  outputImage,
  downloadOutputImage,
  title = "Drag 'n drop your image here or click to upload",
}: ImageOutputProps) {
  return (
    <section className="relative min-h-[450px] w-full rounded-lg border-2 border-dashed border-gray-300 bg-[#fefaf3] p-12 text-center transition-all duration-300 ease-in-out hover:border-gray-400">
      <div className="relative block h-full w-full">
        {/* Loading State */}
        {!outputImage && loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <ThreeDots
              height="80"
              width="80"
              color="#ccc"
              ariaLabel="three-dots-loading"
              visible={loading}
            />
            <span className="mt-4 block text-sm font-semibold text-gray-400">
              Processing the output image
            </span>
          </div>
        ) : null}

        {/* Initial State (No Output and No Loading) */}
        {!outputImage && !loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/images/jugger.png"  // Path to the image in the public folder
              alt="Output icon"
              className="mx-auto h-60 w-60 object-contain"  // Full coverage for initial state
            />
            <span className="mt-4 block text-lg font-semibold text-gray-600">
              {title}
            </span>
            <span className="mt-1 text-sm text-gray-500">
        
            </span>
          </div>
        ) : null}

        {/* Display Output Image */}
        {!loading && outputImage ? (
          <img
            src={outputImage}
            alt="output"
            className="h-full w-full object-cover rounded-lg"  // Ensure full height and width coverage
          />
        ) : null}
      </div>

      {/* Download Button */}
      {!loading && outputImage ? (
        <button
          onClick={downloadOutputImage}
          className="group absolute right-4 top-4 bg-yellow-500 p-3 rounded-full text-black hover:bg-yellow-600"
        >
          <FaDownload className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </button>
      ) : null}
    </section>
  );
}
