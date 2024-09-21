import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link"; // Ensure Link is imported

type HeaderProps = {
  onClick(): void;
};

export function Header({ onClick }: HeaderProps) {
  const pathName = usePathname();

  return (
    <header className="sticky top-0 z-40 flex items-center gap-x-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        onClick={onClick}
        aria-label="Open sidebar"
        tabIndex={0}
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 text-sm font-semibold leading-6 text-white">
        {/* Link to Home with active path indication */}
        <Link href="/" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white">
          Home
        </Link>
      </div>
      <div className="text-gray-400">
        {/* Display current path */}
        {pathName === "/" ? "Home" : `Current Path: ${pathName}`}
      </div>
    </header>
  );
}
