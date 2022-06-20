const qrcode = require('qrcode-terminal');

const users = require('../database/db.json');

for (key in users) {
    var entrada = key;
    var saida = users[key];
};

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" })
});

const client2 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-two" })
});

module.exports.system = {
    iniciar() {
       client.initialize(); 
    },
    qrcode() {
        client.on('qr', qr => {
            qrcode.generate(qr, {small: true});
        });
    },
    confirmacao() {
        client.on('ready', () => {
            console.log('Client is ready!');
        });
    },
    help(){
        client.on('message', message => {
            if(message.body === 'help') {
                client.sendMessage(message.from, "Olá eu sou o bot do mateus 🤖");
            }
        });

        client.on('message', message => {
            if(message.body === 'comandos') {
                client.sendMessage(message.from, entrada);
            }
        });
    },
    msgtext() {
        client.on('message', message => {
            if(message.body === entrada) {
                message.reply(saida);
            }
        });
    }
}





