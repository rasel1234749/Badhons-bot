module.exports = {
  config: {
    name: "uid",
    author: "Badhon",
    aliases: ["id"],
    category: "system",
    role: 0,
    usage: "uid [reply/mention]",
    description: "Gets your Facebook UID or the UID of a mentioned/replied user."
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID, messageReply, senderID, mentions } = event;

    let targetID = senderID;

    if (messageReply) {
      targetID = messageReply.senderID;
    } else if (mentions && Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
    }

    const msg =
      `╭───「 🆔 UID 」\n` +
      `│ ${targetID}\n` +
      `╰────────────────`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
