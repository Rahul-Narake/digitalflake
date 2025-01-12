import { Box, House, LayoutDashboard, LayoutList } from 'lucide-react';
import React from 'react';
import SidebarComponent from './SidebarComponent';

export type TSidebarComponent = {
  id: number;
  name: string;
  icon: React.ReactNode;
  path: string;
};

const sidebarList: TSidebarComponent[] = [
  { id: 1, name: 'Home', icon: <House />, path: '/' },
  { id: 2, name: 'Category', icon: <LayoutDashboard />, path: '/category' },
  { id: 3, name: 'Subcategory', icon: <LayoutList />, path: '/subcategory' },
  { id: 4, name: 'Products', icon: <Box />, path: '/products' },
];

function Sidebar() {
  return (
    <div className="flex flex-col space-y-6">
      {sidebarList.map((c) => (
        <SidebarComponent data={c} key={c.id} />
      ))}
    </div>
  );
}

export default Sidebar;
