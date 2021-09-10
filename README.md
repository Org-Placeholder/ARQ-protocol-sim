# Automatic Repeat ReQuest Simulator

This simulates a stop and wait ARQ protocol with modifiable simulation constraints.

### Setup instructions

- Install nodeJS
- Run `npm install` in the directory. This will install all the required modules.

### Usage instructions

- For **Reciever** : Run `node reciever.js [port]` eg - `node reciever.js 3000`
- For **Sender** : Run `node sender.js [ip] [port] [message]` eg - `node sender.js 127.0.0.1 3000 Hello_World`

### More information

- All logs are prepended by **[LAYER_NAME]** which shows which layer is logging the information.
- Delays are simulated with randomization. Minimum and maximum delays can be changed by modifying the `DELAY_MIN` and `DELAY_MAX` constants in `const.js`.
- Frame damage is simulated by just making the type **DAMAGED**. The probability for this can be changed by modifying the `CORRUPTION_PROBABILITY` in `const.js`.
