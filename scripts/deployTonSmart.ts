import { toNano } from '@ton/core';
import { TonSmart } from '../wrappers/TonSmart';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonSmart = provider.open(
        TonSmart.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('TonSmart')
        )
    );

    await tonSmart.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tonSmart.address);

    console.log('ID', await tonSmart.getID());
}
