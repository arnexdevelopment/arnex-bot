const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const { createTicket, closeTicket } = require('../systems/tickets');
const { sendLog } = require('../systems/logs');
module.exports = { name: Events.InteractionCreate, async execute(interaction, client){
  try {
    if(interaction.isChatInputCommand()){
      const command = client.commands.get(interaction.commandName);
      if(!command) return;
      return await command.execute(interaction, client);
    }
    if(interaction.isStringSelectMenu() && interaction.customId === 'ticket_select'){
      await interaction.deferReply({ ephemeral: true });
      const channel = await createTicket(interaction, interaction.values[0]);
      return interaction.editReply(`Ticket created: ${channel}`);
    }
    if(interaction.isButton()){
      if(interaction.customId === 'verify_button'){
        const roleId = config.roles.memberRoleId;
        if(!roleId || roleId.includes('_ID')) return interaction.reply({ content: 'Member role is not configured.', ephemeral: true });
        await interaction.member.roles.add(roleId);
        await sendLog(interaction.guild, 'User Verified', `${interaction.user} verified.`);
        return interaction.reply({ content: 'You are now verified.', ephemeral: true });
      }
      if(interaction.customId === 'ticket_close') return closeTicket(interaction);
      if(interaction.customId === 'order_modal_open'){
        const modal = new ModalBuilder().setCustomId('order_modal').setTitle('Create Order');
        const service = new TextInputBuilder().setCustomId('service').setLabel('Service type').setPlaceholder('Website / Discord Bot / FiveM / UI / Bug Fix').setStyle(TextInputStyle.Short).setRequired(true).setMaxLength(80);
        const budget = new TextInputBuilder().setCustomId('budget').setLabel('Budget').setPlaceholder('Example: 20€').setStyle(TextInputStyle.Short).setRequired(true).setMaxLength(40);
        const deadline = new TextInputBuilder().setCustomId('deadline').setLabel('Deadline').setPlaceholder('Example: 7 days').setStyle(TextInputStyle.Short).setRequired(true).setMaxLength(60);
        const description = new TextInputBuilder().setCustomId('description').setLabel('Project description').setStyle(TextInputStyle.Paragraph).setRequired(true).setMaxLength(1000);
        modal.addComponents(new ActionRowBuilder().addComponents(service), new ActionRowBuilder().addComponents(budget), new ActionRowBuilder().addComponents(deadline), new ActionRowBuilder().addComponents(description));
        return interaction.showModal(modal);
      }
    }
    if(interaction.isModalSubmit() && interaction.customId === 'order_modal'){
      await interaction.deferReply({ ephemeral: true });
      const service = interaction.fields.getTextInputValue('service');
      const budget = interaction.fields.getTextInputValue('budget');
      const deadline = interaction.fields.getTextInputValue('deadline');
      const description = interaction.fields.getTextInputValue('description');
      const channel = await createTicket(interaction, 'other', { service, budget, deadline, description });
      const embed = new EmbedBuilder().setColor(config.embedColor).setTitle('New Order Details').addFields(
        { name: 'Service', value: service.slice(0, 1024), inline: true },
        { name: 'Budget', value: budget.slice(0, 1024), inline: true },
        { name: 'Deadline', value: deadline.slice(0, 1024), inline: true },
        { name: 'Description', value: description.slice(0, 1024) }
      ).setTimestamp();
      await channel.send({ embeds: [embed] });
      await sendLog(interaction.guild, 'New Order', `${interaction.user} created an order in ${channel}.`);
      return interaction.editReply(`Order ticket created: ${channel}`);
    }
  } catch(err){
    console.error(err);
    const payload = { content: 'Something went wrong while processing this interaction.', ephemeral: true };
    if(interaction.deferred || interaction.replied) return interaction.editReply(payload).catch(() => null);
    return interaction.reply(payload).catch(() => null);
  }
}};
