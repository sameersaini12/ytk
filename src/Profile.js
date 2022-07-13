import React,{useState,useEffect} from 'react'
import "./Profile.css"
import { FaEthereum } from "react-icons/fa";
import { generateRandomAvatarOptions } from './avatar';
import Avatar from 'avataaars';
import { Button } from "@material-ui/core";
import Popup from "./Popup";
import im from "./img/sad.png"


function Profile({currentAccount , contract , balance , tokenName ,connectButtonText , certificateContract}) {

  const [avatarOptions, setAvatarOptions] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [name , setName ] = useState("");
  const [email , setEmail] = useState(""); 
  const [rollNo , setRollNo] = useState("")
  const [updateName , setUpdateName] = useState("");
  const [updateEmail , setUpdateEmail] = useState("");
  const [updateRollNo , setUpdateRollNo] = useState("");
  const [tokenURI , setTokenURI] = useState([])
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const updateProfile = async () => {
    let name = updateName; 
    let email = updateEmail;
    let rollNo = updateRollNo;

    try {
        let formalMediaTx = await contract.setUpProfile(currentAccount , name , email , rollNo);
        console.log(formalMediaTx);

    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }
  }

  const getTokenURI = async (id) => {
    let tempURI = await certificateContract.tokenURI(id);
    // console.log("URI" + tempURI)
  }

  const getCertificateIds= async() => {
    let temp = await certificateContract.getAllCertificates(currentAccount);
    let ans=[]
    temp.map(async (item)=> {
      ans[item.toNumber()] = await certificateContract.tokenURI(item.toNumber());
    })
    setTokenURI(ans);
  }

  const getProfile = async() => {
    try {
        let updatedProfile = await contract.getProfile(currentAccount);
        setName(updatedProfile.name);
        setEmail(updatedProfile.email);
        setRollNo(updatedProfile.rollno);
        getCertificateIds();
      } catch(error) {
    }
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile();
    setUpdateName("");
    setUpdateEmail("");
    setUpdateRollNo("");
  }; 

  

  useEffect(() => {
    let avatar = generateRandomAvatarOptions();
    setAvatarOptions(avatar);
    
      getProfile();
    
  }, []);

  return (
    <div className="" style={{backgroundColor : "#0A0B1E"}}>
      <div className='' style={{height: "100px" , backgroundColor : "#24294f" , width: "100%"}}>
      </div>
      <div className=''>
      <div className='' style={{display : "flex" , justifyContent: "space-around"  , marginTop : "80px"}}>
        {/* <div className='profile-upper-background' style={{ }}>
        {/* </div> */} 
        <div className='' style={{display : "flex"  }}>
        <Avatar
            style={{ height: "100px" , width: "100px"  }}
            avatarStyle='Circle'
            {...avatarOptions }
            />
          <div className='' style={{color: "white" , marginLeft : "20px" , fontWeight : "400" ,lineHeight: "27px"}}>
              <div style={{fontWeight : "600" }}>{(name==="") ? "" : name }</div>
              <div style={{fontWeight : "400" , color : "#888f8a"}}>{(email==="") ? "" : email }</div>
              <div style={{fontWeight : "400" , color : "#888f8a"}}>{(rollNo==="") ? "" : rollNo }</div>
              <Button
                type="submit"
                className="profileBox__tweetButton"
                style={{marginTop: "30px", padding : "8px 14px 8px 14px"}}
                onClick={togglePopup}
                    >
                SetUp Profile
              </Button>
          </div>
        </div>

        {isOpen && <Popup
            content={<>
                <div style={{ height : "60vh", display : "flex" , flexDirection : "column" , justifyContent : "space-between" , padding : "5% 15% 5% 15%" , lineHeight : "30px"}}>
                <div>
                        <input 
                        type="text"
                         placeholder="Your name" 
                         style={{color : "white" , background: "transparent" , width: "90%" , height : "40px"  ,border: "none" , borderBottom : "2px solid grey", outline : "none",borderRadius : "8px" , paddingLeft : "10px"}} 
                         onChange={(e) => setUpdateName(e.target.value)}
                         value={updateName}
                         />
                        <br />
                        <br />
                        <input 
                        type="text"
                         placeholder="Your Email address" 
                         style={{color : "white" , background: "transparent" , width: "90%" , height : "40px",border: "none" , borderBottom : "2px solid grey", outline : "none",borderRadius : "8px" , paddingLeft : "10px"}} 
                         onChange={(e) => setUpdateEmail(e.target.value)}
                         value={updateEmail}
                         />
                         <br />
                        <br />
                        <input 
                        type="text"
                         placeholder="Your Roll Number" 
                         style={{color : "white" , background: "transparent"  , width: "90%" , height : "40px",border: "none" , borderBottom : "2px solid grey", outline : "none",borderRadius : "8px" , paddingLeft : "10px"}} 
                         onChange={(e) => setUpdateRollNo(e.target.value)}
                         value={updateRollNo}
                         />
                    </div>
                    <div>
                    <Button
                        type="submit"
                        style={{height : "45px", marginTop : "-90px" , width: "95%"  , backgroundColor : " #50b7f5" , border : "none" , color : "white" ,fontWeight : "700 " , borderRadius : "30px"}}
                        onClick={handleUpdateProfile}
                            >
                        SetUp Profile
                    </Button>
                    </div>
                </div>
            </>}
            handleClose={togglePopup}
            />}
        
        <div className='' style={{height: "200px" , width :"400px" , background: "#24294f" , borderRadius : "19px"  , backgroundSize : "500px" , padding : "40px" }}> {/*backgroundImage : `url(${circles})`*/}
          <div className='' style={{display : "flex" , flexDirection : "row" , justifyContent: "space-between" }}>
            <div className="" style={{ height: "60px" , width : "60px" , borderRadius :"50%", backgroundColor : "#579AD6" , display:"flex" , justifyContent: "center" , alignItems : "center"}}>
              <FaEthereum color='white' size={32} />
            </div>
            <div className='' style={{display : "flex" , flexDirection : "column"}}>
              <div className='' style={{fontFamily : "Orbitron" ,color : "white" , marginBottom : "8px" , fontSize : "17px"}}>
              {currentAccount.substring(0,10)}...{currentAccount.substring(currentAccount.length-10,currentAccount.length)}
              </div>
              <div className='' style={{display : "flex" , justifyContent : "right"}}>
                <button style={{borderRadius : "5px" , outlineWidth : "0" , backgroundColor : "#579AD6", color: "white" , height : "25px" , border : "none" , cursor : "pointer"}} >{connectButtonText}</button>
              </div>
            </div>
          </div>
            
            <div className='' style={{display : "flex" , flexDirection : "column"}}>
              <div className='' style={{color: "#515164" , margin: "52px 0 12px 0"}}>
                Ethereum
              </div>
              <div className='' style={{display : "flex" , flexDiretion : "row" , justifyContent : "space-between" , alignItems : "center"}}>
                <div className='' style={{ color: "white" , fontSize : "22px" , fontWeight : "600"}}>
                  {balance} {tokenName}
                </div>
                <div className='' style={{display : "flex" , flexDirection : "row" , marginRight: "30px"}}>
                  <div className='' style={{borderRadius : "50%" , backgroundColor : "#515164" , height : "30px" ,width : "30px"}}></div>
                  <div className='' style={{borderRadius : "50%" , backgroundColor : "#A0B1C0" , height : "30px" ,width : "30px" , marginLeft : "-9px"}}></div>
                </div>
              </div>
            </div>
        </div>

      </div>

        
        
        {/* <img src={tokenURI} alt="certificate" /> */}

        {/* {console.log(tokenURI)} */}

        <div className='' style={{color : "white" , margin : "70px 0 0 9vw" , paddingBottom : "50px"}}>
          <div className='' style={{fontSize : "22px" , fontWeight : "500" , marginBottom : "30px"}}>
            My Collections
          </div>
        
        {(tokenURI.length === 0) ?
        <div style={{display: "flex" , justifyContent : "center" , marginLeft : "-70px" , alignItems : "center"}}>
            <img style={{height: "190px" , width: "190px"}} src={im} />
        </div>
          : (
          <div className='' style={{ display : "flex"}}>
          {tokenURI.map((item) => {
            return (
              <div className="" style={{width: "350px" ,padding : "10px" , height : "auto" , backgroundColor : "#3b4380"  , borderRadius : "15px" , marginLeft : "30px"}}>
                        <div style={{height: "250px" }} >
                            <img style={{height: "100%" , width : "100%"   , borderRadius : "15px"}} src={item} alt="" />
                        </div>
                        <div style={{display : "flex " , flexDirection : "row" , justifyContent : "start" , margin: "10px"}}>
                        <Avatar
                            style={{ height: "55px" , width: "55px"  }}
                            avatarStyle='Circle'
                            {...avatarOptions }
                            />
                            <div>
                                <div style={{color : "white" , fontSize : "25px" , fontWeight : "500"}}>
                                    Certificate No {}
                                </div>
                                <div style={{color  :"gray"}}>
                                    Digital copy of certificate
                                </div>
                            </div>
                        </div>
                        {/* <div style={{color : "white" , fontWeight : "500" , margin : "10px" , fontSize : "18px"}}>
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
                        </div> */}

                    </div>
            )
            //  {console.log(item.toNumber())}
          })}
          </div>
  )
      }
      </div>
      </div>
    </div>
  )
}

export default Profile