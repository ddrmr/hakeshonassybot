const moment = require('moment');
const { onMessage } = require('../src/actions');
const { sendTestMessage, createMockedSlimbot } = require('./lib/sendMessageHelper');

const { describeDBSetupTeardown } = require('./lib/dbHelper');

describeDBSetupTeardown();
moment.locale('ru');

describe('sticker packer', () => {
  test('sticker packer', async () => {
    const slimbot = createMockedSlimbot((chatId, text) => {
      expect(text).toMatch('*user1* - стикерпакер (юзает 2 стикерпака)');
    });

    await sendTestMessage({
      userId: 1, firstName: 'user1', date: 1591866060, type: 'sticker',
    }, onMessage, slimbot, { setName: 'Pojelaniepchelki' });
    await sendTestMessage({
      userId: 1, firstName: 'user1', date: 1591866060, type: 'sticker',
    }, onMessage, slimbot, { setName: 'ultrarjombav2' });

    await sendTestMessage({
      userId: 2, firstName: 'user2', date: 1591866060, type: 'sticker',
    }, onMessage, slimbot, { setName: 'ultrarjombav2' });

    await sendTestMessage({
      userId: 2, firstName: 'user2', date: 1591866060, type: 'sticker',
    }, onMessage, slimbot, { setName: 'ultrarjombav2' });

    await sendTestMessage({
      userId: 2, firstName: 'user2', date: 1591866060, type: 'sticker',
    }, onMessage, slimbot, { setName: 'ultrarjombav2' });

    const statMessage = {
      chat: {
        id: 1,
      },
      date: 1592222400,
      text: '/stats',
      entities: [{ type: 'bot_command' }],
    };

    await onMessage(slimbot, statMessage);
  });

  test('sticker packer one message', async () => {
    const slimbot = createMockedSlimbot((chatId, text) => {
      expect(text).toMatch('*user1* - стикерпакер (юзает 1 стикерпак)');
    });

    await sendTestMessage({
      userId: 1, firstName: 'user1', date: 1591866060, type: 'sticker',
    }, onMessage, slimbot, { setName: 'Pojelaniepchelki' });

    const statMessage = {
      chat: {
        id: 1,
      },
      date: 1592222400,
      text: '/stats',
      entities: [{ type: 'bot_command' }],
    };

    await onMessage(slimbot, statMessage);
  });
});
