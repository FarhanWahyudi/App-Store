import Sidebar from '@/components/fragment/Sidebar';
import { faCartFlatbedSuitcase, faChartColumn, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const listSidebarItem = [
    {
      title: 'Dashboard',
      link: '/admin',
      icon: faChartColumn,
    },
    {
      title: 'Products',
      link: '/admin/products',
      icon: faCartFlatbedSuitcase,
    },
    {
      title: 'Users',
      link: '/admin/users',
      icon: faUserGroup,
    },
  ];
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full">{children}</div>
    </div>
  );
}
