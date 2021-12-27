import { Server as SocketServer, Socket } from "socket.io"
import { CONSTANTS } from "./config/global";

const server = new SocketServer(CONSTANTS.port);

server.on("connection", (socket: Socket) => {
	console.debug(`client ${socket.id} connected`)



	socket.on('disconnect', (reason) => {
		console.debug(`client disconnected due to ${reason}`)
	})
})