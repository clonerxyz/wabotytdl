var express = require('express');
var app = express();
const re = /kon.*/ig;
const re2 = /aleya.*/ig;
const re3 = /apasih.*/ig;
const re4 = /satanis.*/ig;
const re5 = /say.*/ig;
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const translate = require('translate-google');
//const WwebjsSender = require("@deathabyss/wwebjs-sender");
const { Client, Buttons, List, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js'); 
const client = new Client({
	puppeteer: {
        //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        executablePath: '/bin/chromium',
    },
	authStrategy: new LocalAuth({
		clientId: "client-9098"
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
	
    
	if (msg.body === '1') {
		const chat = await msg.getChat();
		const contact = await msg.getContact();
		if (`${contact.number}` === '628xxxxxxxxx'){
			chat.sendStateTyping();
			chat.sendMessage(`Hallo gosujin sama @${contact.number} ^_^`, {
				mentions: [contact]
			});
		}
		else {
			chat.sendStateTyping();
			chat.sendMessage(`Hi @${contact.number}!`, {
				mentions: [contact]
			});
		}
    }
  
   
	else if (msg.body.startsWith('Beb') || msg.body.startsWith('beb')) {
		const chat = await msg.getChat();
		const contact = await msg.getContact();
		if (`${contact.number}` === '628xxxxxxxxx'){
			chat.sendStateTyping();
			chat.sendMessage(`iya kenapa beb ? @${contact.number} ^_^`, {
				mentions: [contact]
			});
		}
		else {
			chat.sendStateTyping();
			chat.sendMessage(`bebek kah ? @${contact.number}!`, {
				mentions: [contact]
			});
		}
    }
    else if (msg.body.match(re) || msg.body.match(re2) || msg.body.match(re3) || msg.body.match(re4) || msg.body.match(re5)) {
		const chat = await msg.getChat();
		const contact = await msg.getContact();
			chat.sendStateTyping();
			const { exec } = require("child_process")
			exec("cat res.txt | shuf -n 1", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				//return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				//return;
			}
			console.log(`stdout: ${stdout}`);
			chat.sendMessage(`${stdout}`);
		})	
		}
    	else if (msg.body.startsWith('spk') || msg.body.startsWith('Spk')) {
		const chat = await msg.getChat();
		const contact = await msg.getContact();
		const { MessageMedia } = require('whatsapp-web.js');
		const gTTS = require('gtts');
		var it = (msg.body.slice(4))
		var speech = ``+ it +`` ;
		var gtts = new gTTS(speech, 'id');
		gtts.save(`${contact.number}.mp3`, function (err, result){
			if(err) { throw new Error(err); }
			console.log("Text to speech converted!");
			chat.sendStateTyping();
			const media = MessageMedia.fromFilePath(`${contact.number}.mp3`);
			chat.sendMessage(media, { sendAudioAsVoice: true});
		});
    }
 
    else if (msg.body.startsWith('ymp3') || msg.body.startsWith('Ymp3')) {
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
		  let stdout = execSync(`/home/clonerxyz/yt-dlp -S "res:144" --extract-audio --audio-format mp3 -o ${contact.number}y.mp3 --max-filesize 26121471 --force-overwrites ` + it + `` , options);
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
		  let stdout = execSync(`/home/clonerxyz/yt-dlp -f "(mp4)[height<480]" -o ${contact.number}.mp4 --max-filesize 26121471 --force-overwrites ` + it + `` , options);
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
	
	else if (msg.body.startsWith('menu') || msg.body.startsWith('Menu')) {
		const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
		var it = (msg.body.slice(4))
		const { exec } = require("child_process")
		exec("cat menu.txt", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				//return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				//return;
			}
			console.log(`stdout: ${stdout}`);
			chat.sendMessage(`${stdout}`);
		})	
		
    }
	else if (msg.body.startsWith('strd') || msg.body.startsWith('Strd')) {
		const chat = await msg.getChat();
		const { exec } = require("child_process")
		const { MessageMedia } = require('whatsapp-web.js');
		exec("ls ./doujin | shuf -n 1", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				//return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				//return;
			}
			console.log(`stdout: ${stdout}`);
			var str = stdout.replace(/\r?\n|\r/g, "");
			chat.sendStateTyping();
			const sticker = MessageMedia.fromFilePath("./doujin/" + str);
			chat.sendMessage(sticker, { sendMediaAsSticker: true });
		})	
		//chat.sendStateTyping();
		
		
		
	}
	else if (msg.body.startsWith('vn') || msg.body.startsWith('Vn')) {
		const chat = await msg.getChat();
		const { exec } = require("child_process")
		const { MessageMedia } = require('whatsapp-web.js');
		exec("ls ./vn | shuf -n 1", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				//return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				//return;
			}
			console.log(`stdout: ${stdout}`);
			var str = stdout.replace(/\r?\n|\r/g, "");
			chat.sendStateTyping();
			const media = MessageMedia.fromFilePath("./vn/" + str);
			chat.sendMessage(media, { sendAudioAsVoice: true});
		})	
		//chat.sendStateTyping();
		
		
		
	}
	else if (msg.body.startsWith('sts') || msg.body.startsWith('Sts')) {
			const chat = await msg.getChat();
			const media = await msg.downloadMedia();
			if (msg.hasMedia) {
			var ext = `${media.mimetype.split('/')[1]}`
			var name = Math.random();
			var fullPath = `./img/${name}.${ext}`
			
			fs.writeFile(
				"./img/" + name + "." + ext,
				media.data,
				"base64",
				function (err) {
				  if (err) {
					console.log(err);
				  }
				  else{
					chat.sendStateTyping();
					const { MessageMedia } = require('whatsapp-web.js');
					const sticker = MessageMedia.fromFilePath(fullPath);
					chat.sendMessage(sticker, { sendMediaAsSticker: true });
				  }
				}
			  ); 
			}
			else {
				chat.sendMessage(`upload img dulu pake caption sts`);
			}
		
    }
	else if (msg.body.startsWith('tle') || msg.body.startsWith('Tle')) {
		const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
		var it = (msg.body.slice(4))
		translate(''+it+'', {from: 'auto', to: 'en'}).then(res => {
			console.log(res)
			chat.sendMessage(res);
		}).catch(err => {
			console.error(err)
			chat.sendMessage(err);
		})
		
    }
	else if (msg.body.startsWith('tid') || msg.body.startsWith('Tid')) {
		const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
		var it = (msg.body.slice(4))
		translate(''+it+'', {to: 'id'}).then(res => {
			console.log(res)
			chat.sendMessage(res);
		}).catch(err => {
			console.error(err)
			chat.sendMessage(err);
		})
		
    }
	else if (msg.body.startsWith('tlj') || msg.body.startsWith('Tlj')) {
		const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
		var it = (msg.body.slice(4))
		translate(''+it+'', {to: 'ja'}).then(res => {
			console.log(res)
			chat.sendMessage(res);
		}).catch(err => {
			console.error(err)
			chat.sendMessage(err);
		})
		
    }

	else if (msg.body.startsWith('okeh') || msg.body.startsWith('Okeh')) {
		const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
		var ress = 'okeh sayang akuh';
		chat.sendMessage(ress);
		
		
    }
    else if (msg.body.startsWith('wk') || msg.body.startsWith('Wk') || msg.body.startsWith('Awk') || msg.body.startsWith('awo') || msg.body.startsWith('kw') || msg.body.startsWith('aow') || msg.body.startsWith('Aow')) {
		const chat = await msg.getChat();
        // simulates typing in the chat
        chat.sendStateTyping();
		var ress = 'aokwkoawokoakw';
		chat.sendMessage(ress);
		
		
    }
    else if (msg.body.startsWith('fc ')) {
		const chat = await msg.getChat();
		// simulates typing in the chat
		chat.sendStateTyping();
		const contact = await msg.getContact();
        	if (`${contact.number}` === '628xxxxxxxxx'){
		var it = (msg.body.slice(3))
		const { exec } = require("child_process")
		exec(""+ it +"", (error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				//return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				//return;
			}
			else {
			console.log(`stdout: ${stdout}`);
			chat.sendMessage(`${stdout}`);
            		chat.sendMessage(`${stderr}`);
            		}
			})}
		else {
		chat.sendMessage(`not probihited`);
		}
			}
    else if (msg.body.startsWith('dl ')) {
        const chat = await msg.getChat();
        var it = (msg.body.slice(3))
        // simulates typing in the chat
            chat.sendStateTyping();
		  const { MessageMedia } = require('whatsapp-web.js');
            	  const media = MessageMedia.fromFilePath(it);
		  //chat.sendMessage(`download done ${media.data.length}`);
		  if (`${media.data.length}` < 510000){
		  chat.sendMessage(media, { sendMediaAsDocument: true });
		  }
		  else {
		  chat.sendMessage(`file terlalu besar`);
		  }
		  
    }
	}
	catch (error) {
		console.log('error', error);
		// Do whatever you want, throw the error again if you want but it will just produce `UnhandledPromiseRejectionWarning` again, if you throw it again.
	}
	});


client.initialize();
