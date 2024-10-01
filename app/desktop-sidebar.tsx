import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FolderOpen, Settings, HelpCircle, Home, LogOut, DollarSign } from "lucide-react";
import Link from "next/link";
import { classNames } from "@/utils";
import { signOut } from "next-auth/react";

export function DesktopSidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const extendedNavigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'Help & Support', href: '/help', icon: HelpCircle },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <aside
      className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 text-white transition-all duration-300 ${
        isHovered ? 'lg:w-72' : 'lg:w-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6">
        {/* Header Section */}
        <div className="flex h-16 shrink-0 items-center justify-between mb-8">
          <h1
            className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 transition-all duration-300 ${
              isHovered ? 'block' : 'hidden'
            }`}
          >
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
                        "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-300"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      <span className={`${isHovered ? 'block' : 'hidden'} transition-all duration-300`}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          {/* Logout Button */}
          <div className="border-t border-white/20 pt-6">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-white/10 transition-all duration-300"
            >
              <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className={`${isHovered ? 'block' : 'hidden'} transition-all duration-300`}>
                Logout
              </span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
