import * as React from 'react';
import styles from './UploadInformation.module.scss';
import { IUploadInformationProps } from './IUploadInformationProps';
import { IUploadInformationState } from './IUploadInformationState';
import * as Constant from './../../../Common/Constant';
import { escape } from '@microsoft/sp-lodash-subset';


import {IDropdownOption, ChoiceGroup, Dropdown, PrimaryButton, TextField ,Checkbox, DefaultButton, Stack, IChoiceGroup, textAreaProperties} from 'office-ui-fabric-react';
export default class UploadInformation extends React.Component<IUploadInformationProps, IUploadInformationState>
 {

  constructor(props:IUploadInformationProps,state:IUploadInformationState)
  {
    super(props);
    this.state=
    {
      Client:'',
      ProjectCode:'',
      ProjectTitle:'',
      Industry:'',
      ProcessArea:'',
      SubProcessArea:'',
      Subject:'',
      To:'',
      CC:'',
      DocumentNumber:'',
      Revision:'',
      InitiatedBy:'',
      Comment:'',
      UploadDocument:'',

      errMsgClient:'',
      errMsgProjectCode:'',
      errMsgProjectTitle:'',
      errMsgIndustry:'',
      errMsgProcessArea:'',
      errMsgSubProcessArea:'',
      errmsgSubject:'',
      errMsgTo:'',
      errMsgCC:'',
      errMsgDocumentNumber:'',
      errMsgRevision:'',
      errMsgInitiatedBy:'',
      errMsgComment:'',
      errMsgUploadDocument:''

    };
  }

  private SubmitData(){
    let isValid=true;
  
    if(!this.state.Client){
      isValid=false;
      this.setState({errMsgClient:Constant.err_Msg_Client})
    }
    if(!this.state.ProjectCode){
      isValid=false;
      this.setState({errMsgProjectCode:Constant.err_Msg_ProjectCode})
    }
    if(!this.state.ProjectTitle){
      isValid=false;
      this.setState({errMsgProjectTitle:Constant.err_Msg_ProjectTitle})
    }
    if(!this.state.Industry){
      isValid=false;
      this.setState({errMsgIndustry:Constant.err_Msg_Industry})
    }
    if(!this.state.ProcessArea){
      isValid=false;
      this.setState({errMsgProcessArea:Constant.err_Msg_ProcessArea})
    }
    if(!this.state.SubProcessArea){
      isValid=false;
      this.setState({errMsgSubProcessArea:Constant.err_Msg_Sub_PrcessArea})
    }
    if(!this.state.Subject){
      isValid=false;
      this.setState({errmsgSubject:Constant.err_Msg_Subject})
    }
    if(!this.state.To){
      isValid=false;
      this.setState({errMsgTo:Constant.err_Msg_To})
    }
    if(!this.state.CC){
      isValid=false;
      this.setState({errMsgCC:Constant.err_Msg_CC})
    }
    if(!this.state.DocumentNumber){
      isValid=false;
      this.setState({errMsgDocumentNumber:Constant.err_Msg_DocumentNumber})
    }
    if(!this.state.Revision){
      isValid=false;
      this.setState({errmsgSubject:Constant.err_Msg_Subject})
    }
    if(!this.state.InitiatedBy){
      isValid=false;
      this.setState({errMsgInitiatedBy:Constant.err_Msg_InitiatedBy})
    }
    if(!this.state.Comment){
      isValid=false;
      this.setState({errMsgComment:Constant.err_Msg_Comment})
    }
    if(!this.state.UploadDocument){
      isValid=false;
      this.setState({errMsgUploadDocument:Constant.err_Msg_UploadDocument})
    }
    if(!isValid)
    return isValid;
  }
  

  public render(): React.ReactElement<IUploadInformationProps> {
    return (
      <div className={ styles.uploadInformation }>
        <div className="ms-Grid">


        <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-md12">
              <span style={{fontWeight: "bold" ,fontSize: 20}}>Upload Information Document</span>
            
        </div>
        </div>

         <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Client:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">

            <Dropdown placeholder='Select Client'
            options={[{ key: "Jivan", text: "Jivan" },
            { key: "Rahul", text: "Rahul" }]}
             selectedKey={this.state.Client}
             errorMessage={this.state.errMsgClient}
            //onChange={(evt,option)=>{this.HandleDropdownChange(evt,option)}}
            ></Dropdown>

            </div>

            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Project Code:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">

            <Dropdown placeholder='Select Project Code'
            options={[{ key: "Code1", text: "Code1",data:{projectdescription:"Code1 selected"} },
            { key: "Code2", text: "Code2",data:{projectdescription:"Code2 selected"}  }]}
            selectedKey={this.state.ProjectCode}
            errorMessage={this.state.errMsgProjectCode}
            //onChange={(evt,option)=>{this.HandleDropdownChange(evt,option)}}
            ></Dropdown>

            </div>


        </div>

        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Industry:</label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
              <Dropdown placeholder='Select Industry' 
              options={[{key:"Industry1",text:"Industry1"},{key:"Industry2",text:"Industry2"}]}
              errorMessage={this.state.errMsgIndustry} 
              ></Dropdown>
            </div>

            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Process Area:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
            <Dropdown placeholder='Select Process Area' 
              options={[{key:"Area1",text:"Area1"},{key:"Area2",text:"Area2"}]}
              errorMessage={this.state.errMsgProcessArea}
              ></Dropdown>
            </div>
          </div>

        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Sub Process Area:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">

            <Dropdown placeholder='Select Sub Process Area'
            options={[{ key: "Test1", text: "Test1",},
            { key: "Test2", text: "Test2", }]}
            selectedKey={this.state.SubProcessArea}
            errorMessage={this.state.errMsgSubProcessArea}
            //onChange={(evt,option)=>{this.HandleDropdownChange(evt,option)}}
            ></Dropdown>

            </div>

            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Subject:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
             <TextField placeholder='Enter Subject' 
             value={this.state.Subject}
             errorMessage={this.state.errmsgSubject}
             ></TextField>
            </div>
        </div>

        <div className="ms-Grid-row">
          
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>To:</label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
             <TextField value={this.state.To}disabled></TextField>
            </div>

            <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>CC:</label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">
             <TextField value={this.state.CC}disabled></TextField>
            </div>

        </div>

        <div className="ms-Grid-row">
          
          <div className="ms-Grid-col ms-sm12 ms-md2">
            <label>DocumentNumber:<span style={{color:"red"}}>*</span></label>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md4">
           <TextField placeholder='XXXXX-XXXX-1IT-XX' value={this.state.DocumentNumber}
           errorMessage={this.state.errMsgDocumentNumber}
           ></TextField>
          </div>


          <div className="ms-Grid-col ms-sm12 ms-md2">
              <label>Revision:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md4">

            <Dropdown placeholder='Select Revision'
            options={[{ key: "Test1", text: "Test1",},
            { key: "Test2", text: "Test2", }]}
            selectedKey={this.state.Revision}
            errorMessage={this.state.errMsgRevision}
            //onChange={(evt,option)=>{this.HandleDropdownChange(evt,option)}}
            ></Dropdown>

            </div>

        </div>

        <div className="ms-Grid-row">
          
          <div className="ms-Grid-col ms-sm12 ms-md2">
            <label>InitiatedBy:<span style={{color:"red"}}>*</span></label>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md4">
           <TextField placeholder='Enter Initiated By' value={this.state.InitiatedBy}
           errorMessage={this.state.errMsgInitiatedBy}
           ></TextField>
          </div>

          <div className="ms-Grid-col ms-sm12 ms-md2">
            <label>Comment:<span style={{color:"red"}}>*</span></label>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md4">
           <TextField placeholder='Enter Comment' value={this.state.Comment}
           errorMessage={this.state.errMsgComment}
           ></TextField>
          </div>


        </div>

        <div className="ms-Grid-row">
          
          <div className="ms-Grid-col ms-sm12 ms-md2">
            <label>UploadDocument:<span style={{color:"red"}}>*</span></label>
          </div>
          <div className="ms-Grid-col ms-sm12 ms-md4">
         
          </div>
        </div>


        <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md2">
              <Stack horizontal tokens={{ childrenGap:15}}>
              <PrimaryButton onClick={(evt)=>{this.SubmitData()}}>Submit</PrimaryButton>
           
              <DefaultButton>Cancel</DefaultButton>
              </Stack>
             
            </div>
          </div>


        </div>
      </div>
    );
  }
}
