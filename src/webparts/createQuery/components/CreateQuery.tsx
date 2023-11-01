import * as React from 'react';
import styles from './CreateQuery.module.scss';
import 'office-ui-fabric-core/dist/css/fabric.min.css';
import { ICreateQueryProps } from './ICreateQueryProps';
import { ICreateQueryState } from './ICreateQueryState';
import * as Constant from './../../../Common/Constant';
import { escape } from '@microsoft/sp-lodash-subset';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientCommonConfiguration, ISPHttpClientConfiguration, SPHttpClientResponse,ISPHttpClientOptions } from '@microsoft/sp-http';

import {IDropdownOption, ChoiceGroup, Dropdown, PrimaryButton, TextField ,Checkbox, DefaultButton, Stack, IChoiceGroup, textAreaProperties, IChoiceGroupOption} from 'office-ui-fabric-react';
import { rest } from 'lodash';


export default class CreateQuery extends React.Component<ICreateQueryProps,ICreateQueryState> {
  private params = new UrlQueryParameterCollection(window.location.href);
  private ItemId = this.params.getValue("ItemId");
  constructor(props:ICreateQueryProps,state:ICreateQueryState)
  {
    super(props);
    this.state=
    {
      QueryType:'',
      ProjectCode:'',
      ProjectTitle:'',
      Industry:'',
      ProcessArea:'',
      QueryTitle:'',
      QueryDiscription:'',
      DocumentAffected:'',
      RecommededSolution:'',
      UploadDocument:'',

      errMsgQueryType:'',
      errMsgProjectCode:'',
      errMsgProjectTitle:'',
      errMsgIndustry:'',
      errMsgProcessArea:'',
      errMsgQueryTitle:'',
      errMsgQueryDiscription:'',
      errMsgDocumentAffected:'',
      errMsgRecommededSolution:'',
      errMsgUploadDocument:''

    };
   /*if(this.ItemId)
    {
      this.LoadData();
    } 
  */
    
  }

  /*private LoadData(){
    let restapi = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('Query')/items("+this.ItemId+")?$select=*";
  
    this.props.context.spHttpClient.get(restapi, SPHttpClient.configurations.v1)
      .then((Response: SPHttpClientResponse) => {
        if (Response.ok) {
          Response.json().then((ResponseJson) => {
            debugger;
            if (ResponseJson != null && ResponseJson != null) {
              this.setState({
                QueryTitle:ResponseJson.QueryTitle,
                QueryType:ResponseJson.QueryType
              })
            }
          })
          .catch(err=>{
            alert(err)
          })
        }
      })
      .catch(err=>{
        alert(err)
      })
  }
  */

  private HandleDropdownChange(e,selectedvalue:IDropdownOption)
  {
    this.setState({ProjectCode:selectedvalue.key.toString(),ProjectTitle:selectedvalue.data.projectdescription})
  }

_onchange(option:IChoiceGroupOption){
  this.setState({ QueryType:option.text })
}

  private async SubmitData(){
    let isValid=true;
  
    if(!this.state.QueryType){
      isValid=false;
      this.setState({errMsgQueryType:Constant.err_Msg_QueryType})
    }
    if(!this.state.ProjectCode){
      isValid=false;
      this.setState({errMsgProjectCode:Constant.err_Msg_ProjectCode})
    }
    if(!this.state.Industry){
      isValid=false;
      this.setState({errMsgIndustry:Constant.err_Msg_Industry})
    }
    if(!this.state.ProcessArea){
      isValid=false;
      this.setState({errMsgProcessArea:Constant.err_Msg_ProcessArea})
    }
    if(!this.state.QueryTitle){
      isValid=false;
      this.setState({errMsgQueryTitle:Constant.err_Msg_QueryTitle})
    }
    if(!this.state.QueryDiscription){
      isValid=false;
      this.setState({errMsgQueryDiscription:Constant.err_Msg_QueryDiscription})
    }
    if(!this.state.DocumentAffected){
      isValid=false;
      this.setState({errMsgDocumentAffected:Constant.err_Msg_DocumentAffected})
    }
    if(!this.state.RecommededSolution){
      isValid=false;
      this.setState({errMsgRecommededSolution:Constant.err_Msg_RecommededSolution})
    }
    if(!isValid)
    return isValid;
    if(isValid){
      let restapiforCurrentuserId = this.props.context.pageContext.web.absoluteUrl + "/_api/web/CurrentUser";
      let userinfo:SPHttpClientResponse = await this.props.context.spHttpClient.get(restapiforCurrentuserId, SPHttpClient.configurations.v1)
      
      let ResponseJson = await userinfo.json()
      let userid = ResponseJson.Id;
      
      
      let restapi = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('Query')/items";
      const options:ISPHttpClientOptions = {
        body:`{
          Title:'${this.state.QueryTitle}',
          QueryType:'${this.state.QueryType}',
          ProjectCode:'${this.state.ProjectCode}',
          ProjectTitle:'${this.state.ProjectTitle}',
          Industry:'${this.state.Industry}',
          ProcessArea:'${this.state.ProcessArea}',
          QueryTitle:'${this.state.QueryTitle}',
          QueryDiscription:'${this.state.QueryDiscription}',
          DocumentAffected:'${this.state.DocumentAffected}',
          RecommededSolution:'${this.state.RecommededSolution}',
           SubmittedById:${userid}
        }`
      }
      this.props.context.spHttpClient.post(restapi,  SPHttpClient.configurations.v1,options)
      .then((data:SPHttpClientResponse)=>{
        data.json()
        .then(responsevalue=>{
          alert(responsevalue)
        })
      })
      .catch(err=>{
        alert(err)
      })


    }
  }

  private ClearData(){

  }
  
  public render(): React.ReactElement<ICreateQueryProps> {
    return (
      <div className={ styles.createQuery }>
        <div className="ms-Grid">

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-md12">
              <span style={{fontWeight: "bold" ,fontSize: 20}}>Create Querey</span>
          </div>
        </div>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Query Type:</label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md4">
            <ChoiceGroup  options={[{ key:"TTQ",text:"TTQ" },{ key:"OTQ",text:"OTQ" },{ key:"PCQ",text:"PCQ" }]} 
            selectedKey={this.state.QueryType}
              required={true} onChange={(evt,option)=>{this._onchange(option);}}
           />
            </div>
          </div>
  {this.state.QueryType &&
      <div>
          
          <div  className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Project Code:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md4">

            <Dropdown placeholder='Select Project Code'
            options={[{ key: "Code1", text: "Code1",data:{projectdescription:"Code1 selected"} },
            { key: "Code2", text: "Code2",data:{projectdescription:"Code2 selected"}  }]}
            selectedKey={this.state.ProjectCode}
            errorMessage={this.state.errMsgProjectCode} 
            onChange={(evt,option)=>{this.HandleDropdownChange(evt,option)}}
            ></Dropdown>

            </div>

            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Project Title:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md4">
             <TextField value={this.state.ProjectTitle}disabled></TextField>
            </div>
          </div>

          
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Industry:</label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md4">
              <Dropdown placeholder='Select Industry' 
              options={[{key:"Industry1",text:"Industry1"},{key:"Industry2",text:"Industry2"}]}
              errorMessage={this.state.errMsgIndustry} 
              onChange={(evt,options)=>{this.setState({ Industry:options.text })}}
              ></Dropdown>
            </div>

            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Process Area:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md4">
            <Dropdown placeholder='Select Process Area' 
              options={[{key:"Area1",text:"Area1"},{key:"Area2",text:"Area2"}]}
              errorMessage={this.state.errMsgProcessArea}
              onChange={(evt,options)=>{this.setState({ ProcessArea:options.text })}}
              ></Dropdown>
            </div>
          </div>

     
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Query Title:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md10">
            <TextField  placeholder='Enter Query Title' value={this.state.QueryTitle}
            errorMessage={this.state.errMsgQueryTitle}
            onChange={(evt,newValue)=>{
              this.setState({
                QueryTitle:newValue,
                errMsgQueryTitle:newValue?"":Constant.err_Msg_QueryTitle
              });
            }}
            ></TextField>
            </div>
          </div>

          
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Query Discription:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md10">
            <TextField  placeholder='Enter Query Discription' value={this.state.QueryDiscription}
            errorMessage={this.state.errMsgQueryDiscription}
            onChange={(evt,newValue)=>{
              this.setState({
                QueryDiscription:newValue,
                errMsgQueryDiscription:newValue?"":Constant.err_Msg_QueryDiscription
              });
            }}
            ></TextField>
            </div>
          </div>

     
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Document Affected:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md10">
            <TextField  placeholder='Enter Document Affected' value={this.state.DocumentAffected}
              errorMessage={this.state.errMsgDocumentAffected}
              onChange={(evt,newValue)=>{
                this.setState({
                  DocumentAffected:newValue,
                  errMsgDocumentAffected:newValue?"":Constant.err_Msg_DocumentAffected
                });
              }}
            ></TextField>
            </div>
          </div>
          
     
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Recommeded Solution:<span style={{color:"red"}}>*</span></label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md10">
            <TextField  placeholder='Enter Recommeded Solution' value={this.state.RecommededSolution}
            errorMessage={this.state.errMsgRecommededSolution}
            onChange={(evt,newValue)=>{
              this.setState({
                RecommededSolution:newValue,
                errMsgRecommededSolution:newValue?"":Constant.err_Msg_RecommededSolution
              });
            }}
            ></TextField>
            </div>
          </div> 
          
      
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <label>Upload Document:</label>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md10">

              
            </div>
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <Stack horizontal tokens={{ childrenGap:15}}>
              <PrimaryButton onClick={(evt)=>{this.SubmitData()}}>Submit</PrimaryButton>
           
              <DefaultButton>Cancel</DefaultButton>
              </Stack>
             
            </div>
          </div>
      
    </div>
  }
   </div>
      </div>
    );
  }
}

