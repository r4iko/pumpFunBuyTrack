
import {Telegraf} from 'telegraf'


const bot = new Telegraf("6019082125:AAGYc2Ah25DeTI13k1W_hneVkOp82B-oHIE");

const sendMsg = (msg: string) => {
    try{
        bot.telegram.sendMessage(-1002051772105,msg, {parse_mode: "HTML", message_thread_id: 72217} )

    }catch(e){
        console.log(e)
    }
};

export {sendMsg}