const { Client, GatewayIntentBits, SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
    console.log(`${client.user.tag} giriş yaptı!`);
});

// Slash komutlarını işle
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'ban') {
        const member = options.getMember('user');
        const reason = options.getString('reason') || 'Sebep belirtilmedi';
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.', ephemeral: true });
        }
        if (!member.bannable) {
            return interaction.reply({ content: 'Bu kullanıcıyı banlayamıyorum.', ephemeral: true });
        }
        await member.ban({ reason });
        await interaction.reply(`${member.user.tag} yasaklandı. Sebep: ${reason}`);
    }

    if (commandName === 'kick') {
        const member = options.getMember('user');
        const reason = options.getString('reason') || 'Sebep belirtilmedi';
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.', ephemeral: true });
        }
        if (!member.kickable) {
            return interaction.reply({ content: 'Bu kullanıcıyı sunucudan atamıyorum.', ephemeral: true });
        }
        await member.kick(reason);
        await interaction.reply(`${member.user.tag} sunucudan atıldı. Sebep: ${reason}`);
    }

    if (commandName === 'mute') {
        const member = options.getMember('user');
        const reason = options.getString('reason') || 'Sebep belirtilmedi';
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return interaction.reply('`Muted` rolü bulunamadı. Lütfen sunucuda bir Muted rolü oluşturun.');
        }
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için gerekli yetkiye sahip değilsiniz.', ephemeral: true });
        }
        if (member.roles.cache.has(muteRole.id)) {
            return interaction.reply(`${member.user.tag} zaten susturulmuş.`);
        }
        await member.roles.add(muteRole);
        await interaction.reply(`${member.user.tag} susturuldu. Sebep: ${reason}`);
    }
});

client.login(config.token);
