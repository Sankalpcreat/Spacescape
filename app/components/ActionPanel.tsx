import { Wand2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button"; // Ensure this path is correct
import { ThreeDots } from "react-loader-spinner";

type ActionPanelProps = {
  isLoading: boolean;
  submitImage(): void;
};

export function ActionPanel({ isLoading, submitImage }: ActionPanelProps) {
  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden rounded-xl shadow-2xl">
      {/* Background Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-0"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Upload a photo or image
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl">
            Upload an image of a room, and let our AI generate a beautiful design tailored to your preferences.
          </p>

          <Button
            disabled={isLoading}
            onClick={submitImage}
            className={`flex items-center justify-center bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              isLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isLoading ? (
              <>
                <ThreeDots height="20" width="30" color="#6B46C1" ariaLabel="three-dots-loading" />
                <span className="ml-2 text-purple-600">Processing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6 mr-2 text-purple-600" />
                <span>Design this room</span>
              </>
            )}
          </Button>
        </div>

        <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4">
          <Sparkles className="w-48 h-48 text-pink-300 opacity-50" />
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gray-50 p-8 md:p-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Upload", description: "Share a photo of your room" },
            { title: "Analyze", description: "AI examines your space and preferences" },
            { title: "Generate", description: "Receive a design within minutes" },
            { title: "Refine", description: "Explore and customize your new layout" }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4 shadow-md">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
