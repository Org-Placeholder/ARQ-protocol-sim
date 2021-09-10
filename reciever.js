import {
	from_physical_layer,
	to_network_layer,
	to_physical_layer,
} from "./util.js";
import { frame_types } from "./const.js";
import require from "requirejs";

const http = require("http").createServer();
const io = require("socket.io")(http);
var exp_seq_no = 0;

const recieve = (io, port) => {
	http.listen(port, () => console.log(`server listening on port: ${port}`));

	io.on("connection", (socket) => {
		console.log("sender connected");
		socket.on("message", (data) => {
			handle_event(data);
		});
	});

	io.on("disconnect", (evt) => {
		console.log("sender disconnected");
	});
};

const handle_event = (data) => {
	var frame = from_physical_layer(data);

	if (frame.kind != frame_types.INFO) {
		console.log("Damaged frame received, ignored");
	} else {
		if (frame.seq_no != exp_seq_no) {
			console.log(
				"Out of order frame received, sending ACK and discarding"
			);
		} else {
			to_network_layer(frame.info);
		}
		ack_frame = construct_frame("", frame.seq_no, frame_types.ACK);
		to_physical_layer(io.socket, ack_frame);
	}
	// handle data
	// agar packet type barabar hoga toh to_network_layer recieved info and then to_physical_layer ack
	// agar packet type gadbad hua toh console.log("recieved corrupted packet")
};

var args = process.argv;
if (args.length < 3) {
	console.log("node receiver.js [port]");
	process.exit();
}
const port = args[2];

recieve(io, port);
