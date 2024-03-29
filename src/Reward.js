import { Button } from "@material-ui/core";
import React,{useState} from "react";
import { IoWalletOutline } from "react-icons/io5";
import "./Reward.css"
import { CgProfile } from "react-icons/cg";
import {create } from "ipfs-http-client";
import { Link } from "react-router-dom";
import Wallet from "./Wallet";

const client = create('https://ipfs.infura.io:5001/api/v0');




const Reward = ({mintNFT , currentAccount , balance , tokenName , connectButtonText , errorMessage , connectWallet , handleTransfer}) => {
    const [nftImage, setNftImage] = useState("");
     const hiddenUploadImage = React.useRef(null);
     const [address , setAddress ] = useState("");
     const [nftName , setNFTName ] = useState("");
     const [nftDiscription  , setNFTDiscription  ] = useState("");
     const [nftMetaData , setNFTMetaData] = useState("");
     const [openWallet  ,setOpenWallet] = useState(false);

     const addNFT = async () => {
        let address_ = address;
    
        try {
            let temp = {
                name : nftName,
                image : nftImage,
                description : nftDiscription
            }
            let jsonObj = JSON.stringify(temp);
            let added = await client.add(jsonObj)
            console.log(added);
            let url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log(url);
            setNFTMetaData(url)
            await mintNFT(address_,url);
        } catch(error) {
          console.log("Error submitting new NFT", error);
        }
      }

     const uploadNFT = (e) => {
        e.preventDefault();
    
        addNFT();
        setNftImage("");
      };

      const postImageChange = async(e)=> {
        const file = e.target.files[0]
        try {
          const added = await client.add(file)
          console.log(added)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`
          console.log(url);
          setNftImage(url)
        } catch (error) {
          console.log('Error uploading file: ', error)
        }  
      }

      const handleUploadImage = (e) => {
        e.preventDefault();
        hiddenUploadImage.current.click();
      }

      const handleWalletOpen = () => {
        setOpenWallet(!openWallet);
      }

    return (
        <div className="" style={{  backgroundColor : "#0A0B1E" }}>
            <div className='' style={ { padding: "0px 10vw 0px 10vw" , height: "100px" , backgroundColor : "#24294f" , color : "white" , display : "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                <div style={{fontWeight : "600" , fontSize : "25px"}}>
                    <span style={{color : "#50b7f5"}}>Digi</span>Block
                </div>
                <div style={{display : "flex" , justifyContent: "space-between" , width : "30vw"}}>
                    <div style={{fontSize : "18px"}}>
                        <a href="#uploadcertificate" style={{textDecoration : "none" , color : "white"}}>Upload Certificate</a>
                    </div>
                    <div className="navItem" style={{fontSize : "18px"}}>
                        <Link to="/owner" style={{textDecoration : "none" , color : "white"}}> Find Owner </Link>
                    </div>
                    <div>
                       <Link to="/profile" style={{color : "white"}}> <CgProfile size={30} /> </Link>
                    </div>
                    <div>
                       <button onClick={handleWalletOpen} style={{background: "none", cursor: "pointer" , border : "none" , outline : "none" , color : "white" , position : "relative"}} > <IoWalletOutline size={30} /> </button>
                       {openWallet && <Wallet defaultAccount={currentAccount}
                        balance = {balance}
                        tokenName={tokenName}
                        connectButtonText={connectButtonText}
                        errorMessage={errorMessage}
                        connectWalletHandler={connectWallet}
                        handleTransfer={handleTransfer}
                        handleWalletOpen = {handleWalletOpen}
                        /> }
                    </div>
                </div>
            </div>
            
            
            <div className="" style={{display : "flex" , flexDirection : "row" , justifyContent : "space-between" , padding: "70px 10vw 0 10vw"}}>
                <div style={{color : "white" , width: "50%"}}>
                   <div style={{fontSize : "55px" , color : "lightgray"}}>
                        Provide certificates as in form of <span style={{color : "#50b7f5"}}>NFT.</span>
                   </div>
                   <div style={{color : "gray" , fontSize : "20px"}}>
                        To increase transparency and originality of certificates this platform provide certificates as in form of NFT that will stores on IPFS which is decentralised way of storage.
                   </div>
                   <div style={{marginTop : "40px"}}>
                        <a style={{textDecoration : "none"}} href="#uploadcertificate"><Button style={{padding : "13px", fontWeight : "500", color : "white" , borderRadius : "30px" , backgroundColor: "#50b7f5" , textTransform : "capitalize"}} >Upload Certificate</Button> </a>
                   </div>
                </div>
                <div style={{width : "50%" , marginLeft : "100px"}}>
                    <div className="" style={{width: "350px" ,padding : "10px" , height : "400px" , backgroundColor : "#3b4380"  , borderRadius : "15px" , marginLeft : "30px"}}>
                        <div style={{height: "250px" }} >
                            <img style={{height: "100%" , width : "100%"   , borderRadius : "15px"}} src="https://res.cloudinary.com/getlinksdesigner/image/upload/v1605605404/Blog/TCC_Media_press_Blog-cover_01_ipmgbw.png" alt="" />
                        </div>
                        <div style={{display : "flex " , flexDirection : "row" , justifyContent : "start" , margin: "10px"}}>
                            <div style={{height : "55px" , width: "55px" , borderRadius : "50%" , backgroundColor : "#24294f" , marginRight  : "20px"}}>

                            </div>
                            <div>
                                <div style={{color : "white" , fontSize : "25px" , fontWeight : "500"}}>
                                    Code Cadet
                                </div>
                                <div style={{color  :"gray"}}>
                                    Code your ideas
                                </div>
                            </div>
                        </div>
                        <div style={{color : "white" , fontWeight : "500" , margin : "10px" , fontSize : "18px"}}>
                            <div style={{color : "white"}}>
                                Amount
                            </div>
                            <div style={{display : "flex" , flexDirection : "row" , justifyContent : "space-between"}}>
                                <div style={{color : "#bae314"}}>
                                    100 YTK
                                </div>
                                <div>
                                    Rs. 3,000
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div id="uploadcertificate" style={{paddingBottom: "100px" , width: "50%" , marginLeft : "25%" , marginTop : "200px" , display : "flex" , alignItems : "center" , flexDirection : "column"}}>
                <div style={{color : "white" , fontSize : "30px" , fontWeight : "600"}} >Provide Certificate to Student Address</div>
                <input 
                    style={{marginTop :"50px", color : "white" , background: "transparent" , width: "90%" , height : "40px"  ,border: "none" , borderBottom : "2px solid grey", outline : "none",borderRadius : "8px" , paddingLeft : "10px"}} 
                    onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address" type="text" />
                <br />
                <button 
                    style={{height : "45px" , width: "95%"  , backgroundColor : " #50b7f5" , border : "none" , color : "white" ,fontWeight : "700 " , borderRadius : "30px" , cursor : "pointer"}}
                    onClick={handleUploadImage} >Select Image</button>
                <input type="file" ref={hiddenUploadImage} onChange={postImageChange} style={{display : "none"}} />
                <br />
                {nftImage ? 
                    <img src={nftImage} alt="nftImage" style={{width : "500px" , marginLeft : "5%" , height: "auto" , marginBottom : "20px"}} /> :
                    ""
                }
                <input 
                    style={{marginTop :"50px", color : "white" , background: "transparent" , width: "90%" , height : "40px"  ,border: "none" , borderBottom : "2px solid grey", outline : "none",borderRadius : "8px" , paddingLeft : "10px"}} 
                    onChange={(e) => setNFTName(e.target.value)} value={nftName} placeholder="Name of Event" type="text" />
                <br />
                <input 
                    style={{marginTop :"50px", color : "white" , background: "transparent" , width: "90%" , height : "40px"  ,border: "none" , borderBottom : "2px solid grey", outline : "none",borderRadius : "8px" , paddingLeft : "10px"}} 
                    onChange={(e) => setNFTDiscription(e.target.value)} value={nftDiscription} placeholder="Description" type="text" />
                <br />
                <button 
                    style={{height : "45px" , width: "95%"  , backgroundColor : " #50b7f5" , border : "none" , color : "white" ,fontWeight : "700 " , borderRadius : "30px" ,cursor : "pointer"}}
                onClick={uploadNFT}>Upload Certificate</button>
            </div>

        </div>
    )
}

export default Reward;