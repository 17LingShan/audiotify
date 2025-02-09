import "@/styles/app.css";
import WSView from "@/components/WSView";
import OptionButtonsGroup from "@/components/OptionButtonsGroup";

function App() {
  return (
    <>
      <div id="wrap">
        <div className="buttons-group">
          <OptionButtonsGroup />
        </div>
        <div className="ws-view">
          <WSView />
        </div>
      </div>
    </>
  );
}

export default App;
