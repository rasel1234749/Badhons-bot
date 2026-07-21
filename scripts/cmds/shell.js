const { GoatWrapper } = require("fca-liane-utils");
const { exec } = require('child_process');

module.exports = {
  config: {
    name: "shell",
    version: "1.0",
    author: "BADHON BEBZ",
    role: 2,
    shortDescription: "𝙴𝚡𝚎𝚌𝚞𝚝𝚎 𝚜𝚑𝚎𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜",
    category: "shell",
    guide: "{p}{n} <command>",
    aliases: ["sh"]
  },

  onStart: function ({ args, message, event }) {
    if (event.senderID !== "61552294572455") {
      return message.reply("🚫 𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳");
    }
    
    const cmd = args.join(" ");
    if (!cmd) return message.reply("📝 𝙴𝚗𝚝𝚎𝚛 𝚌𝚘𝚖𝚖𝚊𝚗𝚍");
    
    exec(cmd, (e, out, err) => {
      const response = e ? "❌ " + e.message : err ? "⚠ " + err : "✅ " + (out || "𝙲𝚘𝚖𝚖𝚊𝚗𝚍 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍");
      message.reply(response);
    });
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
