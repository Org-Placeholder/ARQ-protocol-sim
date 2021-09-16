import require from "requirejs";
const colors = require("colors");

export const FRAME_TYPES = {
	ACK: "ack",
	INFO: "info",
	DAMAGED: "damaged",
};

export const MAX_PACKET_LENGTH = 1;

export const TIMEOUT_LENGTH = 110;

export const CORRUPTION_PROBABLITY = 0.1;

export const LOSS_PROBABLITY = 0.2;
