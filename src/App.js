import React , { useState, useEffect } from "react";
import './App.css'
import {Routes , Route, BrowserRouter} from "react-router-dom";
import TransactionHistory from "./TransactionHistory"
import {contractAddress} from "./config";
import { certificateContractAddress } from "./config";
import ytkAbi from "./utils/ytkAbi.json"
import certificate from "./utils/certificate.json"
import Wallet from "./Wallet"
import Profile from "./Profile"
import {ethers} from "ethers";
import Reward from "./Reward";
import Owner from "./Owner";

const token_abi = ytkAbi.abi;
const certificate_abi = certificate.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  const [provider , setProvider ] = useState(null);
  const [signer , setSigner ] = useState(null);
  const [contract , setContract] = useState(null);
  const [certificateContract , setCertificateContract ] = useState(null);
  const [balance , setBalance] = useState(null);
  const [tokenName , setTokenName ] = useState(null);
  const [transferHash , setTransferHash] = useState(null)
  const [connectButtonText , setConnectButtonText] = useState("Connect Wallet");
  const [errorMessage , setErrorMessage] = useState(null);
  const [signAddress , setSignAddress] = useState(null)
  const [tokenURI , setTokenURI] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId'})

      const rinkebyChainId = '0x4'

      if (chainId !== rinkebyChainId) {
        alert('You are not connected to the Rinkeby Testnet!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      // console.log('Found account', accounts[0])
      accountChangeHandler(accounts[0]);
      setConnectButtonText("Wallet connected");
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }

  const accountChangeHandler = async (newAddress)=> {
    setCurrentAccount(newAddress);
    await updateEthers();
    await updateCertificate();
  }

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    // console.log('Connected to chain:' + chainId)

    const rinkebyChainId = '0x4'

    if (chainId !== rinkebyChainId) {
      setCorrectNetwork(false)
    } else {
      setCorrectNetwork(true)
    }
  }

  const updateEthers = ()=> {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
  
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
  
    let tempContract = new ethers.Contract(contractAddress, token_abi , tempSigner);
    setContract(tempContract);
    }

  const updateCertificate = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let tempContract = new ethers.Contract(certificateContractAddress , certificate_abi , tempSigner);
    setCertificateContract(tempContract);
  }

  const updateBalance = async ()=> {
    let balanceBigN = await contract.balanceOf(currentAccount);
    let balanceNumber = balanceBigN.toNumber()

    const decimals = await contract.decimals()
    let tokenBalance = balanceNumber / Math.pow(10,decimals);

    setBalance(balanceNumber);
}

const updateTokenName = async ()=> {
  let tokenName  = await contract.symbol();
  setTokenName(tokenName);
}

const handleTransfer = async (e) => {
  e.preventDefault()
  let raddress = e.target.raddress.value;
  let tokenAmount = e.target.tokenAmount.value;
  let txn = await contract.transfer(raddress , tokenAmount);
  console.log("Transaction")
  console.log(txn);
  setTransferHash(txn.hash)
}

const signMessage = async () => {
  await connectWallet();
  let message = "Authenticate the user";
  // console.log("Provider: "+ provider)
  let walletSigner = await signer;
  let flatSig = await walletSigner.signMessage(message);
  // console.log("Signature: " + flatSig);
  let address = await ethers.utils.verifyMessage(message , flatSig);
  // console.log("Address: " + address);
  // console.log("DefaultAccount: " + defaultAccount);
  await setSignAddress(address);
}

const mintNFT = async ( _address ,  uri) => {
  await certificateContract.safeMint(_address , uri);
}



  useEffect(() => {
    if(contract!=null) {
      updateBalance();
      updateTokenName();
  }
    connectWallet();
    checkCorrectNetwork();
  });

  return (
    <div>
    {currentAccount === '' ? (
      <div style={{height: "100vh" , backgroundColor : "#0A0B1E" , display : "flex" , justifyContent : "center" , alignItems : "center"}}>
        <div style={{display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
          <button
          className='connectWalletButton'
          style={{backgroundColor : "#50b7f5" , border: "none" , borderRadius : "25px" , padding : "12px 20px" , color : "white" , fontWeight : "500" , fontSize : "20px" , cursor : "pointer" }}
          onClick={connectWallet}
          >
          Connect Wallet
          </button>]
        </div>
      </div>
      ) : correctNetwork ? (
        <div className="app">
          <BrowserRouter>
            <Routes>
            <Route path="/profile" element= {<Profile 
              currentAccount={currentAccount} 
              contract={contract} balance={balance} 
              tokenName={tokenName} 
              connectButtonText={connectButtonText} 
              certificateContract = {certificateContract}
            /> } />
            <Route path="/wallet" element= {<Wallet 
              defaultAccount={currentAccount}
              balance = {balance}
              tokenName={tokenName}
              connectButtonText={connectButtonText}
              errorMessage={errorMessage}
              connectWalletHandler={connectWallet}
              handleTransfer={handleTransfer}
              /> } />
            <Route path="/transactionhistory" element= {<TransactionHistory />} />
            <Route path="/" element={<Reward 
              mintNFT = {mintNFT}
              defaultAccount={currentAccount}
              balance = {balance}
              tokenName={tokenName}
              connectButtonText={connectButtonText}
              errorMessage={errorMessage}
              connectWalletHandler={connectWallet}
              handleTransfer={handleTransfer}
            /> } />
            <Route path="/owner" element = {
              <Owner certificateContract={certificateContract} currentAccount={currentAccount} />
            } />
            </Routes>
          </BrowserRouter>
          
        </div>
      ) : (
      <div 
      className='mb-20 font-bold text-2xl gap-y-3'
      style={{display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}
      >
      <div>----------------------------------------</div>
      <div>Please connect to the Rinkeby Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
    )}
    </div>
  );
}

export default App;
