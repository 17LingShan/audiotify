export function formatTime(originTime: number): string {
  // 计算分钟,秒,毫秒
  const minutes = Math.floor(originTime / 60);
  const secs = Math.floor(originTime % 60);
  const milliseconds = Math.floor((originTime - Math.floor(originTime)) * 1000);

  // 格式化分钟、秒和毫秒, 补零到两位数
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(3, "0");

  // 组合成 分钟:秒:毫秒 格式
  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}
