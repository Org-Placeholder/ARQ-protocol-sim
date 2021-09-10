import {
	from_physical_layer,
	to_network_layer,
	to_physical_layer,
	construct_frame,
	print_message,
} from "./util.js";
import { frame_types } from "./const.js";
import require from "requirejs";

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var socket;
var exp_seq_no = 0;

const recieve = (io, port) => {
	server.listen(port, () =>
		console.log("[GENERAL]".magenta + " server listening on port:" + port)
	);

	io.on("connection", (s) => {
		socket = s;
		console.log("[GENERAL]".magenta + "sender connected");
		socket.on("message", (data) => {
			handle_event(data);
		});
		socket.on("disconnect", () => {
			print_message();
			process.exit();
		});
	});
};

const handle_event = (data) => {
	var frame = from_physical_layer(data);

	if (frame.kind != frame_types.INFO) {
		console.log(
			"[DATA LINK LAYER]".blue + " Damaged frame received, doing nothing"
		);
	} else {
		if (frame.seq_no != exp_seq_no) {
			console.log(
				"[DATA LINK LAYER]".blue +
					" Out of order frame received, sending ACK and discarding"
			);
		} else {
			to_network_layer(frame.info);
			exp_seq_no++;
		}
		var ack_frame = construct_frame(
			frame.info,
			frame.seq_no,
			frame_types.ACK
		);
		to_physical_layer(socket, ack_frame);
	}
};

var args = process.argv;
if (args.length < 3) {
	console.log("node receiver.js [port]");
	process.exit();
}
const port = args[2];

recieve(io, port);
