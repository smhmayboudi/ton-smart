import { toNano } from '@ton/core';
import { TonSmartFunc } from '../wrappers/TonSmartFunc';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonSmartFunc = provider.open(
        TonSmartFunc.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('TonSmartFunc'),
        ),
    );

    await tonSmartFunc.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tonSmartFunc.address);

    console.log('ID', await tonSmartFunc.getID());
}
