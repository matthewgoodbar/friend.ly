import io from "socket.io-client"

let socket;
if (process.env.NODE_ENV === "production") {
    socket = io()
} else {
    socket = io("http://localhost:5001", {
        transports: ['websocket']
    })
}

export default socket