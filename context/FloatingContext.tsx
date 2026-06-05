"use client";

import { createContext, useContext, useState } from "react";

type FloatingContextType = {
  openVisitorModal: () => void;
  closeVisitorModal: () => void;
  isVisitorModalOpen: boolean;
};

const FloatingContext = createContext<FloatingContextType>({
  openVisitorModal: () => {},
  closeVisitorModal: () => {},
  isVisitorModalOpen: false,
});

export function FloatingProvider({ children }: { children: React.ReactNode }) {
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);

  return (
    <FloatingContext.Provider
      value={{
        openVisitorModal: () => setIsVisitorModalOpen(true),
        closeVisitorModal: () => setIsVisitorModalOpen(false),
        isVisitorModalOpen,
      }}
    >
      {children}
    </FloatingContext.Provider>
  );
}

export function useFloating() {
  return useContext(FloatingContext);
}
