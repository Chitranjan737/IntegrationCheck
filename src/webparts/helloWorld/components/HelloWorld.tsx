import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { IHelloWorldState } from './IHelloWorldState';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, TextField } from 'office-ui-fabric-react';

export default class HelloWorld extends React.Component<IHelloWorldProps,IHelloWorldState> {
  constructor(props:IHelloWorldProps,state:IHelloWorldState)
  {
    super(props);
    this.state=
    {
      AssociatedName:'',
      CalculatedValue:'Init Value'
    };
  }
  private submitlogic()
  {
     this.setState({CalculatedValue:"Hello " +this.state.AssociatedName})
  }
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={ styles.helloWorld }>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-md12">
              <span className={ styles.header }>Welcome to {this.props.Technology}!</span>
            </div>
          </div>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-md6">
              <label>Associated Name:</label>
            </div>
            <div className="ms-Grid-col ms-md6">
              <TextField value={this.state.AssociatedName} onChange={(evt,newValue)=>{ this.setState({AssociatedName:newValue})}}></TextField>
            </div>
            
          </div>
          <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-md12">
              <PrimaryButton onClick={(e)=>{this.submitlogic()}}>Submit</PrimaryButton>
            </div>
            <label style={{color:"red"}}>{this.state.CalculatedValue}</label>
            <label style={{color:"blue"}}>{this.state.AssociatedName}</label>
          </div>
        </div>
      </div>
    );
  }
}
