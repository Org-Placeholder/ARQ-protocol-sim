import require from "requirejs";
const colors = require("colors");

export const FRAME_TYPES = {
	ACK: "ack",
	INFO: "info",
	DAMAGED: "damaged",
};

export const MAX_PACKET_LENGTH = 1;

export const TIMEOUT_LENGTH = 100;

export const CORRUPTION_PROBABLITY = 0.1;

export const DELAY_MIN = 0;

export const DELAY_MAX = 300;
