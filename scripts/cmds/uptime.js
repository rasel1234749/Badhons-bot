module.exports = {
  config: {
    name: "uptime",
    author: "Badhon",
    aliases: ["up"],
    category: "system",
    role: 0,
    usage: "uptime",
    description: "Shows how long the bot has been running."
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    const totalSeconds = process.uptime();
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const msg =
      `╭───「 ⏱️ UPTIME 」\n` +
      `│ 📅 Days    : ${days}\n` +
      `│ 🕐 Hours   : ${hours}\n` +
      `│ 🕑 Minutes : ${minutes}\n` +
      `│ 🕒 Seconds : ${seconds}\n` +
      `╰────────────────`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
