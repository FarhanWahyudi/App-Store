import Sidebar from '@/components/fragment/Sidebar';
import { faCartFlatbedSuitcase, faChartColumn } from '@fortawesome/free-solid-svg-icons';
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
  ];
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
}
