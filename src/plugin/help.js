import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}
// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const test = async (m, Matrix) => {
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;
  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
     // console.log(selectedListId);
    }
  }
  const selectedId = selectedListId || selectedButtonId;
  
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
       
       const mode = config.MODE === 'public' ? 'public' : 'private';
       const pref = config.PREFIX;
           
        const validCommands = ['list', 'help', 'menu'];

  if (validCommands.includes(cmd)) {
    let msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `╔━━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━┈◌
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️ 𝘽𝙤𝙩 𝙣𝙖𝙢𝙚 
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️ 𝙊𝙬𝙣𝙚𝙧:
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️ 𝙉𝙪𝙢𝙗𝙚𝙧:⁩ 
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️ 𝙋𝙡𝙖𝙩𝙛𝙤𝙧𝙢: ${os.platform}
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️ ⁩𝙈𝙤𝙙𝙚: ${mode}
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️ 𝙋𝙧𝙚𝙛𝙞𝙭:⁩ ${pref}
╚═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━┈◌
 `
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʏᴜɴᴀ-ᴍᴅ"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./src/ethix.jpg')}, { upload: Matrix.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false  
                }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "👨‍💻OWNER",
            id: `${prefix}owner`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "📡PING",
            id: `${prefix}ping`
          })
        },
                {
                  "name": "single_select",
                  "buttonParamsJson": `{"title":"✨𝑺𝑬𝑳𝑬𝑪𝑻 𝑴𝑬𝑵𝑼",
                 "sections":
                   [{
                    "title":"🧚𝙔𝙐𝙉𝘼-𝙈𝘿 𝘼𝙡𝙡 𝙈𝙚𝙣𝙪",
                    "highlight_label":"✻ ᗩᒪᒪ ᗰEᑎᑌ",
                    "rows":[
                      {
                       "header":"",
                       "title":"🧚𝘈𝘓𝘓 𝘔𝘌𝘕𝘜",
                       "description":"◄◆𝚈𝚄𝙽𝙰-𝙼𝙳 𝙰𝙻𝙻 𝙼𝙴𝙽𝚄◆►",
                       "id":"View All Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋 𝘔𝘌𝘕𝘜📩",
                        "description":"◄◆𝚈𝚄𝙽𝙰-𝙼𝙳 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂◆►",
                        "id":"Downloader Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘎𝘙𝘖𝘜𝘗 𝘔𝘌𝘕𝘜",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝙶𝚁𝙾𝚄𝙿 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Group Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘛𝘖𝘖𝘓 𝘔𝘌𝘕𝘜🧰",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝚃𝙾𝙾𝙻 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Tool Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘔𝘈𝘐𝘕 𝘔𝘌𝘕𝘜🗿",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝙼𝙰𝙸𝙽 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Main Menu"
                      },
                     {
                        "header":"",
                        "title":"🧚𝘖𝘞𝘕𝘌𝘙 𝘔𝘌𝘕𝘜👨‍💻",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝙾𝚆𝙽𝙴𝚁 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Owner Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘈𝘐 𝘔𝘌𝘕𝘜🤖",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝙰𝙸 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Ai Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘚𝘌𝘈𝘙𝘊𝘏 𝘔𝘌𝘕𝘜🔍",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝚂𝙴𝙰𝚁𝙲𝙷 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Search Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘚𝘛𝘈𝘓𝘒 𝘔𝘌𝘕𝘜 ⛃",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝚂𝚃𝙰𝙻𝙺 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Stalk Menu"
                      },
                      {
                        "header":"",
                        "title":"🧚𝘊𝘖𝘕𝘝𝘌𝘙𝘛𝘌𝘙 𝘔𝘌𝘕𝘜♲",
                        "description":"◄◆ 𝚈𝚄𝙽𝙰-𝙼𝙳 𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 ◆►",
                        "id":"Converter Menu"
                      }
                    ]}
                  ]}`
                },
              ],
            }),
            contextInfo: {
                  quotedMessage: m.message,
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
          }),
        },
      },
    }, {});

    await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
  }
      if (selectedId == "View All Menu") {
        const str = `hey ${m.pushName} ${pushwish}

╔━━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━┈◌
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│ 𝘽𝙤𝙩 𝙣𝙖𝙢𝙚 
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│ 𝙊𝙬𝙣𝙚𝙧: 
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│ 𝙉𝙪𝙢𝙗𝙚𝙧:⁩ 
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│ 𝙋𝙡𝙖𝙩𝙛𝙤𝙧𝙢: ${os.platform}
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│ ⁩𝙈𝙤𝙙𝙚: ${mode}
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│ 𝙋𝙧𝙚𝙛𝙞𝙭:⁩ ${pref}
║└──────────────

$readmore

╠╦•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ✨⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━┈◌
┋║ླ 𖥾ᤢ۪ꪶ👨‍💻『𝗢𝗪𝗡𝗘𝗥』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💫⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙹𝚘𝚒𝚗
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙻𝚎𝚊𝚟𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙱𝚕𝚘𝚌𝚔
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚄𝚗𝚋𝚕𝚘𝚌𝚔
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠
║  └──────────────
%readmore
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ⛃『𝗦𝗧𝗔𝗟𝗞』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💥⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ🤖『𝗔𝗜』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🚀⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}gpt
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}dalle
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}bug
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}remini
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}gemini
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}report
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ🧰『𝗧𝗢𝗢𝗟』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💥⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}calculater
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}tempmail
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}trt
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}tts
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ♲『𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗘𝗥』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💉⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}attp
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}attp2
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}attp3
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}ebinary
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}dbinary
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}mp3
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}emojimix
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ👯‍♂️『𝗚𝗥𝗢𝗨𝗣』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ⸱ᨗᨗᨗ✨ꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚂𝚎𝚝𝚙𝚙𝚐𝚌
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚂𝚎𝚝𝚍𝚎𝚜𝚌
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚛𝚘𝚞𝚙
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚌𝚜𝚎𝚝𝚝𝚒𝚗𝚐
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚆𝚎𝚕𝚌𝚘𝚖𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚍𝚍
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙺𝚒𝚌𝚔
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙷𝚒𝚍𝚎𝚃𝚊𝚐
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚃𝚊𝚐𝚊𝚕𝚕
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙿𝚛𝚘𝚖𝚘𝚝𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙳𝚎𝚖𝚘𝚝𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚎𝚝𝚋𝚒𝚘
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ📩『𝗗𝗢𝗨𝗡𝗟𝗢𝗔𝗗』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💙⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙰𝚙𝚔
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚍𝚛𝚒𝚟𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙸𝚗𝚜𝚝𝚊
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚈𝚝𝚖𝚙3
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚈𝚝𝚖𝚙4
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙿𝚕𝚊𝚢
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚂𝚘𝚗𝚐
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚅𝚒𝚍𝚎𝚘
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚃𝚒𝚔𝚝𝚘𝚔
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ🔍『𝗦𝗘𝗔𝗥𝗖𝗛』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🚲⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙿𝚕𝚊𝚢
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚈𝚝𝚜
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙸𝚖𝚍𝚋
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚘𝚘𝚐𝚕𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙶𝚒𝚖𝚊𝚐𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}𝙻𝚢𝚛𝚒𝚌𝚜
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ🗡『𝗠𝗔𝗜𝗡』
╠╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💙⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
║   ┌──────────────
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}ping
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}alive
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}owner
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}infobot
ꦽꦁ☘〬°⃟᮪݇⃟⃟🧚‍♀️│${prefix}menu
║  └──────────────
╠╦═•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ🛸⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
┋║ླ 𖥾ᤢ۪ꪶ𝘾𝙍𝙀𝘼𝙏𝙀𝘿 𝘽𝙔 𝙈𝙍.𝙉𝘼𝘿𝙐𝙉』
╚╩═━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💖⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━┈◌

   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `Ethix-MD`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'Ethix-MD'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: { 
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: fgg
});
}
   if ( selectedId == "Downloader Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯━╮
┃✰ ${prefix}𝙰𝚙𝚔
┃✰ ${prefix}𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
┃✰ ${prefix}𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
┃✰ ${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
┃✰ ${prefix}𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
┃✰ ${prefix}𝙶𝚍𝚛𝚒𝚟𝚎
┃✰ ${prefix}𝙸𝚗𝚜𝚝𝚊
┃✰ ${prefix}𝚈𝚝𝚖𝚙3
┃✰ ${prefix}𝚈𝚝𝚖𝚙4
┃✰ ${prefix}𝙿𝚕𝚊𝚢
┃✰ ${prefix}𝚂𝚘𝚗𝚐
┃✰ ${prefix}𝚅𝚒𝚍𝚎𝚘
┃✰ ${prefix}𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
┃✰ ${prefix}𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
┃✰ ${prefix}𝚃𝚒𝚔𝚝𝚘𝚔
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if ( selectedId == "Group Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙶𝚁𝙾𝚄𝙿 ❯━╮
┃✰ ${prefix}𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
┃✰ ${prefix}𝚂𝚎𝚝𝚙𝚙𝚐𝚌
┃✰ ${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎
┃✰ ${prefix}𝚂𝚎𝚝𝚍𝚎𝚜𝚌
┃✰ ${prefix}𝙶𝚛𝚘𝚞𝚙
┃✰ ${prefix}𝚆𝚎𝚕𝚌𝚘𝚖𝚎
┃✰ ${prefix}𝙰𝚍𝚍
┃✰ ${prefix}𝙺𝚒𝚌𝚔
┃✰ ${prefix}𝙷𝚒𝚍𝚎𝚃𝚊𝚐
┃✰ ${prefix}𝚃𝚊𝚐𝚊𝚕𝚕
┃✰ ${prefix}𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
┃✰ ${prefix}𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
┃✰ ${prefix}𝙿𝚛𝚘𝚖𝚘𝚝𝚎
┃✰ ${prefix}𝙳𝚎𝚖𝚘𝚝𝚎
┃✰ ${prefix}𝙶𝚎𝚝𝚋𝚒𝚘
╰━━━━━━━━━━━━━━━⪼
     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Main Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙼𝙰𝙸𝙽 ❯━╮
┃✰ ${prefix}𝙿𝚒𝚗𝚐
┃✰ ${prefix}𝙰𝚕𝚒𝚟𝚎
┃✰ ${prefix}𝙾𝚠𝚗𝚎𝚛
┃✰ ${prefix}𝙼𝚎𝚗𝚞
┃✰ ${prefix}𝙸𝚗𝚏𝚘𝚋𝚘𝚝
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Owner Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙾𝚆𝙽𝙴𝚁 ❯━╮
┃✰ ${prefix}𝙹𝚘𝚒𝚗
┃✰ ${prefix}𝙻𝚎𝚊𝚟𝚎
┃✰ ${prefix}𝙱𝚕𝚘𝚌𝚔
┃✰ ${prefix}𝚄𝚗𝚋𝚕𝚘𝚌𝚔
┃✰ ${prefix}𝙱𝚌𝚐𝚛𝚘𝚞𝚙
┃✰ ${prefix}𝙱𝚌𝚊𝚕𝚕
┃✰ ${prefix}𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
┃✰ ${prefix}𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
┃✰ ${prefix}𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
┃✰ ${prefix}𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
┃✰ ${prefix}𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
┃✰ ${prefix}𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
┃✰ ${prefix}𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
┃✰ ${prefix}𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Search Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝚂𝙴𝙰𝚁𝙲𝙷 ❯━╮
┃✰ ${prefix}𝙿𝚕𝚊𝚢
┃✰ ${prefix}𝚈𝚝𝚜
┃✰ ${prefix}𝙸𝚖𝚍𝚋
┃✰ ${prefix}𝙶𝚘𝚘𝚐𝚕𝚎
┃✰ ${prefix}𝙶𝚒𝚖𝚊𝚐𝚎
┃✰ ${prefix}𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
┃✰ ${prefix}𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
┃✰ ${prefix}𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
┃✰ ${prefix}𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
┃✰ ${prefix}𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
┃✰ ${prefix}𝙻𝚢𝚛𝚒𝚌𝚜
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   if (selectedId == "Stalk Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝚂𝚃𝙰𝙻𝙺 ❯━╮
┃✰ ${prefix}𝙽𝚘𝚠𝚊
┃✰ ${prefix}𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
┃✰ ${prefix}𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
┃✰ ${prefix}𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Tool Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝚃𝙾𝙾𝙻 ❯━╮
┃✰ ${prefix}𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
┃✰ ${prefix}𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
┃✰ ${prefix}𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
┃✰ ${prefix}𝙸𝚗𝚏𝚘
┃✰ ${prefix}𝚃𝚛𝚝
┃✰ ${prefix}𝚃𝚝𝚜
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Ai Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙰𝙸 ❯━╮
┃✰ ${prefix}𝙰𝚒
┃✰ ${prefix}𝙱𝚞𝚐
┃✰ ${prefix}𝚁𝚎𝚙𝚘𝚛𝚝
┃✰ ${prefix}𝙶𝚙𝚝
┃✰ ${prefix}𝙳𝚊𝚕𝚕𝚎
┃✰ ${prefix}𝚁𝚎𝚖𝚒𝚗𝚒
┃✰ ${prefix}𝙶𝚎𝚖𝚒𝚗𝚒
╰━━━━━━━━━━━━━━━⪼`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Converter Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
│➥ 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
│➥ 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}
╰━━━━━━━━━━━━━━━➥
╭━❮ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ❯━╮
┃✰ ${prefix}𝙰𝚃𝚃𝙿
┃✰ ${prefix}𝙰𝚃𝚃𝙿2
┃✰ ${prefix}𝙰𝚃𝚃𝙿3
┃✰ ${prefix}𝙴𝙱𝙸𝙽𝙰𝚁𝚈
┃✰ ${prefix}𝙳𝙱𝙸𝙽𝙰𝚁𝚈
┃✰ ${prefix}𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
┃✰ ${prefix}𝙼𝙿3
╰━━━━━━━━━━━━━━━⪼
     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/ethix.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363249960769123@newsletter',
                  newsletterName: "Ethix-MD",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
};

export default test;
