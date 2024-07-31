import { option } from "@metaplex-foundation/umi/serializers";

export default async function filterInstruction(x, y, z) {
    let buyAmountx: number | undefined | any;
    let buyAmounty: number | undefined | any;
    let buyAmountz: number | undefined | any;

    if (x?.filter(x => x?.parsed?.type === "transfer")) {
        const xx = x.filter(x => x?.parsed?.type === "transfer");
        buyAmountx = (xx[1]?.parsed?.info?.lamports / 1000000000);
    } else {
        buyAmountx = undefined; // Assign a default value or handle the case where the condition is not met
    }

    if (y?.filter(x => y?.parsed?.type === "transfer")) {
        const yy = y.filter(y => y?.parsed?.type === "transfer");
        buyAmounty = (yy[1]?.parsed?.info?.lamports / 1000000000);
    } else {
        buyAmounty = undefined; // Assign a default value or handle the case where the condition is not met
    }

    if (z?.filter(z => z?.parsed?.type === "transfer")) {
        const zz = z.filter(z => z?.parsed?.type === "transfer");
        buyAmountz = (zz[1]?.parsed?.info?.lamports / 1000000000);
    } else {
        buyAmountz = undefined; // Assign a default value or handle the case where the condition is not met
    }

    if(buyAmountx>1.9) {
        console.log("0")
        return {buyAmount:buyAmountx, option:0};
    }

    if(buyAmounty>1.9) {
        console.log("1")
        return {buyAmount:buyAmounty, option: 1};
    }

    if(buyAmountz>1.9) {
        console.log("2")
        return {buyAmount:buyAmountz, option: 2};
    }else {
        return {null:null, option: null};
    }

   
}

