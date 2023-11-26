import { useState, useContext, createContext } from "react";

const AudioContext = createContext();
export const useAudioContext = () => useContext(AudioContext);

export default function AudioProvider({ children }) {
  const [player, setPlayer] = useState(null);

  return (
      <AudioContext.Provider
        value={{
          player,
          setPlayer,
        }}
      >
        {children}
      </AudioContext.Provider>
  );
}
