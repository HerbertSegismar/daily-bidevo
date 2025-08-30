// src/contexts/BibleVersionContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface BibleVersionContextType {
  bibleVersion: string;
  setBibleVersion: (version: string) => void;
}

const BibleVersionContext = createContext<BibleVersionContextType | undefined>(
  undefined
);

export const useBibleVersion = () => {
  const context = useContext(BibleVersionContext);
  if (context === undefined) {
    throw new Error(
      "useBibleVersion must be used within a BibleVersionProvider"
    );
  }
  return context;
};

interface BibleVersionProviderProps {
  children: React.ReactNode;
}

export const BibleVersionProvider: React.FC<BibleVersionProviderProps> = ({
  children,
}) => {
  const [bibleVersion, setBibleVersion] = useState(() => {
    return localStorage.getItem("bibleVersion") || "NIV";
  });

  useEffect(() => {
    localStorage.setItem("bibleVersion", bibleVersion);
  }, [bibleVersion]);

  return (
    <BibleVersionContext.Provider value={{ bibleVersion, setBibleVersion }}>
      {children}
    </BibleVersionContext.Provider>
  );
};
