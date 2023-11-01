import * as React from 'React';
import styles from './DealerInformation.module.scss';
import { IDealerInformationProps } from './IDealerInformationProps';
import { IDealerInformationState } from './IDealerInformationState';
import { escape } from '@microsoft/sp-lodash-subset';



import { ChoiceGroup, Dropdown, PrimaryButton, TextField ,Checkbox,DatePicker} from 'office-ui-fabric-react';
import ChildComponent from './ChildComponent';

export default class DealerInformation extends React.Component<IDealerInformationProps,IDealerInformationState> 
{
 constructor(props:IDealerInformationProps,state:IDealerInformationState)
 {
   super(props);
   this.state=
   {
    CallRecordNumber:'',
    Date:'',
    Taker:'',
    DealerName:'',
    DealerContact:'',
    EmailAddress:'',
    Machine:'',
    MachineSN:'',
    Customer:'',
    LinkageInterface:'',
    Width:'',
    Capacity:'',
    WorkToolProductFamily:'',
    Get:'',
    OrderInformation:'',
    Quote:'',
    DiscPer:''
   }
 }

 private RenderChildCompoValues(calValue){
    this.setState({DealerName:calValue})
 }

  public render(): React.ReactElement<IDealerInformationProps> {
    return (
      <div className={ styles.dealerInformation }>
          <div className="ms-Grid">

            <div className="ms-Grid-row">
             <div className="ms-Grid-col ms-md12">
              <span className={ styles.header }>Dealer Information</span>
             </div>
          </div>
          <br></br>

          <div className="ms-Grid-row">
            <div className="ms-Grid-col  ms-sm12 ms-md2">
              <label>Call Record No:</label>
            </div>
            <div style={{backgroundColor:"red",padding:"30px"}} 
               className="ms-Grid-col  ms-sm12 ms-md2">
              <ChildComponent SendValueCallBacktoParent={this.RenderChildCompoValues}
                Constanstvalue={this.state.DealerName}
              />
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Date:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <DatePicker
            placeholder="Select a date..."
             ariaLabel="Select a date"/>
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Taker:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <label style={{fontWeight: "bold", fontSize: 20}}>Jivan Siraskar</label>
            </div>
            
          </div>

          <br></br>
          <div className="ms-Grid-row  ms-sm12 ms-md12">
            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Dealer Name:</label>
            </div>
            <div className="ms-Grid-col ms-md3">
            <Dropdown placeholder='Select Dealer Name'
             options={[
              {key:"Jivan",text:"Jivan"},
              {key:"Ram",text:"Ram"},
              {key:"Rahul",text:"Rahul"}]}
             selectedKey={this.state.DealerName}
             onChange={(evt,options)=>{this.setState({ DealerName:options.text })}}
             ></Dropdown>
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Dealer Contact:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Dealer Contact' value={this.state.DealerContact} onChange={(evt,newValue)=>{ this.setState({DealerContact:newValue})}}></TextField>
            </div>

            <div className="ms-Grid-col ms-md1">
              <label>Email Address:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <Dropdown options={[{key:"Jivan.siraskar@yash.com",text:"Jivan.siraskar@yash.com"},{key:"ram@yash.com",text:"ram@yash.com"},{key:"Rahul@yash.com",text:"Rahul@yash.com"}]}></Dropdown>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row  ms-sm12 ms-md12">
            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Machine:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Machine' value={this.state.Machine} onChange={(evt,newValue)=>{ this.setState({Machine:newValue})}}></TextField>
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>MachineSN:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter MachineSN' value={this.state.MachineSN} onChange={(evt,newValue)=>{ this.setState({MachineSN:newValue})}}></TextField>
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Customer:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Customer' value={this.state.Customer} onChange={(evt,newValue)=>{ this.setState({Customer:newValue})}}></TextField>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row  ms-sm12 ms-md12">
            <div className="ms-Grid-col ms-md1">
              <label>Linkage/Interface:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Linkage/Interface' value={this.state.LinkageInterface} onChange={(evt,newValue)=>{ this.setState({LinkageInterface:newValue})}}></TextField>
            </div>

            <div className="ms-Grid-col ms-md1">
              <label>Width:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Width' value={this.state.Width} onChange={(evt,newValue)=>{ this.setState({Width:newValue})}}></TextField>
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Capacity:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Capacity' value={this.state.Capacity} onChange={(evt,newValue)=>{ this.setState({Capacity:newValue})}}></TextField>
            </div>
          </div>

          <br></br>
          <div className="ms-Grid-row  ms-sm12 ms-md12">
            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Work Tool Product Family:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Work Tool Product Family' value={this.state.WorkToolProductFamily} onChange={(evt,newValue)=>{ this.setState({WorkToolProductFamily:newValue})}}></TextField>
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>GET:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter GET' value={this.state.Get} onChange={(evt,newValue)=>{ this.setState({Get:newValue})}}></TextField>
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md1">
              <label>Order Information:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Order Information' value={this.state.OrderInformation} onChange={(evt,newValue)=>{ this.setState({OrderInformation:newValue})}}></TextField>
            </div>
          </div>


          <br></br>
          <div className="ms-Grid-row  ms-sm12 ms-md12">
            <div className="ms-Grid-col  ms-sm12 ms-md2">
              <label>Quote/Sales From Link:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <Checkbox label="Follow Up" />
            </div>

            <div className="ms-Grid-col  ms-sm12 ms-md2">
              <label>Discount Percentage:</label>
            </div>
            <div className="ms-Grid-col  ms-sm12 ms-md3">
            <TextField placeholder='Enter Discount Percentage' value={this.state.DiscPer} onChange={(evt,newValue)=>{ this.setState({DiscPer:newValue})}}></TextField>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
