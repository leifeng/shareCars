var React = require('react');
var safeCenterMixin = require('../ajax/safeCenter.js').default;
var tool = require('../public/tools').default;
var findPwdFromEmail = React.createClass({
    mixins: [safeCenterMixin, tool],
    getInitialState(){
        return {
            code: '',
            password: '',
            newPassword: '',
            msg: '',
            passwordVerifyMsg: '密码长度8~16位，数字、字母、字符至少包含两种',
            isEmailVerify: false
        }
    },
    componentDidMount(){
        var code = this.getQuery('code');
        if (!code) {
            this.setState({passwordVerifyMsg: '验证码错误'});
            return
        }
        this.setState({code: code});
    },
    onChange(event){
        var target = event.target;
        var newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    },
    getPwd(){

        this.state.passwordVerifyMsg = '';
        this.state.msg = '';
        this.state.isEmailVerify = false;

        if (this.state.password === '') {
            this.setState({passwordVerifyMsg: '请输入密码'});
            return
        }
        if (this.state.password.length < 8 ||
            this.state.password.length > 16 ||
            /^\d+$/.test(this.state.password) ||
            /^[A-Za-z]+$/.test(this.state.password) ||
            /^[^A-Za-z0-9]+$/.test(this.state.password)) {
            this.setState({passwordVerifyMsg: '密码长度8~16位，数字、字母、字符至少包含两种'});
            return
        }
        if (this.state.newPassword.length < 8 ||
            this.state.newPassword.length > 16 ||
            /^\d+$/.test(this.state.newPassword) ||
            /^[A-Za-z]+$/.test(this.state.newPassword) ||
            /^[^A-Za-z0-9]+$/.test(this.state.newPassword)) {
            this.setState({passwordVerifyMsg: '密码长度8~16位，数字、字母、字符至少包含两种'});
            return
        }
        if (this.state.password !== this.state.newPassword) {
            this.setState({passwordVerifyMsg: '密码输入不一致'});
            return
        }

        this.findPwdFromEmail(this.state.code, this.state.password, (data)=> {
            if (data.flag === 1) {
                this.setState({isEmailVerify: true, msg: '修改成功，正在跳转到登录页面...'});
                setTimeout(function(){
                    location.href='/zd/user.html'
                },1500)
            } else {
                this.setState({isEmailVerify: true, msg: data.msg});
            }
        });
    },
    render(){
        var display = {
            display: this.state.isEmailVerify ? 'block' : 'none'
        };
        return (
            <div>
                <label>新密码<i>{this.state.passwordVerifyMsg}</i></label>
                <input type="password" name="password" value={this.state.password} onChange={this.onChange}/>
                <label>密码确认</label>
                <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.onChange}/>
                <h2 style={display}>{this.state.msg}</h2>
                <a className="regBtn" onClick={this.getPwd}>提交</a>
            </div>
        )
    }
});
exports['default'] = findPwdFromEmail;