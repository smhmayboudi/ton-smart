import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient, Address } from '@ton/ton';
import { TonSmartFunc } from '../wrappers/TonSmartFunc';

export async function run() {
    const endpoint = await getHttpEndpoint({ network: 'testnet' });
    const client = new TonClient({ endpoint });
    const counterAddress = Address.parse('kQA8vO9inTnAg17vSe7cL_OORy2JlWPQHLJkS-Kbu9GUpRoh');
    const counter = TonSmartFunc.createFromAddress(counterAddress);
    const counterContract = client.open(counter);
    const counterValue = await counterContract.getCounter();
    console.log('value:', counterValue.toString());
}
