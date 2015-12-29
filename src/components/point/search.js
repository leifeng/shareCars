var React = require('react');
var search = React.createClass({

    getInitialState(){
        return {
            address: '',
            areaCode: this.props.areaCode,
            areaName: this.props.areaName,
            isHide: true
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.areaCode !== this.state.areaCode) {
            this.state.areaCode = nextProps.areaCode;
        }
        if (nextProps.areaName !== this.state.areaName) {
            this.state.areaName = nextProps.areaName;
        }
        this.forceUpdate();
    },
    listHide(){
        this.setState({isHide: !this.state.isHide});
    },
    selectHandle(e){
        var target = e.target;
        if (target.nodeName === 'A') {
            let code = target.getAttribute('data-code');
            let name = target.innerHTML;
            this.setState({isHide: true, areaCode: code, areaName: name});
        }
    },
    onChange(e){
        this.setState({address: e.target.value});
    },
    searchHandle(){
        this.props.getData(this.state.areaCode, this.state.areaName, this.state.address);
    },
    render(){
        var display = {
            display: this.state.isHide ? 'none' : 'block'
        };
        return (
            <div className="searchBar">
                <div className="dropdownList">
                    <a className="areaName" onClick={this.listHide}>{this.state.areaName}</a>

                    <div className="list" style={display} onClick={this.selectHandle}>
                        {this.props.list.map(function (item, index) {
                            return <a key={index} data-code={item.areaCode}>{item.areaName}</a>
                        })}
                    </div>
                </div>

                <div className="search">
                    <input type="search" value={this.state.address} onChange={this.onChange} placeholder="输入最近网点"/><a
                    onClick={this.searchHandle}>搜索</a>
                </div>
            </div>
        )
    }
});
exports['default'] = search;