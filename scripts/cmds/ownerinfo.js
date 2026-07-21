module.exports = {
  config: {
    name: "ownerinfo",
    author: "Badhon",
    aliases: ["owner", "botowner"],
    category: "system",
    role: 0,
    usage: "ownerinfo",
    description: "Shows information about the bot owner."
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    const owner = {
      name: "Badhon",
      facebook: "https://facebook.com/yourprofile",
      phone: "N/A",
      email: "N/A",
      country: "Bangladesh"
    };

    const msg =
      `╭───「 👑 OWNER INFO 」\n` +
      `│ 🏷️ Name    : ${owner.name}\n` +
      `│ 🌍 Country : ${owner.country}\n` +
      `│ 📘 Facebook: ${owner.facebook}\n` +
      `│ 📞 Phone   : ${owner.phone}\n` +
      `│ 📧 Email   : ${owner.email}\n` +
      `╰────────────────`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
