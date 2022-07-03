import React from 'react'
import { FaEthereum } from "react-icons/fa";
import {AiOutlineArrowRight} from "react-icons/ai"

function TransactionHistory() {
  return (
    <div className='' style={{backgroundColor : "#0A0B1E" , height : "100vh"}}>
        <div className='' style={{margin : '0 15vw 0 15vw'}}>
            <div className='' style={{color: "white" , fontSize : "25px" , padding : "100px 0 60px 0"}}>
                Transaction History
            </div>
            <div className='' style={{color : "grey"}}>
                <div className='' style={{ width : "70vw" , backgroundColor : "transparent" , border : "grey solid 2px" , borderRadius : "20px" , padding  : "40px"}}>
                    <div className='' style={{display : "flex" , flexDirection : "row" , alignItems : "center" , justifyContent: "start"}}>
                        <div className="" style={{ height: "40px" , width : "40px" , borderRadius :"50%", backgroundColor : "#579AD6" , display:"flex" , justifyContent: "center" , alignItems : "center"}}>
                            <FaEthereum color='white' size={20} />
                        </div>
                        <div className='' style={{margin : " 0 20px 0 20px"}}>
                            #lkjoiwjero89380-49-0123230-03
                        </div>
                         <AiOutlineArrowRight style={{margin : " 0 20px 0 0px"}} color="white" size={22} />
                        <div className="" style={{ height: "40px" , width : "40px" , borderRadius :"50%", backgroundColor : "#579AD6" , display:"flex" , justifyContent: "center" , alignItems : "center"}}>
                            <FaEthereum color='white' size={20} />
                        </div>
                        <div className='' style={{margin : " 0 20px 0 20px"}}>
                            #lkjoiwjero89380-49-0123230-03
                        </div>
                        <div className=''style={{}}>
                        <button style={{borderRadius : "5px" , outlineWidth : "0" , backgroundColor : "#579AD6", color: "white" , border : "none" , cursor : "pointer" , fontWeight : "200" , padding : "10px"}} >Know More</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionHistory