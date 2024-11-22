import socketIO from "socket.io-client";
const socket = socketIO(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
});

export default socket;
