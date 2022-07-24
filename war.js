var express = require('express');
var app = express();
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js'); 
const client = new Client({
	puppeteer: {
        executablePath: '/bin/chromium',
    },
	authStrategy: new LocalAuth({
		clientId: "client-1029"
	}),
}); 
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
});
client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on('message', async msg => {
	try {
	console.log('MESSAGE RECEIVED', msg);
	if (msg.body.startsWith('ymp3') || msg.body.startsWith('Ymp3')) {
		const execSync = require('child_process').execSync;
		try {
		  const chat = await msg.getChat();
		  const contact = await msg.getContact();
		   chat.sendStateTyping();
		  const { MessageMedia } = require('whatsapp-web.js');
		  //const { exec } = require("child_process")
		  var cp = `${contact.number}`
		  var it = (msg.body.slice(5))
		  let options = {stdio : 'pipe' };
		  //home/xxxx/yt-dlp is your path off yt-dlp
		  let stdout = execSync(`/home/xxxx/yt-dlp -S "res:144" --extract-audio --audio-format mp3 -o ${contact.number}y.mp3 --max-filesize 26121471 --force-overwrites ` + it + `` , options);
		  chat.sendStateTyping();
		  const media = MessageMedia.fromFilePath(`${contact.number}y.mp3`);
		  chat.sendMessage(`download done ${media.data.length}`);
		  if (`${media.data.length}` > 110000){
		  chat.sendMessage(media, { sendMediaAsDocument: true });
		  }
		  else {
		  chat.sendMessage(media); 
		  }
		  //execSync('rmdir doesntexist' , options);//will exit failure and give stderr
		} catch (e) {
		  msg.reply("aleya bingung: keknya file nya kebesaran deh") ;
		}
	}
    else if (msg.body.startsWith('yt') || msg.body.startsWith('Yt')) {
		const execSync = require('child_process').execSync;
		try {
		  const chat = await msg.getChat();
		  const contact = await msg.getContact();
		   chat.sendStateTyping();
		  const { MessageMedia } = require('whatsapp-web.js');
		  //const { exec } = require("child_process")
		  var cp = `${contact.number}`
		  var it = (msg.body.slice(3))
		  let options = {stdio : 'pipe' };
		  //home/xxxx/yt-dlp is your path off yt-dlp
		  let stdout = execSync(`/home/xxxx/yt-dlp -f "(mp4)[height<480]" -o ${contact.number}.mp4 --max-filesize 26121471 --force-overwrites ` + it + `` , options);
		  chat.sendStateTyping();
		  const media = MessageMedia.fromFilePath(`${contact.number}.mp4`);
		  chat.sendMessage(`download done ${media.data.length}`);
		  if (`${media.data.length}` > 110000){
		  chat.sendMessage(media, { sendMediaAsDocument: true });
		  }
		  else {
		  chat.sendMessage(media); 
		  }
		  //execSync('rmdir doesntexist' , options);//will exit failure and give stderr
		} catch (e) {
		  msg.reply("aleya bingung: keknya file nya kebesaran deh") ;
		}
	}
	}
	catch (error) {
		console.log('error', error);
		// Do whatever you want, throw the error again if you want but it will just produce `UnhandledPromiseRejectionWarning` again, if you throw it again.
	}
	});


client.initialize();
