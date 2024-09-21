import { usePathname } from "next/navigation";
import { FolderOpen, Settings, HelpCircle, Home } from "lucide-react"; // Import icons for the navigation items
import Link from "next/link";
import { classNames } from "@/utils"; // Ensure you have a classNames utility

export function DesktopSidebar() {
  const pathName = usePathname(); // Get the current path

  // Define your navigation items
  const extendedNavigation = [
    { name: 'Home', href: '/', icon: Home }, // Home Icon from lucide-react
    { name: 'Projects', href: '/projects', icon: FolderOpen }, // Projects link with FolderOpen icon
    { name: 'Settings', href: '/settings', icon: Settings }, // Settings link with Settings icon
    { name: 'Help & Support', href: '/help', icon: HelpCircle }, // Help & Support with HelpCircle icon
  ];

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6">
        
        {/* Header Section */}
        <div className="flex h-16 shrink-0 items-center justify-between mb-8">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            SpaceScape
          </h1>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {extendedNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={classNames(
                        pathName === item.href
                          ? "bg-white/20 text-white"
                          : "text-gray-400 hover:bg-white/10 hover:text-white",
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-300"
                      )}
                    >
                      {/* Render the Icon and Name */}
                      <item.icon className="h-5 w-5 shrink-0 mr-2" aria-hidden="true" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
