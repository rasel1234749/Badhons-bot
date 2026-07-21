module.exports = {
  config: {
    name: "ban",
    author: "Badhon",
    aliases: ["banuser"],
    category: "owner",
    role: 2,
    usage: "ban [reply/uid] [reason] | ban -r [reply/uid]",
    description: "Bans or unbans a user from using the bot."
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { threadID, messageID, messageReply, senderID } = event;

    const isUnban = args[0] === "-r" || args[0] === "unban";
    if (isUnban) args.shift();

    let targetID;
    let reason = args.join(" ");

    if (messageReply) {
      targetID = messageReply.senderID;
    } else if (args[0] && /^\d+$/.test(args[0])) {
      targetID = args[0];
      reason = args.slice(1).join(" ");
    }

    if (!targetID) {
      return api.sendMessage(
        "⚠️ Reply to a message or provide a UID.\nUsage:\nban [reply/uid] [reason]\nban -r [reply/uid]",
        threadID, messageID
      );
    }

    if (isUnban) {
      await usersData.set(targetID, { banned: false, banReason: "" }, undefined, "banned");

      const msg =
        `╭───「 ✅ USER UNBANNED 」\n` +
        `│ 🆔 UID : ${targetID}\n` +
        `╰────────────────`;

      return api.sendMessage(msg, threadID, messageID);
    }

    if (targetID === senderID) {
      return api.sendMessage("❌ You can't ban yourself.", threadID, messageID);
    }

    await usersData.set(targetID, { banned: true, banReason: reason || "No reason provided" }, undefined, "banned");

    const msg =
      `╭───「 🚫 USER BANNED 」\n` +
      `│ 🆔 UID    : ${targetID}\n` +
      `│ 📝 Reason : ${reason || "No reason provided"}\n` +
      `╰────────────────`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
