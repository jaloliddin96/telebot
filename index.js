const { Telegraf } = require('telegraf');
const ytdl = require('ytdl-core');

// Telegram bot tokenini quyidagi joyga yozing
const bot = new Telegraf('6423918580:AAFeRqCgZk_Hl8XyeHs1mihWGjGHEVRKb0U');

// /start komandasi uchun
bot.start((ctx) => {
  ctx.reply('Assalomu alaykum! YouTube linkini yuboring, video yuklash uchun tayyorman.');
});

// YouTube linkini qabul qilish uchun
bot.on('text', async (ctx) => {
  const youtubeUrl = ctx.message.text;
  try {
    // Youtubedan video haqida ma'lumot olish
    const info = await ytdl.getInfo(youtubeUrl);
    const videoTitle = info.videoDetails.title;
    const videoStream = ytdl(youtubeUrl, { filter: 'audioonly' });

    // Video nomini va streamni yuborish
    ctx.reply(`Yuklanmoqda: ${videoTitle}`);
    ctx.replyWithAudio({ source: videoStream });
  } catch (error) {
    console.error(error);
    ctx.reply('Xatolik yuz berdi. Iltimos, togri YouTube linkini yuboring.');
  }
});

// Botni ishga tushirish
bot.launch().then(() => {
  console.log('Bot ishga tushirildi');
});
