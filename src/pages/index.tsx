import Head from 'next/head'
import { useState, useEffect, FormEvent } from "react"
import { Inter } from 'next/font/google'
import {ethers} from "ethers"
import ENS ,{getEnsAddress} from "@ensdomains/ensjs"
import styles from '@/styles/Home.module.css'


// const [provider, setProvider] = useState<Provider | null>(null);
//   const [signer, setSigner] = useState<ethers.Signer | null>(null);
//   const [address, setAddress] = useState<string | null>(null);
//   const [network, setNetwork] = useState<Network | null>(null);
//   const [blockNum, setBlockNum] = useState<number | null>(null);
  // useEffect(() => {
  //   // connect if we already have metamask approval
  //   try {
  //     checkAndConnect();
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   // eslint-disable-next-line
  // }, []);

const inter = Inter({ subsets: ['latin'] })
type Provider = ethers.providers.Web3Provider;
type Network = ethers.providers.Network;

declare global {
  interface Window {
    ethereum: any | undefined;
  }
}
const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();

  // make sure page refreshes when network is changed
  // https://github.com/MetaMask/metamask-extension/issues/8226
  window.ethereum.on("chainIdChanged", () => window.location.reload());
  window.ethereum.on("chainChanged", () => window.location.reload());

const ens = new ENS({ provider, ensAddress: getEnsAddress('1') });
const label = ens.name("tife.eth")

const attemptConnection = async () => {
  if (window.ethereum === undefined) {
    throw Error("MetaMask not found, please visit https://metamask.io/");
  }

  // get provider, address, and network
  

  // set states
  // setSigner(signer);
  // setProvider(provider);
  // setAddress(address);
  // setNetwork(network);
};

const connect = async () => {
  try {
    await attemptConnection();
    window.ethereum.on("accountsChanged", () => attemptConnection());
  } catch (error :any) {
    console.error(error);
    alert(error.message);
  }
};

const checkAndConnect = async () => {
  if (window?.ethereum?.request) {
    const availableAccounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    if (availableAccounts.length > 0) {
      connect();
    }
  }
};




export default function Home() {
  const [connected,setConnected] = useState(false)
  const [name,setName] = useState(" ");
  
const HandleOnclick = ( ) => {
  connect();
  setConnected(true);
}
  async function HandleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await label.createSubDomain(name);

  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
       <button onClick={HandleOnclick}>
        { connected ?
        "connected"
        :
        "connect wallet"  }
       </button>
          <form onSubmit={HandleSubmit}>
            <input type="text" name="name" id="" onChange={(e: { target: { value: any } }) => {
        setName(e.target.value)
      }}/>
            <input type="submit" value="submit" />
          </form>

      </main>
    </>
  )
}
