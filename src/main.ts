import {MonitorPumpFun} from './Monitor';
require('dotenv').config();


async function main() {
    const RPC = <string> process.env.RPC;
    const ws = <string> process.env.WS;
    const pfpk = <string> process.env.PFPK;
    const Monitor = new MonitorPumpFun(RPC,pfpk);
    Monitor.startTrack();
}


main();