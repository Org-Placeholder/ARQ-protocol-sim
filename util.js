import {
	FRAME_TYPES,
	MAX_PACKET_LENGTH,
	CORRUPTION_PROBABLITY,
	LOSS_PROBABLITY,
} from "./const.js";
var message = "";
export const to_physical_layer = (socket, frame) => {
	if (Math.random() < CORRUPTION_PROBABLITY) {
		frame.kind = FRAME_TYPES.DAMAGED;
	}
	console.log("[PHYSICAL LAYER]".green + " Sending frame :");
	console.log(frame);
	if (Math.random() > LOSS_PROBABLITY) {
		socket.emit("message", frame);
	} else {
		console.log("[PHYSICAL LAYER]".green + " Frame lost");
	}
};

export const from_physical_layer = (data) => {
	var frame = data; //initialize it by parsing data
	console.log("[PHYSICAL LAYER]".green + " Received frame :");
	console.log(frame);
	return frame;
};

export const from_network_layer = (array, index) => {
	return array[index]; //return the required packet
};

export const to_network_layer = (data) => {
	console.log("[NETWORK LAYER]".yellow + " Received Data : ", data);
	message = message.concat(data);
};

export const print_message = () => {
	console.log("[NETWORK LAYER]".yellow + " Total data Received : " + message);
};

export const construct_packet_array = (message) => {
	const packet_array = [];
	var str = "";
	for (let i = 0; i < message.length; i++) {
		str = str.concat(message[i]);
		if (str.length == MAX_PACKET_LENGTH) {
			packet_array.push(str);
			str = "";
		}
	}
	console.log(
		"[NETWORK LAYER]".yellow + " The packet array to be sent is : "
	);
	console.log(packet_array);
	return packet_array;
};

export const construct_frame = (packet, seq_no, kind) => {
	const frame = { info: packet, seq_no: seq_no, kind: kind };
	return frame;
};
