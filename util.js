import {
	frame_types,
	MAX_PACKET_LENGTH,
	CORRUPTION_PROBABLITY,
	DELAY_MIN,
	DELAY_MAX,
} from "./const.js";
var message = "";
export const to_physical_layer = (socket, frame) => {
	if (Math.random() < CORRUPTION_PROBABLITY) {
		frame.kind = frame_types.DAMAGED;
	}
	console.log("[PHYSICAL LAYER] Sending frame:");
	console.log(frame);
	var delay = DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN);
	setTimeout(() => {
		socket.emit("message", frame);
	}, delay);
};

export const from_physical_layer = (data) => {
	var frame = data; //initialize it by parsing data
	console.log("[PHYSICAL LAYER] Received frame:");
	console.log(frame);
	return frame;
};

export const from_network_layer = (array, index) => {
	return array[index]; //return the required packet
};

export const to_network_layer = (data) => {
	console.log("[NETWORK LAYER] Received Data: ", data);
	message = message.concat(data);
};

export const print_message = () => {
	console.log("[NETWORK LAYER] Data Received : " + message);
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
		"[NETWORK LAYER] The packet array to be sent is : " + packet_array
	);
	return packet_array;
};

export const construct_frame = (packet, seq_no, kind) => {
	const frame = { info: packet, seq_no: seq_no, kind: kind };
	return frame;
};
