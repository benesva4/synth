import React, { useReducer, useEffect, useRef } from "react";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";

function reducer(state, action) {
  switch (action.type) {
    case "play":
      return { volume: 0.4 };
    case "stop":
      return { volume: 0 };
    default:
      return state;
  }
}

function createAudioStuffAndGetVolumeController() {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  oscillator.start();
  oscillator.connect(gainNode).connect(audioContext.destination);
  return (volume) =>
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
}

export function Synthesizer() {
  const [state, dispatch] = useReducer(reducer, { volume: 0 });
  const { current: setVolume } = useRef(
    createAudioStuffAndGetVolumeController()
  );

  useEffect(() => {
    setVolume(state.volume);
  }, [state.volume, setVolume]);

  return (
    <>
      <button
        onClick={() =>
          dispatch(state.volume ? { type: "stop" } : { type: "play" })
        }
      >
        {state.volume ? "Shut the fuck up omg" : "Make very unpleasant sound"}
      </button>

      <CircularInput value={state.volume} onChange={() => {}}>
        <CircularTrack />
        <CircularProgress />
        <CircularThumb />
      </CircularInput>
    </>
  );
}
