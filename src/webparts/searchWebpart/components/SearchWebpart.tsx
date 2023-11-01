import * as React from 'react';
import styles from './SearchWebpart.module.scss';
import { ISearchWebpartProps } from './ISearchWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceGroup, DatePicker, DefaultButton, Dropdown, IChoiceGroupOption, IDropdownOption, IStackTokens, Label, PrimaryButton, Stack, StackItem, TextField } from 'office-ui-fabric-react';
import { ISearchWebpartState } from './ISearchWebpartState';
import { err_Msg_ProjectTitle } from '../../../Common/Constant';


const tokensize: IStackTokens = {
  childrenGap: 15
}
const options: IChoiceGroupOption[] = [
  { key: 'A', text: 'Transmittal' },
  { key: 'B', text: 'Advanced Search' },
];
export default class Search extends React.Component<ISearchWebpartProps, ISearchWebpartState> {
  d=new Date()
  constructor(props: ISearchWebpartProps, state: ISearchWebpartState) {
    super(props);
    this.state = {
      isActiveA: 'true',
      isActiveB: '',
     
      SearchBy:'',
      ProjectCode: '',
      TransmittalNumber: '',
      Discription: '',
      FromDate: this.d,
      ToDate: this.d,
      Industry: '',
      ProcessArea: '',
      DocumentType: '',
      Discipline: '',
      Sub_PrcessArea: '',
      ProjectTitle:'',

      errMsgSearchBy:'',
      errMsgProjectCode: '',
      errMsgTransmittalNumber: '',
      errMsgDiscription: '',
      errMsgFromDate: '',
      errMsgToDate: '',
      errMsgIndustry: '',
      errMsgProcessArea: '',
      errMsgDocumentType: '',
      errMsgDiscipline: '',
      errMsgSub_PrcessArea: '',
      errMsgProjectTitle:'',
    };
  }

  private HandleDropdownChange(e,selectedvalue:IDropdownOption)
  {
    this.setState({ProjectCode:selectedvalue.key.toString(),ProjectTitle:selectedvalue.data.projectdescription})
  }
  
  private _onChangechoice(e, option) {
    if (option.key == 'A') {
      this.setState({ isActiveA: 'true' });
      this.setState({ isActiveB: '' });
    }
    if (option.key == 'B') {
      this.setState({ isActiveA: '' });
      this.setState({ isActiveB: 'true' });
    }
  }

  public render(): React.ReactElement<ISearchWebpartProps> {
    return (
      <div className={styles.searchWebpart}>

        <div className='ms-Grid'>

          <div className='ms-Grid'>
            <div className='ms-Grid-row'>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                <Label>Search</Label>
              </div>
            </div>
          </div>
          <div className='ms-Grid'>
            <div className='ms-Grid-row'>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Label>Search By</Label>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                <ChoiceGroup options={options} onChange={(evt, option) => { this._onChangechoice(evt, option) }} placeholder="Please select gender" required={true} defaultSelectedKey="A" />
              </div>
            </div>
          </div>

          {this.state.isActiveA &&
            <div>
              <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Project Code</Label>
                    <Dropdown placeholder='Select Project Code'
                      options={
                        [
                         { key: "Code1", text: "Code1",
                          data:{projectdescription:"Code1 selected"} },
                         { key: "Code2", text: "Code2",
                          data:{projectdescription:"Code2 selected"} 
                        }]}
                      selectedKey={this.state.ProjectCode}
                      onChange={(evt,option)=>{this.HandleDropdownChange(evt,option)}}
                    ></Dropdown>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                     <label>Project Title:</label>
                     <TextField value={this.state.ProjectTitle}disabled></TextField>
                  </div>
                 
                </div>
              </div>
              <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Transmittal Number</Label>
                    <TextField placeholder='Enter Transmittal Number' errorMessage={this.state.errMsgTransmittalNumber}
                      onChange={(evt, newValue) => this.setState({ TransmittalNumber: newValue, errMsgTransmittalNumber: newValue ? (/\d/.test(newValue) ? "" : "Please enter only Number") : "Please enter TransmittalNumber" })} />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>From Date</Label>
                    <DatePicker
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>To Date</Label>
                    <DatePicker
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                    />
                  </div>
                </div>
              </div>
              <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Description</Label>
                    <TextField placeholder='Enter the Description' errorMessage={this.state.errMsgDiscription}
                      onChange={(evt, newValue) => this.setState({ Discription: newValue, errMsgDiscription: newValue ? "" : "Please enter the Description" })} />
                  </div>
                </div>
              </div>
              <div className='ms-grid'>
                <div className='ms-grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                    <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 15 }}>
                      <PrimaryButton text="Search" /*onClick={(evt) => } */ />
                      <PrimaryButton text="Clear Search" /*onClick={(evt) => }*/ />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          }

          {this.state.isActiveB &&
            <div>
              <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Project Code</Label>
                    <Dropdown placeholder='Select Project Code'
                      options={
                        [
                         { key: "Code1", text: "Code1",
                          data:{projectdescription:"Code1 selected"} },
                         { key: "Code2", text: "Code2",
                          data:{projectdescription:"Code2 selected"} 
                        }]}
                      selectedKey={this.state.ProjectCode}
                      onChange={(evt,option)=>{this.HandleDropdownChange(evt,option)}}
                    ></Dropdown>
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                     <label>Project Title:</label>
                     <TextField value={this.state.ProjectTitle}disabled></TextField>
                  </div>
                </div>
              </div>

              <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Industry</Label>
                    <Dropdown
                      placeholder="Select Industry"
                      options={[
                        { key: 'A', text: 'India' },
                        { key: 'B', text: 'Armenia' },
                        { key: 'C', text: 'Australia' },
                        { key: 'D', text: 'Brazil' },
                        { key: 'E', text: 'Canada' },
                      ]} errorMessage={this.state.errMsgIndustry} onChange={(evt, newValue) => this.setState({ Industry: newValue.text, errMsgIndustry: newValue.text ? "" : "Please select Industry" })} />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Process Area</Label>
                    <Dropdown
                      placeholder="Select Process Area"
                      options={[
                        { key: 'A', text: 'India' },
                        { key: 'B', text: 'Armenia' },
                        { key: 'C', text: 'Australia' },
                        { key: 'D', text: 'Brazil' },
                        { key: 'E', text: 'Canada' },
                      ]} errorMessage={this.state.errMsgProcessArea} onChange={(evt, newValue) => this.setState({ ProcessArea: newValue.text, errMsgProcessArea: newValue.text ? "" : "Please select process area" })} />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Description</Label>
                    <TextField placeholder='Enter the Description' errorMessage={this.state.errMsgDiscription}
                      onChange={(evt, newValue) => this.setState({ Discription: newValue, errMsgDiscription: newValue ? "" : "Please enter the Discription" })} />
                  </div>
                </div>
              </div>
              <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Document Type</Label>
                    <Dropdown
                      placeholder="Select Document Type"
                      options={[
                        { key: 'A', text: 'India' },
                        { key: 'B', text: 'Armenia' },
                        { key: 'C', text: 'Australia' },
                        { key: 'D', text: 'Brazil' },
                        { key: 'E', text: 'Canada' },
                      ]} /* errorMessage={this.state.errMsgCountry} onChange={(evt, newValue) => this.setState({Country:newValue.text, errMsgCountry: newValue.text ? "":constant.ERR_MSG_Country})}*/ />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Discipline</Label>
                    <Dropdown
                      placeholder="Select Discipline"
                      options={[
                        { key: 'A', text: 'India' },
                        { key: 'B', text: 'Armenia' },
                        { key: 'C', text: 'Australia' },
                        { key: 'D', text: 'Brazil' },
                        { key: 'E', text: 'Canada' },
                      ]} /* errorMessage={this.state.errMsgCountry} onChange={(evt, newValue) => this.setState({Country:newValue.text, errMsgCountry: newValue.text ? "":constant.ERR_MSG_Country})}*/ />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>Sub-Process Area</Label>
                    <Dropdown
                      placeholder="Select Sub-Process Area"
                      options={[
                        { key: 'A', text: 'India' },
                        { key: 'B', text: 'Armenia' },
                        { key: 'C', text: 'Australia' },
                        { key: 'D', text: 'Brazil' },
                        { key: 'E', text: 'Canada' },
                      ]} /* errorMessage={this.state.errMsgCountry} onChange={(evt, newValue) => this.setState({Country:newValue.text, errMsgCountry: newValue.text ? "":constant.ERR_MSG_Country})}*/ />
                  </div>
                </div>
              </div>
              <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>From Date</Label>
                    <DatePicker
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                    />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                    <Label>To Date</Label>
                    <DatePicker
                      placeholder="Select a date..."
                      ariaLabel="Select a date"
                    />
                  </div>
                </div>
              </div>
              <div className='ms-grid'>
                <div className='ms-grid-row'>
                  <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
                    <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 15 }}>
                      <PrimaryButton text="Search" /*onClick={(evt) => } */ />
                      <PrimaryButton text="Clear Search" /*onClick={(evt) => }*/ />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
