import React from 'react';
import baseSelect from '../ajax/baseSelect.js';
var headerSelectDown=React.createClass({
    mixins:[baseSelect],
    getInitialState(){
      return{
          address:'山东',
          isHide:true,
          list:[]
      }
    },
    componentWillMount(){
        this.rentAreaSimple((data)=>{
            this.setState({list:data});
        });
    },
    onClick(){
        this.setState({isHide:!this.state.isHide})
    },
    onChange(event){
        var target=event.target;
        var code,name;
        if(target.nodeName==='A'){
            code=target.getAttribute('data-id');
            name=target.innerText;
            this.setState({address:name,isHide:true});
            this.props.changeCode.bind(this,code);
        }
    },
    render(){
        var list=this.state.list.map(function(item){
            return(<a key={item.areaCode} data-id={item.areaCode}>{item.areaName}</a>)
        });
        var display={
            display:this.state.isHide?'none':'block'
        };
        return(
            <div className="headerSelectDown">
                <label onClick={this.onClick}>{this.state.address}</label>
                <div className="list" style={display} onClick={this.onChange}>
                    {list}
                </div>
            </div>
        )
    }
});
export default headerSelectDown;