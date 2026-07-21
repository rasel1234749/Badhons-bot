module.exports = {
  config: {
    name: "restart",
    author: "Badhon",
    aliases: ["reboot"],
    category: "owner",
    role: 2,
    usage: "restart",
    description: "Restarts the bot process."
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    await api.sendMessage("♻️ Restarting bot, please wait...", threadID, messageID);

    process.on("exit", () => {
      require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit"
      });
    });

    process.exit();
  }
};
