import { TextField } from 'office-ui-fabric-react';
import * as React from 'react';

export interface IChildComponentProps{
    Constanstvalue:string;
    SendValueCallBacktoParent:Function;
}

export interface IChildComponentState{
    Constanstvalue:string;
    ChildCompValue:string;
}

export default class ChildComponent extends React.Component<IChildComponentProps,IChildComponentState> 
{

 constructor(props:IChildComponentProps,state:IChildComponentState)
 {
     super(props);
     this.state={
         Constanstvalue:'',
         ChildCompValue:''
     }
 }

 public render(): React.ReactElement<IChildComponentProps> {
 return(

    <div>
        <label>
            {this.props.Constanstvalue}
        </label>
        <TextField value={this.state.ChildCompValue} label="ChildConstant"
         onChange={(e,newvalue)=>{this.setState({ChildCompValue:newvalue})}}
        />
        <div>
            <TextField value={this.state.Constanstvalue} 
            onChange={(e,newvalue)=>{
              let tempValue = this.state.ChildCompValue + " " + this.props.Constanstvalue;
              this.props.SendValueCallBacktoParent(tempValue);
            }}
            />
            
        </div>
    </div>
 )
}

}