module.exports = {
  config: {
    name: "tid",
    author: "Badhon",
    aliases: ["threadid"],
    category: "system",
    role: 0,
    usage: "tid",
    description: "Gets the current thread ID."
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    const msg =
      `╭───「 🧵 THREAD ID 」\n` +
      `│ ${threadID}\n` +
      `╰────────────────`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
