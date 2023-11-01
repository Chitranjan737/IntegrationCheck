import * as React from 'react';
import styles from './EmployeeMaster.module.scss';
import { IEmployeeMasterProps } from './IEmployeeMasterProps';
import { IEmployeeMasterState } from './IEmployeeMasterState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Constant from './../../../Common/Constant';

import { ChoiceGroup, Dropdown, PrimaryButton, TextField ,Checkbox, DefaultButton} from 'office-ui-fabric-react';

export default class EmployeeMaster extends React.Component<IEmployeeMasterProps,IEmployeeMasterState>
 {
  constructor(props:IEmployeeMasterProps,state:IEmployeeMasterState)
  {
    super(props);
    this.state=
    {
      Name:'',
      Address:'',
      Zipcode:'',
      Country:'',
      Gender:'',
      Preference:'',
      Phone:'',
      Email:'',
      Password:'',
      VerifyPassword:'',

      errMsgName:'',
      errMsgAddress:'',
      errMsgZipcode:'',
      errMsgCountry:'',
      errMsgGender:'',
      errMsgPreference:'',
      errMsgPhone:'',
      errMsgEmail:'',
      errMsgPassword:'',
      errMsgVerifyPassword:'',
      errMsgValidPhone:''

    };
  }
  handleSubmit = () => {
    const { Password, VerifyPassword } = this.state;
    // perform all neccassary validations
    if (Password !== VerifyPassword) {
        alert("Passwords don't match");
    } else {
        // make API call
    }
}
private SubmitData(){
  let isValid=true;

  if(!this.state.Name){
    isValid=false;
    this.setState({errMsgName:Constant.ERR_MSG_Name})
  }
  if(!this.state.Zipcode){
    isValid=false;
    this.setState({errMsgZipcode:Constant.err_Msg_Zipcode})
  }
  if(!this.state.Country){
    isValid=false;
    this.setState({errMsgCountry:Constant.err_Msg_Country})
  }
  if(!this.state.Gender){
    isValid=false;
    this.setState({errMsgGender:Constant.err_Msg_Gender})
  }
  if(!this.state.Phone){
    isValid=false;
    this.setState({errMsgPhone:Constant.err_Msg_Phone})
  }
  if(!this.state.Email){
    isValid=false;
    this.setState({errMsgEmail:Constant.err_Msg_Email})
  }
  if(!this.state.Password){
    isValid=false;
    this.setState({errMsgPassword:Constant.err_Msg_Password})
  }
  if(!this.state.VerifyPassword){
    isValid=false;
    this.setState({errMsgVerifyPassword:Constant.err_Msg_VerifyPassword})
  }
  if(!isValid)
  return isValid;
}

  public render(): React.ReactElement<IEmployeeMasterProps> {
    return (
      <div className={ styles.employeeMaster }>
       <div className="ms-Grid">

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-md12">
              <span className={ styles.header }>Employee Creation</span>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Name:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <TextField placeholder='Enter Name' value={this.state.Name} 
            errorMessage={this.state.errMsgName} 
            onChange={(evt,newValue)=>{
            this.setState({
              Name:newValue,
              errMsgName:newValue?"":Constant.ERR_MSG_Name
            });
          }}
            ></TextField>
            
            </div>
            
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Address:</label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <TextField placeholder='Enter Address' value={this.state.Address} ></TextField>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Zipcode: <span style={{color:"red"}}>*</span> </label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <TextField maxLength={6} placeholder='Enter Zipcode' value={this.state.Zipcode}
            errorMessage={this.state.errMsgZipcode} 
            onChange={(evt,newValue)=>{
            this.setState({
              Zipcode:newValue,
              errMsgZipcode:newValue?
              (( /\d./.test(newValue)?"":Constant.err_Msg_ValidZipcode))
              :Constant.err_Msg_Zipcode
            });
          }}
            ></TextField>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Country:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
           <Dropdown 
           options={[{key:"India",text:"India"},{key:"US",text:"US"},{key:"UK",text:"UK"}]}
           errorMessage={this.state.errMsgCountry} 
           ></Dropdown>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Gender:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <ChoiceGroup  options={[{ key:"Male",text:"Male" },{ key:"Female",text:"Female" }]}  required={true} />
             </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Preference:</label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md2">
            <Checkbox label="Red" />
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md2">
            <Checkbox label="Green" />
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md2">
            <Checkbox label="Blue" />
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Phone:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <TextField maxLength={10} placeholder='Enter Phone' value={this.state.Phone} 
              errorMessage={this.state.errMsgPhone} 
              onChange={(evt,newValue)=>{
              this.setState({
                Phone:newValue,
                errMsgPhone:(newValue?
                  (( /\d./.test(newValue)?"":Constant.err_Msg_ValidPhone))
                  :Constant.err_Msg_Phone),
                
              });
              //Condition1?(condition2?(codition3?true:false):true):false
            }}
            ></TextField>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Email:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <TextField placeholder='Enter Email' value={this.state.Email} 
             errorMessage={this.state.errMsgEmail}
             onChange={(evt,newValue)=>{
              this.setState({
                Email:newValue,
                errMsgEmail:(newValue?
                  (( /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(newValue)?"":Constant.err_Msg_ValidEmail))
                  :Constant.err_Msg_Email),
              });
            }}

            ></TextField>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Password(6-8 Characters):<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <TextField maxLength={10} minLength={6} placeholder='Enter Password' value={this.state.Password} 
             errorMessage={this.state.errMsgPassword}
             onChange={(evt,newValue)=>{
              this.setState({
                Password:newValue,
                errMsgPassword:(newValue?
                  (( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(newValue)?"":Constant.err_Msg_ValidPassword))
                  :Constant.err_Msg_Password),
              });
            }}


            ></TextField>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Verify Password:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <TextField maxLength={10} minLength={6} placeholder='Enter Verify Password' value={this.state.VerifyPassword} 
             errorMessage={this.state.errMsgVerifyPassword}
             onChange={(evt,newValue)=>{
              //this.handleSubmit()
              this.setState({
                VerifyPassword:newValue,
                errMsgVerifyPassword:(newValue?
                  (( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(newValue)?"":Constant.err_Msg_ValidPassword))
                  :Constant.err_Msg_VerifyPassword),
              });
            }}
            onBlur={(evt)=>{this.handleSubmit()}}
            ></TextField>
            </div>
          </div>


          <br></br>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md1">
              <PrimaryButton onClick={(evt)=>{this.SubmitData()}}>Send</PrimaryButton>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md1">
            <DefaultButton>Clear</DefaultButton>
            </div>
          </div>



        </div>
      </div>
    );
  }
}
