import Dropzone, { FileRejection } from "react-dropzone";

const acceptedFileTypes = {
  "image/jpeg": [".jpeg", ".jpg", ".png"],
};

const maxFileSize = 5 * 1024 * 1024; // 5MB

type ImageDropzoneProps = {
  onImageDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]): void;
  title?: string;
};

export function ImageDropzone({
  onImageDrop,
  title = "Drop files to upload",
}: ImageDropzoneProps) {
  return (
    <Dropzone
      onDrop={onImageDrop}
      accept={acceptedFileTypes}
      maxSize={maxFileSize}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <>
          <input {...getInputProps()} />
          <div
            {...getRootProps()}
            className={`relative flex flex-col items-center justify-center min-h-[400px] w-full rounded-lg border-2 p-12 text-center transition-all duration-300 ease-in-out shadow-sm ${
              isDragReject
                ? "border-red-500 bg-red-50"
                : isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-dashed border-gray-300 bg-[#fefaf3] hover:border-gray-400" // Matching background color
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <img
              src="/images/jugger.png"  // Use the same image
              alt="Upload icon"
              className="mx-auto h-60 w-60 object-contain" // Larger image size
            />
            <span className="mt-8 block text-lg font-semibold text-gray-600">
              {isDragActive
                ? "Drop your files here"
                : isDragReject
                ? "Unsupported file type"
                : title}
            </span>
            <span className="mt-3 block text-sm text-gray-400">
              or <span className="text-purple-500 cursor-pointer">browse</span>{" "}
              to choose a file
            </span>
          </div>
        </>
      )}
    </Dropzone>
  );
}
