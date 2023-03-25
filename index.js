const config = require("./config.json");
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
client.on("ready", () => {
  console.log(`Bot wystartował`);
});
client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!weryfikacjapanel")) {
    const perms = new MessageEmbed()
      .setTitle(`Nie posiadasz permisji!`)
      .setDescription(
        `Nie posiadasz permisji do tej komendy!\n**Tylko role** <@&${config.permissionrolecommand}> mogą używać tej komendy!`
      )
      .setThumbnail(`https://i.imgur.com/vmOVQQA.png`)
      .setColor(config.color)
      .setFooter(config.footer, config.footericon);
    if (!message.member.roles.cache.has(config.permissionrolecommand)) {
      return message.reply({ embeds: [perms] });
    }
    const weryfikacja = new MessageButton()
      .setCustomId(`weryfikacja`)
      .setLabel(`✅・Weryfikacja`)
      .setStyle(`DANGER`);
    const row = new MessageActionRow().addComponents([weryfikacja]);
    const weryfikacjaembed = new MessageEmbed()
      .setTitle("Weryfikacja!")
      .setDescription("**Aby Się Zweryfikować** kliknij przycisk poniżej!")
      .setColor(config.color)
      .setFooter(config.footer, config.footericon);
    const m = await message.channel.send({
      embeds: [weryfikacjaembed],
      components: [row],
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === `weryfikacja`) {
    const weryfikacja2 = new MessageEmbed()
      .setTitle("Gratulacje!")
      .setDescription("**Zostałeś** pomyślnie zweryfikowany!")
      .setThumbnail("https://i.imgur.com/BpBp4pq.png")
      .setColor(config.color)
      .setFooter(config.footer, config.footericon);
    interaction.member.roles.add(config.weryfikacjarola);
    interaction.reply({ embeds: [weryfikacja2], ephemeral: true });
  }
});
client.login(config.token);
