import {React , useState  } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { VscEllipsis } from "react-icons/vsc";
import { VscChromeClose } from "react-icons/vsc";
import { MdZoomOutMap } from "react-icons/md";
import {Link} from "react-router-dom";


function Wallet({defaultAccount , balance , tokenName , connectButtonText , errorMessage , connectWalletHandler , handleTransfer}) {
    
    const [transferNext , setTransferNext] = useState(1);
    const [showWalletMenu , setShowWalletMenu] = useState(false);

    const backWalletHandler = ()=> {
        if(transferNext===2) {
            setTransferNext(1)
        }
    }

    const closeWalletMenu = ()=> {
        setShowWalletMenu(false)
    }

    const walletThreeDotHandler = ()=> {
        setShowWalletMenu(true)
    }

    const walletSlideHandler = ()=> {
        if(transferNext===1) {
           return (
            <div className="" style={{display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
                        <div className="" style={{border : "2px solid white" , height: "45px" , width : "45px" , borderRadius :"50%", backgroundColor : "#53a38a" , marginBottom : "10px"}}>
                        </div>
                        {defaultAccount ? 
                            <div style={{fontSize : "12px"}}>{defaultAccount.substring(0,6)}***{defaultAccount.substring(defaultAccount.length-4 , defaultAccount.length)}</div>
                        :
                        <button className="button1" onClick={connectWalletHandler} style={{borderRadius : "25px" , height : "40px" , backgroundColor : "transparent" , border: "1.5px solid white" , color: "white" , cursor: "pointer" }} >{connectButtonText}</button>
                        }
                        <br />
                        <div style={{fontSize : "23px" , fontWeight : "600"}}>{balance} {tokenName}</div>
                        <br />
                        <br />
                        <div className="">
                            <button className="button1" onClick={()=> setTransferNext(2)} style={{borderRadius : "25px" , height : "40px" , backgroundColor : "transparent" , border: "1.5px solid white" , color: "white" , cursor: "pointer" , marginRight: "10px" }}>Transfer Tokens </button>
                            <Link to="/transactionHistory"><button className="button1" style={{borderRadius : "25px" , height : "40px" , backgroundColor : "transparent" , border: "1.5px solid white" , color: "white" , cursor: "pointer" }} >Transaction History</button></Link>
                        </div>
                    </div>
            )
        }else if(transferNext===2) {
            return (
                <form onSubmit={handleTransfer}>
                        <p>Receiver's address</p>
                        <input placeholder="0x" style={{borderRadius : "25px", height: "30px", width : "95%" , border: "2px solid white" ,backgroundColor : "transparent" , outline : "none" , color : "white"  , paddingLeft : "8px"}} type="text" name="raddress" id="raddress" />
                        <p>Enter token amount</p>
                        <input placeholder="0" style={{borderRadius : "25px", height: "30px", width : "95%" , border: "2px solid white" ,backgroundColor : "transparent" , outline : "none" , color : "white" , paddingLeft : "8px" , marginBottom : "20px"}} type="number" name="tokenAmount" id="tokenAmount"/>
                        <button className="button1" style={{borderRadius : "25px" , backgroundColor : "transparent" , border: "1.5px solid white" , color: "white" , cursor: "pointer" , width: "99%" , height : "39px"}} type="submit">Send Tokens</button>
                    </form>
            )
        }
}

    return (  
        <div className="">
                {/* {errorMessage} */}
                <div className="" style={{backgroundColor : "grey", fontWeight: "300" , width: "300px" , padding: "20px"  , color : "white" ,position : "relative", zIndex: "1"}}>
                <div className="" style={{display: "flex" , flexDirection: "row" , justifyContent : "space-between"}}>
                    <div className="">
                        {(transferNext===1)?
                            <Link to="/profile"><button style={{backgroundColor : "transparent" , border : "none" , color : "white" , cursor: "pointer"}}  ><MdZoomOutMap size={18} /></button></Link>
                            :
                            <button style={{backgroundColor : "transparent" , border : "none" , color : "white" , cursor: "pointer"}} onClick={backWalletHandler}><VscArrowLeft size={18} /></button>
                        }
                        
                    </div>
                    <div className="">
                        Token Wallet
                    </div>
                    {showWalletMenu ?
                        <div className="" id="walletMenuList" style={{display: "flex", flexDirection: "column", position: "absolute" , backgroundColor : "#0c1130", zIndex:"2" , top:"40px" , left : "46%" , width:"45%", borderRadius: "6px"}}>
                            <button className="" style={{fontWeight : "300",background : "transparent", border : "none" , outline : "none" , color :'white' , padding : "15px"}}>Button 1</button>
                            <button className="" style={{fontWeight : "300",background : "transparent", border : "none" , outline : "none" , color :'white' , padding : "15px"}}>Button 1</button>
                            <button className="" style={{fontWeight : "300",background : "transparent", border : "none" , outline : "none" , color :'white' , padding : "15px"}}>Button 1</button>
                        </div> 
                    : (null)
                    }
                    <div className="">
                        {showWalletMenu ? 
                        <button style={{backgroundColor : "transparent" , border : "none" , color : "white" , cursor: "pointer"}} onClick={closeWalletMenu}><VscChromeClose size={18} /></button>
                        :
                        <button style={{backgroundColor : "transparent" , border : "none" , color : "white" , cursor: "pointer"}} onClick={walletThreeDotHandler}><VscEllipsis size={18} /></button>
                    }
                        
                    </div>
                </div>
                <hr style={{ backgroundColor: "white", height: 0.1 , width : "300px"}} />
                
                {walletSlideHandler()}
                
            </div>
        </div>
    );
}

export default Wallet;