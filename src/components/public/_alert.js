var React = require('react');
var Alert = React.createClass({
    getInitialState(){
        return {
            isHide: true,
            clsName: ''
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.isHide === false) {
            this.showHandle();
        }
    },
    componentWillUnmount(){
        clearTimeout(this.t);
    },
    showHandle(){
        this.setState({isHide: false, clsName: 'bounceIn'});
        this.t = setTimeout(()=> {
            this.setState({isHide: true, clsName: 'bounceOut'});
            this.props.closeHandle();
        }, 2200)
    },
    render(){
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        return (
            <div className={"animated alert "+this.state.clsName} style={display}>
                {this.props.msg}
            </div>
        )
    }
});
exports['default'] = Alert;