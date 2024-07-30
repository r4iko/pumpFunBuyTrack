import {PublicKey, PartiallyDecodedInstruction} from '@solana/web3.js';
import {sendMsg} from './tg';
import { callback } from 'telegraf/typings/button';
export const  parseTransaction = async (connection : any, tx : string, pumpFunAddress : PublicKey)  => {

    try {
        const parsed = await connection.getParsedTransaction(tx, {
            maxSupportedTransactionVersion: 0,
            commitment: 'finalized'
        });
        
        const Instruction: PartiallyDecodedInstruction = parsed ?. transaction.message.instructions.find(x => x.programId.toBase58() === pumpFunAddress.toBase58())
        if (!Instruction) {
            console.log("Instruction Not found");
            return;
        }

       console.log(parsed?.meta?.preTokenBalances[0].mint)
       
       //const tokenAddr = Instruction.accounts[2];
       const tokenAddr = Instruction.accounts[2];
       console.log(parsed?.meta?.preTokenBalances[0].mint)
       if(parsed?.meta?.innerInstructions[2]?.instructions?.filter(x=>x?.parsed?.type === "transfer")){
        const xx  = parsed?.meta?.innerInstructions[2]?.instructions?.filter(x=>x?.parsed?.type === "transfer");
        
        const buyAmount = (xx[1]?.parsed?.info?.lamports / 1000000000)
        
        console.log("2:",buyAmount)
       
 
        if ( buyAmount >1.99 ) {   
         sendMsg(
             `<a href="https://pump.fun/${tokenAddr.toBase58()}">Token Link</a>\n<a href="https://solscan.io/tx/${tx}">Tx Link</a>\nBuy Amount: ${buyAmount} SOL`
         )
        }
       }

       if(parsed?.meta?.innerInstructions[1]?.instructions?.filter(x=>x?.parsed?.type === "transfer")){
        const xx  = parsed?.meta?.innerInstructions[1]?.instructions?.filter(x=>x?.parsed?.type === "transfer");
        
        const buyAmount = (xx[1]?.parsed?.info?.lamports / 1000000000)
        
        console.log("1:",buyAmount)
       
 
        if ( buyAmount >1.99 ) {   
         sendMsg(
             `<a href="https://pump.fun/${tokenAddr.toBase58()}">Token Link</a>\n<a href="https://solscan.io/tx/${tx}">Tx Link</a>\nBuy Amount: ${buyAmount} SOL`
         )
        }
       }

       if(parsed?.meta?.innerInstructions[0]?.instructions?.filter(x=>x?.parsed?.type === "transfer")){
        const xx  = parsed?.meta?.innerInstructions[0]?.instructions?.filter(x=>x?.parsed?.type === "transfer");
        
        const buyAmount = (xx[1]?.parsed?.info?.lamports / 1000000000)
        
        console.log("0:",buyAmount)
       
 
        if ( buyAmount >1.99 ) {   
         sendMsg(
             `<a href="https://pump.fun/${tokenAddr.toBase58()}">Token Link</a>\n<a href="https://solscan.io/tx/${tx}">Tx Link</a>\nBuy Amount: ${buyAmount} SOL`
         )
        }
       }
       
   
      

    }catch (error) {
        console.error('Error in parseTransaction:', (error as Error).message);
    }
}