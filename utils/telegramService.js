const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config({ path: './config.env' });
const { TELEGRAM_BOT_TOKEN } = process.env;

const getUserGroups = async (userId) => {
  try {
    const updatesUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    const updatesResponse = await axios.get(updatesUrl);
    const updates = updatesResponse.data.result;

    const groups = [];
    const memberRequests = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const update of updates) {
      if (
        update.message &&
        update.message.chat &&
        ['group', 'supergroup'].includes(update.message.chat.type)
      ) {
        const chatId = update.message.chat.id;
        const memberUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember?chat_id=${chatId}&user_id=${userId}`;
        memberRequests.push(axios.get(memberUrl));
      }
    }

    const memberResponses = await Promise.all(memberRequests);

    memberResponses.forEach((memberResponse, index) => {
      const update = updates[index];
      if (memberResponse.data.ok) {
        const { status } = memberResponse.data.result;
        if (status === 'member' || status === 'administrator') {
          groups.push({
            chat_id: update.message.chat.id,
            title: update.message.chat.title,
            status: status,
          });
        }
      }
    });

    return groups;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw new Error('Failed to fetch user groups');
  }
};

module.exports = { getUserGroups };
