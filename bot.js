var SDClient = require('./client.js');
var config = require('./config.js');

//You can delete this part later.
if (config.admin === "ADMIN" || config.nickName === "BOTNAME" || config.pass === "PASSWORD" || config.prefix === "PREFIX") {
	console.log("Please update the details in config.js.");
	return process.exit();
}

var options = {
	serverid: config.serverid,
	loginServer: 'https://play.pokemonshowdown.com/~~' + config.serverid +'/action.php',
	nickName: config.nickName,
	pass: config.pass,
	autoJoin: config.autoJoin
};

var Bot = new SDClient(config.server, config.port, options);

function toId(text) {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

Bot.connect();

Bot.on('connect', function (connection) {
	console.log('Connection established.');
});
Bot.on('chat', function (room, time, by, message) {

	var admin = toId(config.admin);
    var prefix = config.prefix;
    if (!message.startsWith(prefix)) return;
    messagecontent = message.substr((prefix).length);
    const args = messagecontent.split(' ');
    const command = args.shift().toLowerCase();

    if (toId(by) == admin || by == admin) {
    	//Admin commands

    	if (command === 'do') {
    		Bot.say(room, args.join(' '));
    	}

    	if (command === 'eval') {
    		try {
    		    Bot.say(room, eval(args.join(' ')));
    		}
    		catch (e) {
    			Bot.say(room, e.message);
    			console.log(e.stack);
    		}
    	}

    	if (command === 'kill') {
    		Bot.disconnect();
    	}
    }

    if (toId(by) == admin || by.startsWith('@') || by.startsWith('#') || by.startsWith('&') || by.startsWith('~') || by == admin) {
    	// @ commands

    	if (command === 'echo') {
    		Bot.say(room, ` ${args.join(' ')}`);
    	}

    }

    if (toId(by) == admin || by.startsWith('%') || by.startsWith('@') || by.startsWith('#') || by.startsWith('&') || by.startsWith('~') || by == admin) {
    	// % commands
    }

    if (toId(by) == admin || by.startsWith('+') || by.startsWith('%') || by.startsWith('@') || by.startsWith('#') || by.startsWith('&') || by.startsWith('~') || by == admin) {
    	//+ commands
    }

    if (1 === 1) {
    	//Unrestricted commands

    	if (command === 'help') {
    		Bot.say(room, '-_-');
    	}

    	if (command === 'ping') {
    		Bot.say(room, 'Pong!');
    	}
    }
});
