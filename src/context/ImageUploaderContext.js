import React, { createContext, useContext, useState } from "react";

const ImageUploaderContext = createContext();

export function ImageUploaderProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return <ImageUploaderContext.Provider value={{ isOpen, setIsOpen }}>{children}</ImageUploaderContext.Provider>;
}

export function useImageUploaderContext() {
  return useContext(ImageUploaderContext);
}
