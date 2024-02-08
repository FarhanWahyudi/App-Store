import React, { useEffect, useRef } from 'react';

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: any }) {
  const modalRef: any = useRef();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-full h-screen bg-black/30 z-10">
      <div ref={modalRef} className="w-2/4 p-8 bg-white">
        {children}
      </div>
    </div>
  );
}
