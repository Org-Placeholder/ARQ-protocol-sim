import {
	from_network_layer,
	to_physical_layer,
	from_physical_layer,
	construct_packet_array,
	construct_frame,
} from "./util.js";
import { TIMEOUT_LENGTH, frame_types } from "./const.js";
import require from "requirejs";
const io = require("socket.io-client");
var packet_array = [];
var packet_index = 0;
var timer;
var socket;
const send = (ip, port) => {
	socket = io("http://" + ip + ":" + toString(port));
	socket.on("connect_error", (err) => {
		console.log("Connection unsucessful : " + err);
		process.exit();
	});
	send_current_frame();
	socket.on("message", (data) => {
		var frame = from_physical_layer(data);
		handle_event(frame);
	});
};

const send_current_frame = () => {
	var packet = from_network_layer(packet_array, packet_index);
	var frame = construct_frame(packet, packet_index % 2, frame_types.ACK);
	to_physical_layer(socket, frame);
	timer = setTimeout(() => {
		console.log("Timer timed out, resending");
		send_current_frame();
	}, TIMEOUT_LENGTH);
};

const handle_event = (frame) => {
	if (frame.kind != frame_types.ACK) {
		console.log("Damaged frame received, doing nothing");
	} else {
		if (frame.seq_no == packet_index % 2) {
			packet_index++;
			clearTimeout(timer);
			if (packet_index < packet_array.length) {
				send_current_frame();
			}
		} else {
			console.log("Out of order acknowledgement received, ignored");
		}
	}
};

var args = process.argv;
if (args.length < 5) {
	console.log("node sender.js [ip,port,packet]");
}
const ip = args[2];
const port = args[3];
const message = args[4];
packet_array = construct_packet_array(message);

send(ip, port);
