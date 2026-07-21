module.exports = {
  config: {
    name: "ping",
    author: "Badhon",
    aliases: [],
    category: "system",
    role: 0,
    usage: "ping",
    description: "Checks the bot's response time."
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;
    const start = Date.now();

    const sent = await api.sendMessage("🏓 Pinging...", threadID);
    const ping = Date.now() - start;

    const msg =
      `╭───「 🏓 PONG 」\n` +
      `│ ⚡ Speed : ${ping}ms\n` +
      `╰────────────────`;

    return api.editMessage(msg, sent.messageID);
  }
};
