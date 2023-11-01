import * as React from 'react';
import styles from './AssesmentTaskOne.module.scss';
import { IAssesmentTaskOneProps } from './IAssesmentTaskOneProps';
import { IAssesmentTaskOneState } from './IAssesmentTaskOneState';
import { escape, keys } from '@microsoft/sp-lodash-subset';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Checkbox, ChoiceGroup, DatePicker, DefaultButton, DetailsList, DetailsListLayoutMode, Dropdown, IChoiceGroupOption, IColumn, IDropdown, IDropdownOption, ISearchBoxStyles, Label, SearchBox, Stack, TextField } from 'office-ui-fabric-react';
import { PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';
import * as Constant from './../../../Common/Constant';
import 'office-ui-fabric-core/dist/css/fabric.min.css';
//import SubComponent from '../../../Components/SubComponent';
import { sp } from '@pnp/sp';
import "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import { SPHttpClient, SPHttpClientCommonConfiguration, ISPHttpClientConfiguration, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

import "@pnp/sp/folders";
import "@pnp/sp/files/folder";
import { UpdateType } from '@pnp/spfx-controls-react';
import { Items } from '@pnp/sp/items';

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

var items1: IDropdownOption[] = [];
var items2: IDropdownOption[] = [];



function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) {
  console.log(`The option has been changed to ${isChecked}.`);
}


export default class DealerAssessment extends React.Component<IAssesmentTaskOneProps, IAssesmentTaskOneState> {
  private _columns: ({ key: string; name: string; fieldName: string; isResizable: boolean; minWidth: number; onRender: (item: any) => JSX.Element; maxWidth?: undefined; } | { key: string; name: string; fieldName: string; minWidth: number; maxWidth: number; isResizable: boolean; onRender?: undefined; })[];

  constructor(props: IAssesmentTaskOneProps, state: IAssesmentTaskOneState) {
    super(props);
    this.state =
    {
      items1: [],
      items2: [],
      CallRecordNo: '',
      RequestOnBehalf: false,
      Requestor: '',
      JobTitle: '',
      PhoneNumber: '',
      MachineFamily: [],
      FollowUp: false,
      FollowUpDate: new Date(),
      DealerContactName: '',
      DealerContactEmail: '',
      DealerContactPhoneNumber: '',
      Comments: '',
      CallRecordAttachments: '',
      RequesterId: [],
      files: [],
      ListItems: [],
      multiValueCheckbox: [],
      ToolsItem: [],
      DealerItemList: [],
      ID: 1,

      ErrMsgCallRecordNo: '',
      ErrMsgRequestOnBehalf: '',
      ErrMsgRequestor: '',
      ErrMsgJobTitle: '',
      ErrMsgPhoneNumber: '',
      ErrMsgMachineFamily: '',
      ErrMsgFollowUp: '',
      ErrMsgFollowUpDate: '',
      ErrMsgDealerContactname: '',
      ErrMsgDealerContactEmail: '',
      ErrMsgDealerContactPhoneNumber: '',
      ErrMsgComments: '',
      ErrMsgCallRecordAttachments: ''



    };

  
    sp.setup({
      spfxContext: this.props.context

    })
  }
  
  private _onchangeDealer(option: IDropdownOption) {
    this.setState({ DealerContactName: option.text });

    this.setState({ DealerContactPhoneNumber: option.data['PhoneNo'] });

    this.setState({ DealerContactEmail: option.data['Email'] });
  }


  public async componentDidMount(): Promise<void> {
    var reacthandler = this;
    sp.web.lists.getByTitle("DealerInformation").items.get().then(function (data) {
      for (var k in data) {
        items1.push({ key: data[k].Title, text: data[k].Title, data: { PhoneNo: data[k].DealerContactPhoneNumber, Email: data[k].DEalerContactEmail } });
      }
      reacthandler.setState({ items1 });
      console.log(items1);
      return items1;
    })


    var reacthandler = this;
    sp.web.lists.getByTitle("MachineFamily").items.get().then(function (data) {
      for (var k in data) {
        items2.push({ key: data[k].Id, text: data[k].Title });
      }
      reacthandler.setState({ items2 });
      console.log(items2);
      return items2;
    })
  }


  private DropdownMachinefamily(newvalue: IDropdownOption) {

    let machineFamily = this.state.MachineFamily;
    //this.setState({ ErrMsgMachineFamily: newvalue ? "" : "Please Select Machine Family" })
    if (newvalue.selected == true) {
      //this.state.MachineFamilyId.push({ key: newvalue.key });
      machineFamily.push(newvalue.key.toString())
      //this.setState({ MachineFamilyId: MachineFamilyId })
    }
    else {
      machineFamily = machineFamily.filter(x => x != newvalue.key.toString())
    }
    this.setState({ MachineFamily: machineFamily });
  }

  private OnUserSelect(item: any) {

    let item1 = this.state.ListItems.filter(a => a.ID == item);
    let DealerArray = this.state.DealerItemList;
    var arr = [];
    let ToolArray = this.state.ToolsItem;

    this.setState({

      multiValueCheckbox: arr,

      ToolsItem: ToolArray,

      RequestOnBehalf: item1[0].RequestOnBehalf,

      PhoneNumber: item1[0].PhoneNumber,

      JobTitle: item1[0].JobTitle,

      //FollowUpDate:item1[0].FollowUpDate,

      // MachineFamily:ToolArray.filter(a => a.text == item1[0].MachineFamily)[0].key,

      //Items:item1[0].Requestor,

      FollowUp: item1[0].FollowUp,

      DealerContactPhoneNumber: item1[0].DealerContactPhoneNumber,

      DealerContactEmail: item1[0].DealerContactEmail,

      DealerContactName: item1[0].DealerContactName,

      //SelectedDealer: DealerArray.filter(a => a.text == item1[0].DealerContactName)[0].key,

      Comments: item1[0].Comments,

      ID: item1[0].ID

    })

  }


  private SubmitFile() {
    sp.web.folders.getByName('DocumentLib').folders.add("0002")
      .then(newfolder => {
        let folderpath = (newfolder.data.ServerRelativeUrl) + "/";
        alert(folderpath);
        this.state.files.forEach(element => {
          alert(element);
          sp.web.getFolderByServerRelativeUrl(folderpath).files.add(element[0].name, element[0], true);
        });
      }).catch(function (data) {
        alert(data);
      });
  }


  private async SubmitData() {
    let isValid = true;
    if (!isValid)
      return isValid;
    if (isValid) {
      let userid = (await sp.web.currentUser()).Id;
      let inputdata = {
        Title: "Data 1",
        CallRecordNo: '980',
        RequestOnBehalf: this.state.RequestOnBehalf,
        //Requestor: this.state.RequesterId,
        JobTitle: this.state.JobTitle,
        PhoneNumber: this.state.PhoneNumber,
        //MachineFamilyId: { 'results': this.state.MachineFamily },
        FollowUp: this.state.FollowUp,
        FollowUpDate: this.state.FollowUpDate,
        DealerContactName: this.state.DealerContactName,
        DealerContactEmail: this.state.DealerContactEmail,
        DealerContactPhoneNumber: this.state.DealerContactPhoneNumber,
        Comments: this.state.Comments,
        CallRecordAttachments: this.state.CallRecordAttachments,
        // SubmittedBy: userid

      }
      sp.web.lists.getByTitle("MasterData").items.add(inputdata)
        .then(newItem => {
          this.SubmitFile()
          //this.UpdateData()
          alert("Data Submitted")
        })
        .catch(er => {
          alert(er)
        })
    }
  }


  private ClearData() {

  }

  private _onChange() {
    //alert()
    if (!this.state.RequestOnBehalf) { this.setState({ RequestOnBehalf: true }) }
    else {
      this.setState({ RequestOnBehalf: false })
    }


  }
  private _FollowUponchange() {
    //alert()
    if (!this.state.FollowUp) { this.setState({ FollowUp: true }) }
    else {
      this.setState({ FollowUp: false })
    }
  }

  public _getPeoplePickerItems = async (items: any[]) => {

    if (items.length > 0) {
      let userid = (await (await sp.web.ensureUser(items[0].loginName)).user()).Id
      this.setState({ RequesterId: userid });
    }
    else {
      this.setState({ RequesterId: [] });
      //this.setState({EmployeeName:""});
    }
  }


  public render(): React.ReactElement<IAssesmentTaskOneProps> {
    return (
      <div className={styles.assesmentTaskOne}>
        <div className="ms-Grid">


          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
              <span className={styles.title}>Call Record Details</span>
            </div>
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col  ms-sm6 ms-md6 ms-lg4">
              <Label required>Call Record Number:</Label>
              <TextField disabled></TextField>
            </div>


            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
              <Label required>Requestor on Behalf:</Label>
              <ChoiceGroup options={[{ key: "Yes", text: "Yes" }, { key: "No", text: "No" }]}
                required={true} onChange={(evt, Option) => this._onChange()}>
              </ChoiceGroup>
            </div>


            {this.state.RequestOnBehalf &&

              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
                <Label required>Requestor:</Label>

                <PeoplePicker

                  context={this.props.context as any}
                  personSelectionLimit={3}
                  //groupName={"Team Site Owners"} // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={this._getPeoplePickerItems}
                  defaultSelectedUsers={[this.state.Requestor ? this.state.Requestor : ""]}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                  errorMessage={this.state.ErrMsgRequestor}

                />
              </div>
            }
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col  ms-sm6 ms-md6 ms-lg4">
              <Label required>Job Title:</Label>
              {/* < TextField placeholder='Please Enter Title'/> */}
              <Dropdown
                options={[

                  { key: "BSNL", text: "BSNL" },
                  { key: "Airtel", text: "Airtel" },
                  { key: "Idea", text: "Idea" },
                  { key: "Jio", text: "Jio" }

                ]}
                placeHolder='Please Enter Job Title'
                onChange={(evt, newvalue) => this.setState({ JobTitle: newvalue.text })}
                errorMessage={this.state.ErrMsgJobTitle}
              ></Dropdown>

            </div>


            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
              <Label required>Phone Number:</Label>
              <PhoneInput
                placeholder="Enter phone number"
                country={'us'}
                value={this.state.PhoneNumber}
                onChange={phone => this.setState({ PhoneNumber: phone })}
              />
            </div>


            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
              <Label required>Machine Family:</Label>
              <Dropdown
                options={items2}
                multiSelect
                //selectedKey={this.state.MachineFamily}
                placeholder="Select an option"
                errorMessage={this.state.ErrMsgMachineFamily}
                onChange={(evt, newvalue) => { this.DropdownMachinefamily(newvalue) }}
              />
            </div>
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col  ms-sm6 ms-md6 ms-lg4">
              <Label required>Follow Up</Label>
              <ChoiceGroup options={[{ key: "Yes", text: "Yes" }, { key: "No", text: "No" }]}
                required={true} onChange={(evt, Option) => this._FollowUponchange()}>
              </ChoiceGroup>
            </div>


            {this.state.FollowUp &&
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
                <Label required>FollowUp Date:</Label>
                <DatePicker
                  value={this.state.FollowUpDate}
                  onSelectDate={(newvalue) => { this.setState({ FollowUpDate: newvalue }) }}
                  placeholder="Select a date..."
                  ariaLabel="Select a date" />
              </div>
            }
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col  ms-sm6 ms-md6 ms-lg4">
              <Label required>Dealer Contact Name:</Label>
              <Dropdown
                options={items1}
                placeholder="Please Select Dealer Contact Name "
                errorMessage={this.state.ErrMsgDealerContactname}
                onChange={(evt, option) => { this._onchangeDealer(option); }
                }
              />
            </div>


            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
              <Label required>Dealer Contact Email:</Label>
              < TextField disabled placeholder='Please select dealer contact Email'
                value={this.state.DealerContactEmail}
                errorMessage={this.state.ErrMsgDealerContactEmail} />
            </div>


            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg4">
              <Label required>Dealer Contact Phone Number:</Label>
              < TextField disabled placeholder='Please select Dealer Contact Phone Number'
                value={this.state.DealerContactPhoneNumber}
                errorMessage={this.state.ErrMsgDealerContactPhoneNumber} />
            </div>
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
              <Label required>Comments:</Label>

              <TextField multiline rows={3} placeholder='' value={this.state.Comments}
                onChange={(evt, newvalue) => this.setState({ Comments: newvalue })}
              ></TextField>
            </div>
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2">
              <Label required>Attachment:</Label>
              <input type='file' multiple onChange={(evt) => {
                this.setState({ files: Array(evt.target.files) })
              }} />
            </div>
          </div>


          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-md2"
              style={{ float: 'right' }}>
              <Stack horizontal horizontalAlign='end' tokens={{ childrenGap: 15 }}>
                <PrimaryButton onClick={(evt) => { this.SubmitData() }}>Submit</PrimaryButton>
                <DefaultButton onClick={(evt) => { this.ClearData() }}>Cancel</DefaultButton>
                {/* <PrimaryButton className={styles.button} text="Update" onClick={() => this.UpdateData()} /> */}
              </Stack>

            </div>

          </div>


          { }

        </div>

        <div className='ms-Grid-row'>
          <SearchBox

            styles={searchBoxStyles}

            placeholder="Search"

            onEscape={ev => {

              console.log('Custom onEscape Called');

            }}

            onClear={ev => {

              console.log('Custom onClear Called');

            }}

          ></SearchBox>
          {/* <DefaultButton data-automation-id="search" target="_blank" title="Search">Search</DefaultButton> */}
          <DetailsList
            items={this.state.ListItems}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            //groups={this.groups}
            groupProps={{
              showEmptyGroups: true,

            }}

            selectionPreservedOnEmptyClick={true}

            ariaLabelForSelectionColumn="Toggle selection"

            ariaLabelForSelectAllCheckbox="Toggle selection for all items"

          //checkButtonAriaLabel="select row" onRenderItemColumn={this._onRenderItemColumn}

          />

        </div>

      </div>
    );
  }
}
