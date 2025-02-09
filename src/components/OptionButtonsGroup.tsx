import { observer } from "mobx-react";
import { formatTime } from "@/utils/common";
import WaveSurferStore from "@/store/WaveSurfer";

function OptionButtonsGroup() {
  return (
    <>
      <div style={{ height: "100%" }}>
        <button onClick={() => WaveSurferStore.loadLocalFile()}>
          load local file
        </button>
        <button onClick={() => WaveSurferStore.play()}>play</button>
        <button onClick={() => WaveSurferStore.pause()}>pause</button>
        <button onClick={() => WaveSurferStore.toggle()}>toggle</button>
        <div>currentTime:{formatTime(WaveSurferStore.currentTime)}</div>
        <div>totalTime:{formatTime(WaveSurferStore.totalTime)}</div>
        <div>hoverTime:{formatTime(WaveSurferStore.hoverTime)}</div>
      </div>
    </>
  );
}

export default observer(OptionButtonsGroup);
