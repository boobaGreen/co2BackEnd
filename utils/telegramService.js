const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({ path: './config.env' });
const { TELEGRAM_BOT_TOKEN } = process.env;

const getUserGroups = async (userId) => {
  try {
    const updatesUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    const updatesResponse = await axios.get(updatesUrl);
    console.log('updatesResponse:', updatesResponse.data);
    const updates = updatesResponse.data.result;
    console.log('updates:', updates);
    const groups = [];

    updates.forEach(async (update) => {
      if (
        update.message &&
        update.message.chat &&
        ['group', 'supergroup'].includes(update.message.chat.type)
      ) {
        const chatId = update.message.chat.id;
        const memberUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember?chat_id=${chatId}&user_id=${userId}`;
        const memberResponse = await axios.get(memberUrl);
        console.log('memberResponse:', memberResponse.data);

        if (memberResponse.data.ok) {
          const { status } = memberResponse.data.result;
          if (status === 'member' || status === 'administrator') {
            groups.push({
              chat_id: chatId,
              title: update.message.chat.title,
              status: status,
            });
          }
        }
      }
    });
    console.log('groups:', groups);
    return groups;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw new Error('Failed to fetch user groups');
  }
};

module.exports = { getUserGroups };
