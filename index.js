const { Client } = require('discord.js');
const snoowrap = require('snoowrap');
const axios = require('axios');
require('dotenv').config();

const client = new Client();
let bot;

const getRandomPost = async(subreddit) => {
    try{
        const subr = await bot.getSubreddit(subreddit);
        const post = await subr.getRandomSubmission();        
    
        if(post.is_video) return getRandomPost(subreddit);
        return (post.url) ? post.url : `Could not find subreddit: **${subreddit}**`;
    }
    catch{
        return `Could not find subreddit: **${subreddit}**`;
    }
}

client.on('ready', () => {
    console.log('bot ready');
    bot = new snoowrap({
        userAgent: 'blob',
        clientId: 'ySQ511mZjopXSw',
        clientSecret: 'ZBTwgSog5sWBgwXrG5CyiXvWgZ0g-Q',
        refreshToken: '369819263364-QUXpS0WT6cSp1T9qUuPq1U3Mmk3ogg'
    });
});

client.on('message', async(mssg) => {
    if(mssg.content.startsWith('?rm ')){
        const img = await getRandomPost(mssg.content.substr(4));
        mssg.channel.send(img);
    }
    else if(mssg.content.startsWith('?')){
        
    }
});

client.login(process.env.DISCORD_TOKEN);