import {
	frame_types,
	MAX_PACKET_LENGTH,
	CORRUPTION_PROBABLITY,
	DELAY_MIN,
	DELAY_MAX,
} from "./const.js";
export const to_physical_layer = (socket, frame) => {
	//preprocess frame if needed, maybe randomize the error and also delay
	console.log("Physical layer sending : \n");
	console.log(frame);
	if (Math.random() < CORRUPTION_PROBABLITY) {
		frame.kind = frame_types.DAMAGED;
	}
	var delay = DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN);
	setTimeout(() => {
		socket.emit("message", frame);
	}, delay);
};

//use from_physical_layer to parse the data and return the json
export const from_physical_layer = (data) => {
	var frame = data; //initialize it by parsing data
	return frame;
};

//from_network_layer kya krega exactly apne simulation mei woh doubtful
export const from_network_layer = (array, index) => {
	return array[index]; //return the required packet
};

export const to_network_layer = (data) => {
	console.log("Network layer recieved : ", data);
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
	console.log(packet_array);
	return packet_array;
};

export const construct_frame = (packet, seq_no, kind) => {
	const frame = { info: packet, seq_no: seq_no, kind: kind };
	return frame;
};
