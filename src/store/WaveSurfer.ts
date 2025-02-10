import WaveSurfer from "wavesurfer.js";
import { makeAutoObservable } from "mobx";
import song from "@/1.mp3";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.js";

class WaveSurferStoreClass {
  container: HTMLElement | null = null;
  WaveSurfer: WaveSurfer | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  startTime: number = 0;
  totalTime: number = 0;
  hoverTime: number = 0;
  audioUrl: string = song;

  constructor() {
    makeAutoObservable(this);
    // 在window中执行resize方法时, this指向window
    this.resize = this.resize.bind(this);
  }

  initialize(container: HTMLElement) {
    if (!container) return;
    this.WaveSurfer?.destroy();

    const topTimeline = TimelinePlugin.create({
      insertPosition: "beforebegin",
      timeInterval: 1,
      primaryLabelInterval: 5,
      style: {
        fontSize: "10px",
        color: "#767c7c",
        backgroundColor: "#111111",
      },
    });

    const zoom = ZoomPlugin.create({ scale: 0.5, maxZoom: 100 });

    this.WaveSurfer = WaveSurfer.create({
      container: container,
      fillParent: true,
      height: (window.innerHeight - 160) * 0.5, // 每条波形的高度
      waveColor: "#99c2c6",
      cursorColor: "#ff8c35",
      sampleRate: 44100,
      progressColor: "#6e7e80",
      barHeight: 0.9,
      hideScrollbar: true,
      url: this.audioUrl,
      splitChannels: [{}, {}],
      plugins: [topTimeline, zoom],
    });

    this.WaveSurfer.on("ready", () => {
      this.setTotalTime(this.WaveSurfer?.getDuration() || 0);
      this.container = container;
      this.container.addEventListener("mousemove", (event) => {
        // 计算当前可视区域的时间长度
        const rect = this.container!.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const duration = this.WaveSurfer!.getDuration();
        const width = this.container!.clientWidth;
        this.setHoverTime((mouseX / width) * duration);
      });
    });

    this.WaveSurfer.on("timeupdate", (currentTime) => {
      this.setCurrentTime(currentTime);
    });

    window.addEventListener("resize", this.resize);
  }

  resize() {
    console.log("resize");
    this.WaveSurfer?.setOptions({
      height: (window.innerHeight - 160) * 0.5,
    });
  }

  destroy() {
    window.removeEventListener("resize", this.resize);
    this.WaveSurfer?.destroy();
    this.WaveSurfer = null;
  }

  play() {
    this.WaveSurfer && this.WaveSurfer.play();
  }
  pause() {
    this.WaveSurfer && this.WaveSurfer.pause();
  }
  toggle() {
    this.WaveSurfer && this.WaveSurfer.playPause();
  }

  setCurrentTime(time: number) {
    this.currentTime = time;
  }
  setTotalTime(time: number) {
    this.totalTime = time;
  }
  setHoverTime(time: number) {
    this.hoverTime = time;
  }
  setAudioUrl(url: string) {
    this.audioUrl = url;
  }

  loadLocalFile() {
    this.pause();

    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "audio/*");
    input.setAttribute("class", "input-file");
    input.addEventListener("cancel", () => {
      input.parentNode?.removeChild(input);
      input.onchange = null;
    });
    input.addEventListener("change", () => {
      const file = input.files?.[0]!;

      if (file && this.container) {
        const url = URL.createObjectURL(file);
        URL.revokeObjectURL(this.audioUrl); // clear local file url
        this.setAudioUrl(url);
        this.initialize(this.container);
      }

      input.parentNode?.removeChild(input);
      input.onchange = null;
    });
    document.body.appendChild(input);
    input.click();
  }
}

const WaveSurferStore = new WaveSurferStoreClass();
export default WaveSurferStore;
