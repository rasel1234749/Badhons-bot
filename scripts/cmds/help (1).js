module.exports = {
  config: {
    name: "help",
    author: "Badhon",
    aliases: ["h", "cmds", "commands"],
    category: "system",
    role: 0,
    usage: "help [command name] | help -e [event name]",
    description: "Shows all commands, all event files, or details about one of them."
  },

  onStart: async function ({ api, event, args, commands, eventCommands, getPrefix }) {
    const { threadID, messageID } = event;
    const prefix = getPrefix(threadID);

    const isEventMode = args[0] === "-e";
    const target = isEventMode ? args[1] : args[0];
    const list = isEventMode ? eventCommands : commands;
    const listLabel = isEventMode ? "EVENT" : "COMMAND";

    if (!list || list.size === 0) {
      return api.sendMessage(
        `⚠️ No ${listLabel.toLowerCase()} files are currently loaded.`,
        threadID, messageID
      );
    }

    if (target) {
      const name = target.toLowerCase();
      const found = list.get(name) ||
        [...list.values()].find(c => c.config?.aliases?.includes(name));

      if (!found) {
        return api.sendMessage(
          `❌ ${listLabel} "${target}" not found.`,
          threadID, messageID
        );
      }

      const { name: cName, author, aliases, category, usage, description } = found.config || {};

      const detail =
        `╭───「 ${(cName || "unknown").toUpperCase()} 」\n` +
        `│ 🏷️ Name       : ${cName || "unknown"}\n` +
        `│ 📁 Category   : ${category || "uncategorized"}\n` +
        `│ 👤 Author     : ${author || "unknown"}\n` +
        `│ 🔗 Aliases    : ${aliases?.length ? aliases.join(", ") : "none"}\n` +
        `│ ⚙️ Usage      : ${usage ? prefix + usage : "N/A"}\n` +
        `│ 📝 Description: ${description || "No description."}\n` +
        `╰────────────────`;

      return api.sendMessage(detail, threadID, messageID);
    }

    const categories = {};
    for (const item of list.values()) {
      const cfg = item.config || {};
      const cat = (cfg.category && cfg.category.trim()) ? cfg.category.toUpperCase() : "UNCATEGORIZED";
      const itemName = cfg.name || "unnamed";

      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(itemName);
    }

    let msg = `╭───「 📖 ${listLabel} LIST 」\n`;
    for (const cat of Object.keys(categories).sort()) {
      msg += `│\n│ ▸ ${cat}\n`;
      msg += `│   ${categories[cat].sort().join(", ")}\n`;
    }
    msg += `│\n╰────────────────\n`;
    msg += `📌 Total: ${list.size} ${listLabel.toLowerCase()}s\n`;
    msg += isEventMode
      ? `💡 Type ${prefix}help -e <event name> for details.`
      : `💡 Type ${prefix}help <command name> for details.\n💡 Type ${prefix}help -e to see event files.`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
