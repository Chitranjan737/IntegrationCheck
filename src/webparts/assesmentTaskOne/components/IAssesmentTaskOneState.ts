import { IDropdownOption } from "office-ui-fabric-react";

export interface IAssesmentTaskOneState {


    items1: IDropdownOption[];
    items2: IDropdownOption[];
    CallRecordNo: string;
    RequestOnBehalf: boolean;
    Requestor: string;
    JobTitle: string;
    PhoneNumber: string;
    MachineFamily: any;
    FollowUp: boolean;
    FollowUpDate: Date;
    DealerContactName: string;
    DealerContactEmail: string;
    DealerContactPhoneNumber: string;
    Comments: string;
    CallRecordAttachments: string;
    RequesterId: any;
    files: any;
    ListItems: any;
    multiValueCheckbox: any;
    ToolsItem: any;
    DealerItemList: any;
    ID: number;


    ErrMsgCallRecordNo: string;
    ErrMsgRequestOnBehalf: string;
    ErrMsgRequestor: string;
    ErrMsgJobTitle: string;
    ErrMsgPhoneNumber: string;
    ErrMsgMachineFamily: string;
    ErrMsgFollowUp: string;
    ErrMsgFollowUpDate: string;
    ErrMsgDealerContactname: string;
    ErrMsgDealerContactEmail: string;
    ErrMsgDealerContactPhoneNumber: string;
    ErrMsgComments: string;
    ErrMsgCallRecordAttachments: string;


    // Items:any;
    // ToolsItem:any;
    // multiValueCheckbox:any;
    // files:any;

    // Dealer:any;
    // DealerItemList:any,
    // SelectedDealer:string;
    // SelectedDealerEmail:string;
    // SelectedDealerPhoneNo:string;
    // CallRecordNo:string;
    // RequestOnBehalf:string;
    // Requestor:string;
    // JobTitle:string;
    // PhoneNumber:string;
    // MachineFamily:string;
    // FollowUp:boolean;
    // FollowUpDate:Date;
    // DealerContactName:string;
    // DealerContactEmail:string;
    // DealerContactPhoneNumber:string;
    // Comments:string;
    // CallRecordAttachments:string;

    // errMsgCallRecordNo:string;
    // errMsgRequestOnBehalf:string;
    // errMsgRequestor:string;
    // errMsgJobTitle:string;
    // errMsgPhoneNumber:string;
    // errMsgMachineFamily:string;
    // errMsgFollowUp:string;
    // errMsgFollowUpDate:string;
    // errMsgDealerContactName:string;
    // errMsgDealerContactEmail:string;
    // errMsgDealerContactPhoneNumber:string;
    // errMsgComments:string;
    // errMsgCallRecordAttachments:string;
    
   


}