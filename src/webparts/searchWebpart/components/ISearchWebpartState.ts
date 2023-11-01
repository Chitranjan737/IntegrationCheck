export interface ISearchWebpartState
{
    SearchBy:string;
    ProjectCode:string;
    ProjectTitle:string;
    TransmittalNumber:string;
    FromDate:Date;
    ToDate:Date;
    Discription:string;
    Industry:string;
    ProcessArea:string;
    DocumentType:string;
    Discipline:string;
    Sub_PrcessArea:string;
    isActiveA:string,
    isActiveB:string,



    errMsgSearchBy:string;
    errMsgProjectCode:string;
    errMsgProjectTitle:string;
    errMsgTransmittalNumber:string;
    errMsgFromDate:string;
    errMsgToDate:string;
    errMsgDiscription:string;
    errMsgIndustry:string;
    errMsgProcessArea:string;
    errMsgDocumentType:string;
    errMsgDiscipline:string;
    errMsgSub_PrcessArea:string;

}