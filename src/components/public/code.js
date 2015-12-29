var React = require('react');
var safeCenter = require('../ajax/safeCenter.js').default;
var code = React.createClass({
    mixins: [safeCenter],
    propTypes: {
        mobile: React.PropTypes.string.isRequired
    },
    getInitialState(){
        return {
            msg: '获取验证码',
            isLock: false,
            isRegister:this.props.isReg?1:0
        }
    },
    onGetCode(){
        if (!this.props.mobileVerify) {
            this.props.handle('该手机号码不可用,不能发送验证码');
            return
        }
        if (!this.state.isLock) {
            this.getMobileVerifyCode(this.props.mobile,this.state.isRegister, (data)=> {
                if(data.flag===1){
                    this.setState({isLock: true});
                    this.changeMsg();
                }else{
                    this.props.handle(data.msg);
                }

            });
        }
    },
    changeMsg(){
        var n = 120;
        this.t = setInterval(()=> {
            if (n === 0) {
                clearInterval(this.t);
                this.setState({msg: '获取验证码', isLock: false});
            } else {
                n--;
                this.setState({msg: n + 's后重新发送'});
            }
        }, 1000);
    },
    componentWillUnmount(){
        clearInterval(this.t);
    },
    render(){
        return (
            <a onClick={this.onGetCode}> {this.state.msg}</a>
        )
    }
});
exports['default'] = code;