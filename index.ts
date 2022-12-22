import { readFileSync } from 'fs';
import { Address, Provider, Wallet } from 'fuels';
import { join } from 'path';
import { ContractAbi, ContractAbi__factory } from './contract-types';

// 1mzrfq0rzl9s3n4sr54en9ct259g4j75lf04yhx4js2r304xglfss5804mm

const main = async () => {
  const provider = new Provider('http://0.0.0.0:4000/graphql');
  const wallet = Wallet.fromPrivateKey('0x01', provider);

  wallet.getBalance().then((balance) => {
    console.log(balance);
  });

  const bytecode = readFileSync(
    join(__dirname, './contract/out/debug/contract.bin')
  );

  const abi = JSON.parse(
    readFileSync(
      join(__dirname, './contract/out/debug/contract-abi.json')
    ).toString()
  );

  // const factory = new ContractFactory(bytecode, abi, wallet);
  // const contract = (await factory.deployContract()) as ContractAbi;

  const contract = ContractAbi__factory.connect(
    new Address(
      'fuel1mzrfq0rzl9s3n4sr54en9ct259g4j75lf04yhx4js2r304xglfss5804mm'
    ),
    wallet
  );

  const result = await contract.functions
    .deposit({
      value: wallet.address.toB256(),
    })
    .call();

  console.log(result);
};

main();
