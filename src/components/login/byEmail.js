var React = require('react');
var safeCenterMixin = require('../ajax/safeCenter.js').default;
var byEmail = React.createClass({
    mixins: [safeCenterMixin],
    getInitialState(){
        return {
            email: '',
            emailVerifyMsg: '',
            msg: '',
            isEmailVerify: false
        }
    },
    onChange(event){
        var target = event.target;
        var newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    },
    getPwd(){
        if (this.state.email === '') {
            this.setState({emailVerifyMsg: '请输入邮箱'});
            return
        }
        if (this.state.email.indexOf('@') === -1) {
            this.setState({emailVerifyMsg: '邮箱格式不正确'});
            return
        }

        this.findPasswordByEmail(this.state.email,  (data)=> {
            if (data.flag === 1) {
                this.setState({
                    msg: '已经向' + this.state.email + '发送验证邮件，请查收',
                    isEmailVerify: true
                })
            } else {
                this.setState({
                    msg: data.msg,
                    isEmailVerify: true
                })
            }
        });

    },
    render(){
        var display = {
            display: this.state.isEmailVerify ? 'block' : 'none'
        };
        return (
            <div>
                <label>邮箱<i>{this.state.emailVerifyMsg}</i></label>
                <input type="text" name="email" value={this.state.email} onChange={this.onChange}/>

                <h2 style={display}>{this.state.msg}</h2>
                <a className="regBtn" onClick={this.getPwd}>提交</a>
            </div>
        )
    }
});
exports['default'] = byEmail;
