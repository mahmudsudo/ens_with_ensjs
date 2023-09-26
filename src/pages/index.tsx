import Head from 'next/head'
import { useState, useEffect, FormEvent } from "react"
import { Inter } from 'next/font/google'
import {Eip1193Provider, ethers} from "ethers"
import { ENS } from "@ensdomains/ensjs";
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
declare global {
  interface Window {
    ethereum: any;
  }
}



export default  function Home() {
  const [connected,setConnected] = useState(false)
  const [name,setName] = useState(" ");
  
type Provider = ethers.Provider;
type Network = ethers.Network;
let providers :ethers.BrowserProvider
if (typeof window !== "undefined") {
   providers = new ethers.BrowserProvider(window.ethereum);
    providers.send("eth_requestAccounts", []);
   let signer  : ethers.Signer
   let address :string;   
   providers.getSigner().then(el => signer =el).then(el => el.getAddress()).then(el => address =el).then(el => console.log(el));
   const provider = new ethers.JsonRpcProvider("homestead")

const ENSInstance = new ENS()
 ENSInstance.withProvider(provider)
   
   const network = provider.getNetwork();
   // make sure page refreshes when network is changed
  // https://github.com/MetaMask/metamask-extension/issues/8226
  window.ethereum.on("chainIdChanged", () => window.location.reload());
  window.ethereum.on("chainChanged", () => window.location.reload());

  const attemptConnection = async () => {
    if (window.ethereum === undefined) {
      throw Error("MetaMask not found, please visit https://metamask.io/");
    }
  
  };


  const connect = async () => {
    try {
     attemptConnection();
      window.ethereum.on("accountsChanged", () => attemptConnection());
    } catch (error :any) {
      console.error(error);
      alert(error.message);
    }
  };
  const checkAndConnect = async () => {
    if (window?.ethereum?.request) {
      const availableAccounts = window.ethereum.request({
        method: "eth_accounts",
      });
      if (availableAccounts.length > 0) {
        connect();
      }
    }
  };
  
    
  const HandleOnclick = ( ) => {
    connect();
    setConnected(true);
  }
    async function HandleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault();
  
      
      const label = ens.name("trace")
      console.log(label);
      
     label.createSubDomain(name);
  
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


 

  






}
