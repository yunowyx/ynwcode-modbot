const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bir kullanıcıyı sunucudan yasaklar.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Yasaklanacak kullanıcı')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Yasaklama sebebi')),

    new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Bir kullanıcıyı sunucudan atar.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Atılacak kullanıcı')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Atma sebebi')),

    new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Bir kullanıcıyı susturur.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('Susturulacak kullanıcı')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Susturma sebebi')),
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Slash komutları kaydediliyor...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Slash komutları başarıyla kaydedildi!');
    } catch (error) {
        console.error(error);
    }
})();
