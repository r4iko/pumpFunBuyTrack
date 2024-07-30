import {Connection, PublicKey} from '@solana/web3.js';
import {parseTransaction} from './parse';

export class MonitorPumpFun{
    connection : Connection;
    pumpFunAddress : PublicKey;
    processedTx: Set<string>;


    constructor(connection : string, pumpFunPublicKey : string) {
        try {
            this.connection = new Connection(connection, {
                    commitment: 'finalized',
                    wsEndpoint: connection
            });
            this.pumpFunAddress = new PublicKey(pumpFunPublicKey);
            this.processedTx = new Set();
        } catch (error) {
            console.error('Error in constructor:', error);
            throw error;
        }
    }

    async startTrack() {
      
        try {
            console.log('Monitoring logs for program:', this.pumpFunAddress.toString());
            console.log(await this.connection.getSlot());
            this.connection.onLogs(this.pumpFunAddress, this.onLogs.bind(this), 'finalized');
        } catch (err) {
            console.error('Error:', err);
        }
    }

    
    async onLogs({logs, err, signature} : {
        logs: string[] | undefined;
        err: any;
        signature: string
    }) {
        try {
            if (this.processedTx.has(signature)) return; // Duplicate TX Control

            if (err) return;

            this.processedTx.add(signature); // Sign to TX
            if (logs && logs.some(log => log.includes('Program log: Instruction: Buy'))) {
                const xx = await parseTransaction(this.connection, signature, this.pumpFunAddress);
            }
           

        } catch (error) {
            console.error('Error in onLogsCallback:', (error as Error).message);
            throw error;
        }

    }

}