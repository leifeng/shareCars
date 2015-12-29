var React = require('react');
import classNames from 'classnames';
var userManageMixin = require('../ajax/userManage.js').default;
var usernameReg = React.createClass({
    mixins: [userManageMixin],
    getInitialState(){
        return {
            username: '',
            password: '',
            password2: '',
            usernameVerifyMsg: '',
            passwordVerifyMsg: '密码长度8~16位，数字、字母、字符至少包含两种',
            isUsernameVerify: false,
            isPasswordVerify: false

        }
    },
    onChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    },
    onReg(){
        this.state.usernameVerifyMsg = '';
        this.state.passwordVerifyMsg = '';
        if (!this.state.username) {
            this.setState({usernameVerifyMsg: '请输入用户名'});
        }else{
            this. verifyUserName()
        }

        if (!this.state.password) {
            this.setState({passwordVerifyMsg: '请设置密码'});
            return
        }
        if (!this.state.password2) {
            this.setState({passwordVerifyMsg: '请确认密码'});
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


        if (this.state.password2 !== this.state.password) {
            this.setState({passwordVerifyMsg: '密码不一致'});
            return
        }

        if (this.state.isUsernameVerify && this.state.isPasswordVerify) {
            this.registerByAccount(this.state.username, this.state.password, function () {
                location.href = "/zd/openService.html";
            });
        }
    },
    onBlurPwd(event){
        var name = event.target.name;
        var val = event.target.value;
        this.state.isPasswordVerify = true;
        this.state.passwordVerifyMsg = '';
        if (name === 'password') {
            if (this.state.password.length < 8 ||
                this.state.password.length > 16 ||
                /^\d+$/.test(this.state.password) ||
                /^[A-Za-z]+$/.test(this.state.password) ||
                /^[^A-Za-z0-9]+$/.test(this.state.password)) {
                this.state.passwordVerifyMsg = '密码长度8~16位，数字、字母、字符至少包含两种';
                this.state.isPasswordVerify = false;
            }
        }
        if (name === 'password2') {
            if (this.state.password2.length < 8 ||
                this.state.password2.length > 16 ||
                /^\d+$/.test(this.state.password2) ||
                /^[A-Za-z]+$/.test(this.state.password2) ||
                /^[^A-Za-z0-9]+$/.test(this.state.password2)) {
                this.state.passwordVerifyMsg = '密码长度8~16位，数字、字母、字符至少包含两种';
                this.state.isPasswordVerify = false;
            }
        }
        this.forceUpdate();
    },
    verifyUserName(){
        if (this.state.username !== '') {
            this.isUserNameExist(this.state.username, (data)=> {
                if (data) {
                    this.setState({usernameVerifyMsg: '该用户名已存在', isUsernameVerify: false});
                } else {
                    this.setState({usernameVerifyMsg: '', isUsernameVerify: true});
                }
            });
        }
    },
    render(){
        return (
            <div>
                <label>用户名<i>{this.state.usernameVerifyMsg}</i></label>
                <input type="text" name="username" value={this.state.username} onChange={this.onChange}
                       onBlur={this.verifyUserName}/>
                <label>设置密码<i>{this.state.passwordVerifyMsg}</i></label>
                <input type="password" name="password" value={this.state.password} onChange={this.onChange}
                       onBlur={this.onBlurPwd}/>
                <label>确认密码</label>
                <input type="password" name="password2" value={this.state.password2} onChange={this.onChange}
                       onBlur={this.onBlurPwd}/>
                <a className="regBtn" onClick={this.onReg}>立即注册</a>
            </div>
        )
    }
});
exports['default'] = usernameReg;
