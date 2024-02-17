const NodeMediaServer = require("node-media-server");

const videoPath = "live.mp4"; // Ganti dengan path file MP4 Anda
const skey = "q211-6v5d-e9q5-1zwy-7hsd"; // Ganti dengan string skey Anda
const rtmpUrl = "rtmp://a.rtmp.youtube.com/live2"; // Ganti dengan URL RTMP Anda

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  relay: {
    ffmpeg: "ffmpeg/bin/ffmpeg.exe",
    tasks: [
      {
        app: "live",
        mode: "push",
        edge: `${rtmpUrl}/${skey}`,
        name: "test",
        // rtsp_transport: "tcp", //['udp', 'tcp', 'udp_multicast', 'http']
      },
    ],
  },
};

var nms = new NodeMediaServer(config);
nms.run();
