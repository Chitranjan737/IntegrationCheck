import * as React from 'react';
import styles from './GetSharePointListtoGrid.module.scss';
import { IGetSharePointListtoGridProps } from './IGetSharePointListtoGridProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientCommonConfiguration, ISPHttpClientConfiguration, SPHttpClientResponse } from '@microsoft/sp-http';
import { DetailsList, DetailsListLayoutMode, IColumn, Link, mergeStyles } from 'office-ui-fabric-react';
import { MyTable } from './MyTable';




export interface IGetSharePointListToGridState {
  ListItem: MyTable[];
  CurrentLogUser: string

}


export default class GetSharePointListToGrid extends React.Component<IGetSharePointListtoGridProps, IGetSharePointListToGridState> {
  private _allItems: any[];
  private _columns: IColumn[];
  constructor(props: IGetSharePointListtoGridProps, state: IGetSharePointListToGridState) {
    super(props);
    this.state = {
      ListItem: [],
      CurrentLogUser: this.props.context.pageContext.user.displayName
    }

    this._columns = [
      { key: 'Title', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'EmployeeName', name: 'Employee Name', fieldName: 'EmployeeName', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'Designation', name: 'Designation', fieldName: 'Designation', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'PhoneNumber', name: 'Phone Number', fieldName: 'PhoneNumber', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'EmployeeType', name: 'Employee Type', fieldName: 'EmployeeType', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'IsProbationCompleted', name: 'Is Probation Completed', fieldName: 'IsProbationCompleted', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'Action', name: 'Action', fieldName: 'EmployeeName', minWidth: 100, maxWidth: 200, isResizable: true },
    ];


    let restapi = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('Employee Information')/items?$select=*,EmployeeName/Title&$expand=EmployeeName";
  
    this.props.context.spHttpClient.get(restapi, SPHttpClient.configurations.v1)
      .then((Response: SPHttpClientResponse) => {
        if (Response.ok) {
          Response.json().then((ResponseJson) => {
            if (ResponseJson != null && ResponseJson.value != null) {
              let _arrayItems = [];
              ResponseJson.value .forEach(element => {
                _arrayItems.push({
                  Title:element.Title,
                  EmployeeName:element.EmployeeName.Title,
                  Designation:element.Designation,
                  PhoneNumber:element.PhoneNumber,
                  EmployeeType:element.EmployeeType,
                  IsProbationCompleted:element.IsProbationCompleted?"Yes":"No",
                  Url:this.props.context.pageContext.web.absoluteUrl+"/SitePages/CreateQuery.aspx?EmpId="+element.ID
                })
              });
              this.setState({ ListItem: _arrayItems })
            }
          })
        }
      })
      .catch(err => {
        alert(err)
      })
  }
  public render(): React.ReactElement<IGetSharePointListtoGridProps> {
    return (
      <div className={styles.getSharePointListtoGrid}>
        <div className={styles.container}>
        <h1>Hi {this.state.CurrentLogUser}</h1>
              <DetailsList
                items={this.state.ListItem}
                columns={this._columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}              
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
                onRenderItemColumn={this._renderItem}
              />
        </div>
      </div>
    );
  }

  private _renderItem(item: MyTable[], index: number, column: IColumn)
   {
    const fieldContent = item[column.fieldName as keyof MyTable] as string;
    switch (column.key) {
      case 'Action':
        return <Link href="#">{fieldContent}</Link>;
        case 'EmployeeType':
          if(fieldContent=="Contractor")
          {
            return (
                <p className={mergeStyles({ color: 'blue' })}>
                  {fieldContent}
                </p>
            );
          }
          else if(fieldContent=="Permanant")
          {
            return (
              <p className={mergeStyles({ color: 'green' })}>
                {fieldContent}
              </p>
          );
          }
      default:
        return <span>{fieldContent}</span>;
    }
  } 
  
}
