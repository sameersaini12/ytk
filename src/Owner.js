import React,{useState} from 'react'

function Owner({certificateContract , currentAccount}) {

    const [tokenId , setTokenId ] = useState("");
    const [NFTowner , setNFTOwner] = useState("null");

    const handleGetOwner = async () => {
        let temp = await certificateContract.ownerOf(tokenId);
        setNFTOwner(temp);
    }

  return (
    <div style={{backgroundColor : "#0A0B1E" , height : "100vh" , display: "flex" , justifyContent: "center" }}>
        <div style={{width: "60vw" , display: "flex" , alignItems: "center" , flexDirection: "column" , marginTop : "200px"}}>    
            <div style={{color : "white" , fontSize : "30px" , fontWeight : "600"}} >Get the owner of product</div>
                <input 
                    style={{marginTop :"50px", color : "white" , background: "transparent" , width: "90%" , height : "40px"  ,border: "none" , borderBottom : "2px solid grey", outline : "none",borderRadius : "8px" , paddingLeft : "10px"}} 
                    onChange={(e) => setTokenId(e.target.value)} value={tokenId} placeholder="Receiver's Address" type="text" />
                <br />
                <button 
                    style={{height : "45px" , width: "95%"  , backgroundColor : " #50b7f5" , border : "none" , color : "white" ,fontWeight : "700 " , borderRadius : "30px" ,cursor : "pointer"}}
                onClick={handleGetOwner}>Find Owner</button>
                <div style={{color : "white"}}>
                    {(NFTowner.toLowerCase()===currentAccount.toLowerCase()) ? 
                    <div> 
                        You are the owner of NFT
                    </div> :
                    (!(NFTowner==="null")) ?
                    <div>
                        You are not he current owner of this NFT.
                    </div> :
                    ""
                }
                </div>
            </div>
        </div>
                
  )
}

export default Owner