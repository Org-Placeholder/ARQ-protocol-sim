import {
	from_network_layer,
	to_physical_layer,
	from_physical_layer,
	construct_packet_array,
	construct_frame,
} from "./util.js";
import { TIMEOUT_LENGTH, FRAME_TYPES } from "./const.js";
import require from "requirejs";
const io = require("socket.io-client");
var packet_array = [];
var packet_index = 0;
var timer;
var socket;
const send = (ip, port) => {
	socket = io.connect("http://" + ip + ":" + port, { reconnect: true });
	socket.on("connect_error", (err) => {
		console.log("[GENERAL]".magenta + "Connection unsucessful : " + err);
		process.exit();
	});

	socket.on("message", (data) => {
		var frame = from_physical_layer(data);
		handle_event(frame);
	});
	socket.on("connect", (socket) => {
		send_current_frame();
	});
};

const send_current_frame = () => {
	var packet = from_network_layer(packet_array, packet_index);
	var frame = construct_frame(packet, packet_index%2, FRAME_TYPES.INFO);
	to_physical_layer(socket, frame);
	timer = setTimeout(() => {
		console.log("[DATA LINK LAYER]".blue + " Timer timed out, resending");
		send_current_frame();
	}, TIMEOUT_LENGTH);
};

const handle_event = (frame) => {
	if (frame.kind != FRAME_TYPES.ACK) {
		console.log(
			"[DATA LINK LAYER]".blue + " Damaged frame received, ignored"
		);
	} else {
		if (frame.seq_no == packet_index%2) {
			packet_index++;
			clearTimeout(timer);
			if (packet_index < packet_array.length) {
				send_current_frame();
			} else {
				socket.disconnect();
				process.exit();
			}
		} else {
			console.log(
				"[DATA LINK LAYER]".blue +
					" Out of order acknowledgement received, ignored"
			);
		}
	}
};

var args = process.argv;
if (args.length < 5) {
	console.log("usage : node sender.js [IP] [PORT] [MESSAGE]");
	process.exit();
}
const ip = args[2];
const port = args[3];
const message = args[4];

packet_array = construct_packet_array(message);
send(ip, port);
