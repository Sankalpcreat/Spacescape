import { ListBulletIcon, HomeIcon } from '@heroicons/react/24/outline';
import { NavItem } from '@/types'; // Ensure this path is correct

// Define the navigation array
export const navigation: Array<NavItem> = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'History', href: '/history', icon: ListBulletIcon },
];
