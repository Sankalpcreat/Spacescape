import { Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import { FolderOpen, Settings, Home, LogOut, DollarSign } from "lucide-react";
import { classNames } from "@/utils";
import Link from "next/link";
import { signOut } from "next-auth/react"; // Import signOut from next-auth/react

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen(open: boolean): void;
};

export function MobileSidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathName = usePathname(); // Get the current path
  const router = useRouter(); // Use useRouter for navigation

  const extendedNavigation = [
    { name: 'Home', href: '/home', icon: FolderOpen },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Pricing', href: '/pricing', icon: DollarSign },
    { name: 'Logout', href: '#', icon: LogOut }, // Logout option
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out without redirecting
    router.push('/'); // Redirect to home page after signing out
  };

  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              {/* Sidebar component */}
              <aside className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 px-6 pb-2 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <h1 className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-xl font-semibold text-transparent">
                    SpaceScape
                  </h1>
                </div>

                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {extendedNavigation.map((item) => (
                          <li key={item.name}>
                            {item.name === 'Logout' ? (
  <button
    onClick={handleLogout}
    className={classNames(
      pathName === item.href
        ? "bg-white/20 text-white" // Active style
        : "text-gray-400 hover:bg-transparent hover:text-white", // Remove green and use transparent background
      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-300 w-full text-left"
    )}
  >
    <item.icon className="h-5 w-5 shrink-0 mr-2" aria-hidden="true" />
    {item.name}
  </button>
) : (
  <Link
    href={item.href}
    className={classNames(
      pathName === item.href
        ? "bg-white/20 text-white"
        : "text-gray-400 hover:bg-white/10 hover:text-white",
      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-300"
    )}
  >
    <item.icon className="h-5 w-5 shrink-0 mr-2" aria-hidden="true" />
    {item.name}
  </Link>
)}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </aside>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
