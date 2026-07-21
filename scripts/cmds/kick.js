module.exports = {
  config: {
    name: "kick",
    author: "Badhon",
    aliases: [],
    category: "group",
    role: 1,
    usage: "kick [reply/mention/uid]",
    description: "Removes a member from the group."
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID, messageReply, mentions, senderID } = event;

    let targetID;

    if (messageReply) {
      targetID = messageReply.senderID;
    } else if (mentions && Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
    } else if (args[0] && /^\d+$/.test(args[0])) {
      targetID = args[0];
    }

    if (!targetID) {
      return api.sendMessage(
        "⚠️ Reply, mention, or provide a UID of the member to kick.",
        threadID, messageID
      );
    }

    if (targetID === senderID) {
      return api.sendMessage("❌ You can't kick yourself.", threadID, messageID);
    }

    if (targetID === api.getCurrentUserID()) {
      return api.sendMessage("❌ I can't kick myself.", threadID, messageID);
    }

    try {
      await api.removeUserFromGroup(targetID, threadID);
      return api.sendMessage("✅ Member removed from the group.", threadID, messageID);
    } catch (err) {
      return api.sendMessage("❌ Failed to remove member. I may not have admin rights.", threadID, messageID);
    }
  }
};
