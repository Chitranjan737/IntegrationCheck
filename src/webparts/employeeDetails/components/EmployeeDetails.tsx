import * as React from 'react';
import styles from './EmployeeDetails.module.scss';
import { IEmployeeDetailsProps } from './IEmployeeDetailsProps';
import { IEmployeeDetailsState } from './IEmployeeDetailsState';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Constant from './../../../Common/Constant';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientCommonConfiguration, ISPHttpClientConfiguration, SPHttpClientResponse,ISPHttpClientOptions } from '@microsoft/sp-http';

import {IDropdownOption, ChoiceGroup, Dropdown, PrimaryButton, TextField ,Checkbox, DefaultButton, Stack, IChoiceGroup, textAreaProperties, IChoiceGroupOption, Label} from 'office-ui-fabric-react';
import { rest } from 'lodash';

export default class EmployeeDetails extends React.Component<IEmployeeDetailsProps, IEmployeeDetailsState> 
{
  private params = new UrlQueryParameterCollection(window.location.href);
  private ItemId = this.params.getValue("ItemId");

  constructor(props:IEmployeeDetailsProps,state:IEmployeeDetailsState)
  {
     super(props);
     this.state=
    {
      Title:'',
      EmployeeName:'',
      Designation:'',
      PhoneNumber:'',
      EmployeeType:'',
      IsProbhationCompleted:'',

     

    };
  }
  public render(): React.ReactElement<IEmployeeDetailsProps> {
    return (
      <div className={ styles.employeeDetails }>
         <div className='ms-Grid'>
          <div className='ms-Grid-row'>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
            <span style={{fontWeight: "bold" ,fontSize: 20}}>View Details</span>
            </div>
          </div>
        </div>

        <div className='ms-Grid'>
            <div className='ms-Grid-row'>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
              <label>Title:</label>
              <TextField value={this.state.Title}></TextField>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <label>Employee Name:</label>
                  <TextField value={this.state.EmployeeName}></TextField>
              </div>
            </div>
          </div>

          <div className='ms-Grid'>
            <div className='ms-Grid-row'>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
              <label>Designation:</label>
              <TextField value={this.state.Designation}></TextField>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <label>Phone Number:</label>
                  <TextField value={this.state.PhoneNumber}></TextField>
              </div>
            </div>
          </div>

          <div className='ms-Grid'>
            <div className='ms-Grid-row'>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
              <label>Employee Type:</label>
              <TextField value={this.state.EmployeeType}></TextField>
              </div>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
                  <label>Is Probhation Completed:</label>
                  <TextField value={this.state.IsProbhationCompleted}></TextField>
              </div>
            </div>
          </div>

          <div className='ms-grid'>
            <div className='ms-grid-row'>
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 15 }}>
                  <PrimaryButton text="Submit" />
                  <PrimaryButton text="Cancel"/>
                </Stack>
              </div>
            </div>
          </div>

      </div>
    );
  }
}
