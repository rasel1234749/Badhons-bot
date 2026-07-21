module.exports = {
  config: {
    name: "groupinfo",
    author: "Badhon",
    aliases: ["gcinfo", "gi"],
    category: "group",
    role: 0,
    usage: "groupinfo",
    description: "Shows information about the current group thread."
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    const info = await api.getThreadInfo(threadID);

    const msg =
      `╭───「 👥 GROUP INFO 」\n` +
      `│ 🏷️ Name       : ${info.threadName || "Unnamed group"}\n` +
      `│ 🆔 Thread ID  : ${threadID}\n` +
      `│ 👤 Members    : ${info.participantIDs?.length || 0}\n` +
      `│ 👑 Admins     : ${info.adminIDs?.length || 0}\n` +
      `│ 🎨 Emoji      : ${info.emoji || "default"}\n` +
      `│ 📅 Created    : ${info.threadCreated ? new Date(info.threadCreated).toDateString() : "unknown"}\n` +
      `╰────────────────`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
