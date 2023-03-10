import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OTPInput, { ResendOTP } from "otp-input-react";
import { loginWithOtp } from '../../redux/slices/loginSlice';

const Otp = ({userName,password}) => {
    const [otp, setOtp] = useState("");
    const [ip, setIp] = useState("");
    const [toggle, setToggle] = useState(false)
    const [isSnackBar, setIsSnackBar] = useState(false)
    const [showSuccessMessage, setsuccessMessage] = useState('');
    const [showErrorMessage, setErrorMessage] = useState('');
  const navigate=  useNavigate()
    
  const dispatch=  useDispatch()
   const {loggedInUser}=   useSelector(state=>state.loginSlice.loggetInWithOTP)
    useEffect(() => {
      if(loggedInUser===false && toggle ){
          if(!loggedInUser.Id ){
              setIsSnackBar(true)
              setErrorMessage("Invalid OTP")
              setsuccessMessage("")
          }
        }
      if(loggedInUser?.Id){
          setToggle(false)
          // setFormCount(1)
          setIsSnackBar(true)
          // setsuccessMessage("Login Successful")
          navigate("/")
          console.log("logged");
        }
      
      
    }, [loggedInUser,toggle])
    
    const renderTime2 = () => React.Fragment;
    const renderButton2 = (buttonProps) => {
      return (
        <div className="resendotp col-12 mx-auto pt-3">
          <p {...buttonProps} className="col-12 d-block">
            {buttonProps.remainingTime !== 0 ? (
              <p>
                {" "}
                Please wait for{" "}
                <span style={{ color: "#CA3060" }}>
                  {" "}
                  {`${buttonProps.remainingTime} sec`}
                </span>
              </p>
            ) : (
              <p>
                Not received OTP?{" "}
                <a>
                  <span style={{ color: "#CA3060" }} onClick={()=>{dispatch(loginWithOtp({   userName,   password,  ip,  otp,  }))}}>Resend OTP</span>
                </a>
              </p>
            )}
          </p>
        </div>
      );
    };
  return (
    <>
    <form>
                       <div className="row">
                         <div className="col-lg-12  mx-auto p-0">
                           <div className="otpform-in">
                             <div
                               id="otp"
                               className="row row-flex justify-content-center mt-1"
                             >
                               <OTPInput
                                 className="text-dark"
                                 value={otp}
                                 onChange={setOtp}
                                 autoFocus
                                 autocomplete="off"
                                 OTPLength={6}
                                 otpType="number"
                                 disabled={false}
                               />
         
                               <ResendOTP
                                 renderButton={renderButton2}
                                 renderTime={renderTime2}
                               />
                               <div class="col-lg-12">
                                 <div class="otp-btnCol btnTopSpace">
                                   <button
                                     type="button"
                                     class="btn otp-btn btn-primery modal-loading-btn"
                                     id="addmoneymodal"
                                     disabled={otp.length == 6 ? false : true}
                                     onClick={()=>{
                                       // !loading &&
                                        dispatch(loginWithOtp({ userName,   password,
                                       ip,
                                       otp,
                                     }))
                                 setToggle(true)
                                 setTimeout(() => {
                                   setToggle(false)
                                 }, 4000);
                                   }}
                                   >
                                     "Verify & Proceed"
                                     {/* {loading ? (
                                       <LoadingBar class="" />
                                     ) : (
                                       "Verify & Proceed"
                                     )} */}
                                   </button>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     </form>
                     {/* <MuiSnackBar
             open={isSnackBar}
             setOpen={setIsSnackBar}
             successMsg={showSuccessMessage}
             errorMsg={showErrorMessage}
             setSuccess={setsuccessMessage}
             setError={setErrorMessage}
           /> */}
   </>
  )
}

export default Otp