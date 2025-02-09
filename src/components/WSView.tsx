import { observer } from "mobx-react";
import { useEffect, useRef } from "react";
import WaveSurferStore from "@/store/WaveSurfer";

function WSView() {
  const waveSurferRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waveSurferRef.current) return;
    WaveSurferStore.initialize(waveSurferRef.current);
    return () => {
      WaveSurferStore.destroy();
    };
  }, []);

  return (
    <>
      <div ref={waveSurferRef} id="wavesurfer-wrap"></div>
    </>
  );
}

export default observer(WSView);
