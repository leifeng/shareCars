var React = require('react');
 class Bar extends React.Component{
    render() {
        var style = {
            width: this.props.value + '%'
        };
        var barStyle={
            width:this.props.w
        };
        return (
            <div className="bar" style={barStyle}><span style={style} className="process"></span></div>
        );
    }
}
exports['default']= Bar;
