var React = require('react');
var base = React.createClass({
    render(){
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-base">
                    <div className="title">提示<a className="close" onClick={this.props.closeHandle}><i className="fa fa-times"></i></a></div>
                    <div className="body">
                        {this.props.msg}
                    </div>
                </div>
            </div>
        )
    }
});
exports['default']=base;