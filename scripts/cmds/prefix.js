module.exports = {
  config: {
    name: "prefix",
    author: "Badhon",
    aliases: [],
    category: "system",
    role: 0,
    usage: "prefix [new prefix]",
    description: "Shows or changes the bot's prefix for this group."
  },

  onStart: async function ({ api, event, args, getPrefix, threadsData, role }) {
    const { threadID, messageID } = event;
    const currentPrefix = getPrefix(threadID);

    if (!args[0]) {
      const msg =
        `╭───「 🔧 PREFIX 」\n` +
        `│ Current prefix: ${currentPrefix}\n` +
        `╰────────────────`;

      return api.sendMessage(msg, threadID, messageID);
    }

    if (role < 1) {
      return api.sendMessage("❌ Only group admins or the bot owner can change the prefix.", threadID, messageID);
    }

    const newPrefix = args[0];
    await threadsData.set(threadID, newPrefix, "data.prefix");

    return api.sendMessage(`✅ Prefix changed to: ${newPrefix}`, threadID, messageID);
  }
};
