import {PublicKey, PartiallyDecodedInstruction} from '@solana/web3.js';
import filterInstruction from './utils/filterInstruction';
import {sendMsg} from './tg';


export const  parseTransaction = async (connection : any, tx : string, pumpFunAddress : PublicKey)  => {
    let tokenAddr:string ="";
    let ownerAddress:string = "";

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

       const {buyAmount, option} = await filterInstruction(
        parsed?.meta?.innerInstructions[0]?.instructions, 
        parsed?.meta?.innerInstructions[1]?.instructions, 
        parsed?.meta?.innerInstructions[2]?.instructions 
        );

        if(option === 0 || option === 1) {
             tokenAddr = Instruction?.accounts[2].toBase58();
             ownerAddress = Instruction?.accounts[6].toBase58();
        }

        if(option === 2 ) {
             tokenAddr = Instruction?.accounts[0].toBase58();
             ownerAddress = Instruction?.accounts[7].toBase58();
        }
   
        if ( buyAmount > 1 ) {
            console.log(Instruction?.accounts[6].toBase58())
             sendMsg
             (`<a href="https://pump.fun/${tokenAddr}">Token Link</a>\n<a href="https://solscan.io/tx/${tx}">Tx Link</a>\nBuy Amount: ${buyAmount} SOL\nBuyer:${ownerAddress}`
             )
        }

    }catch (error) {
        console.error('Error in parseTransaction:', (error as Error).message);
    }
}



// if(parsed?.meta?.innerInstructions[2]?.instructions?.filter(x=>x?.parsed?.type === "transfer")){
//     const xx  = parsed?.meta?.innerInstructions[2]?.instructions?.filter(x=>x?.parsed?.type === "transfer");
    
//     const buyAmount = (xx[1]?.parsed?.info?.lamports / 1000000000)
    
//     console.log("2:",buyAmount)
   

//     if ( buyAmount >1.99 ) {   
//      sendMsg(
//          `<a href="https://pump.fun/${tokenAddr.toBase58()}">Token Link</a>\n<a href="https://solscan.io/tx/${tx}">Tx Link</a>\nBuy Amount: ${buyAmount} SOL`
//      )
//     }
//    }

//    if(parsed?.meta?.innerInstructions[1]?.instructions?.filter(x=>x?.parsed?.type === "transfer")){
//     const xx  = parsed?.meta?.innerInstructions[1]?.instructions?.filter(x=>x?.parsed?.type === "transfer");
    
//     const buyAmount = (xx[1]?.parsed?.info?.lamports / 1000000000)
    
//     console.log("1:",buyAmount)
   

//     if ( buyAmount >1.99 ) {   
//      sendMsg(
//          `<a href="https://pump.fun/${tokenAddr.toBase58()}">Token Link</a>\n<a href="https://solscan.io/tx/${tx}">Tx Link</a>\nBuy Amount: ${buyAmount} SOL`
//      )
//     }
//    }

//    if(parsed?.meta?.innerInstructions[0]?.instructions?.filter(x=>x?.parsed?.type === "transfer")){
//     const xx  = parsed?.meta?.innerInstructions[0]?.instructions?.filter(x=>x?.parsed?.type === "transfer");
    
//     const buyAmount = (xx[1]?.parsed?.info?.lamports / 1000000000)
    
//     console.log("0:",buyAmount)
   

//     if ( buyAmount >1.99 ) {   
//      sendMsg(
//          `<a href="https://pump.fun/${tokenAddr.toBase58()}">Token Link</a>\n<a href="https://solscan.io/tx/${tx}">Tx Link</a>\nBuy Amount: ${buyAmount} SOL`
//      )
//     }
//    }
   