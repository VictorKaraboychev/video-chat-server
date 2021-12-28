import { Server, Socket } from "socket.io"
import { CONSTANTS } from "./config/global";
import { randomBytes } from "crypto";

const server = new Server(CONSTANTS.port,{
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	}
})

console.log("SERVER STARTED")

server.on("connection", (socket: Socket) => {
	console.debug(`client ${socket.id} connected`)

	socket.emit('client-id', socket.id)	

	socket.on('room-id', (roomId: string) => {
		if (roomId) {
			console.log(roomId)
		} else {
			const generatedRoomId = randomBytes(Math.floor(CONSTANTS.roomIdLength / 2)).toString('hex')
			console.log(generatedRoomId)
			socket.emit('room-id', generatedRoomId)
		}
	})

	socket.on('ice-candidate', (iceCandidateJSON) => {

	})



	socket.on('disconnect', (reason) => {
		console.debug(`client disconnected due to ${reason}`)
	})
})