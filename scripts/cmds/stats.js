module.exports = {
  config: {
    name: "stats",
    author: "Badhon",
    aliases: ["sysinfo", "system"],
    category: "system",
    role: 0,
    usage: "stats",
    description: "Shows bot system statistics."
  },

  onStart: async function ({ api, event, commands, eventCommands }) {
    const { threadID, messageID } = event;
    const os = require("os");

    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    const usedMem = (totalMem - freeMem).toFixed(2);

    const totalSeconds = process.uptime();
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const msg =
      `╭───「 📊 SYSTEM STATS 」\n` +
      `│ 💻 Platform : ${os.platform()}\n` +
      `│ 🧠 CPU      : ${os.cpus()[0]?.model || "unknown"}\n` +
      `│ 📦 RAM      : ${usedMem}GB / ${totalMem}GB\n` +
      `│ ⏱️ Uptime   : ${hours}h ${minutes}m\n` +
      `│ 📜 Commands : ${commands?.size || 0}\n` +
      `│ 🎯 Events   : ${eventCommands?.size || 0}\n` +
      `│ 🟢 Node.js  : ${process.version}\n` +
      `╰────────────────`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
