module.exports = {
  config: {
    name: "mute",
    author: "Badhon",
    aliases: [],
    category: "group",
    role: 1,
    usage: "mute [minutes] | mute -r",
    description: "Mutes or unmutes the group chat."
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    const isUnmute = args[0] === "-r" || args[0] === "unmute";

    if (isUnmute) {
      await api.changeGroupSetting(threadID, "muted", false);
      return api.sendMessage("🔊 Group chat unmuted.", threadID, messageID);
    }

    const minutes = parseInt(args[0]) || 0;
    const seconds = minutes > 0 ? minutes * 60 : -1;

    await api.changeGroupSetting(threadID, "muted", true, seconds);

    const msg = minutes > 0
      ? `🔇 Group chat muted for ${minutes} minute(s).`
      : `🔇 Group chat muted indefinitely.`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
