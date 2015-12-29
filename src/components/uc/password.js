var React = require('react');
var safeMixin = require('../ajax/safeCenter').default;
var userManage = require('../ajax/userManage').default;
var EditPassword = React.createClass({
    mixins: [safeMixin, userManage],
    getInitialState(){
        return {
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            oldPasswordMsg: '',
            newPasswordMsg: '',
            isTrue: false
        }
    },
    changeHandle(event){
        var newState = {};
        var target = event.target;
        var name = target.name;
        newState[name] = target.value;
        this.setState(newState);
    },
    validHandle(){
        this.state.isTrue = true;
        this.state.newPasswordMsg = '';
        this.state.oldPasswordMsg = '';

        if (this.state.oldPassword === '') {
            this.setState({oldPasswordMsg: '请输入原始密码', isTrue: false});
            return;
        }

        if (this.state.newPassword.length < 8 ||
            this.state.newPassword.length > 16 ||
            /^\d+$/.test(this.state.newPassword) ||
            /^[A-Za-z]+$/.test(this.state.newPassword) ||
            /^[^A-Za-z0-9]+$/.test(this.state.newPassword)) {
            this.setState({newPasswordMsg: '密码长度8~16位，数字、字母、字符至少包含两种', isTrue: false});
            return;
        }

        if (this.state.newPassword !== this.state.newPassword2 && (this.state.newPassword !== '' || this.state.newPassword2 !== '')) {

            this.setState({newPasswordMsg: '新密码不一致', isTrue: false});
            return;
        } else {
            if (this.state.newPassword === '') {

                this.setState({newPasswordMsg: '请输入新密码', isTrue: false});
                return;
            }

            if (this.state.newPassword2 === '') {
                this.setState({oldPasswordMsg: '请确认新密码', isTrue: false});
                return;
            }
        }

    },
    onClick(){

        this.state.newPasswordMsg = '';
        this.state.oldPasswordMsg = '';

        if (this.state.oldPassword === '') {
            this.setState({oldPasswordMsg: '请输入原始密码'});

        }
        if (this.state.newPassword.length < 8 ||
            this.state.newPassword.length > 16 ||
            /^\d+$/.test(this.state.newPassword) ||
            /^[A-Za-z]+$/.test(this.state.newPassword) ||
            /^[^A-Za-z0-9]+$/.test(this.state.newPassword)) {
            this.setState({newPasswordMsg: '密码长度8~16位，数字、字母、字符至少包含两种'});
            return;
        }
        if (this.state.newPassword !== this.state.newPassword2) {
            this.setState({newPasswordMsg: '新密码不一致'});
            return;
        }

        if (this.state.isTrue) {
            this.modifyPwd(this.state.oldPassword, this.state.newPassword, ()=> {
                alert('修改成功,请重新登录');
                this.logout('', function () {
                    location.href = '/zd/user.html?cb=/zd/uc.html';
                });
            });
        }
    },
    onBlur(event){

        this.state.isTrue = true;
        this.state.newPasswordMsg = '';
        this.state.oldPasswordMsg = '';

        var name = event.target.name;
        if (name === 'oldPassword') {
            if (this.state.oldPassword === '') {
                this.state.isTrue = false;
                this.state.oldPasswordMsg = '请输入原始密码';
                //   this.setState({oldPasswordMsg: '请输入原始密码', isTrue: false});
            }
        } else if (name === 'newPassword') {
            if (this.state.newPassword.length < 8 ||
                this.state.newPassword.length > 16 ||
                /^\d+$/.test(this.state.newPassword) ||
                /^[A-Za-z]+$/.test(this.state.newPassword) ||
                /^[^A-Za-z0-9]+$/.test(this.state.newPassword)) {
                this.state.isTrue = false;
                this.state.newPasswordMsg = '密码长度8~16位，数字、字母、字符至少包含两种';
                //  this.setState({newPasswordMsg: '密码长度8~16位，数字、字母、字符至少包含两种', isTrue: false});
            }
        } else if (name === 'newPassword2') {
            if (this.state.newPassword !== this.state.newPassword2) {
                this.state.isTrue = false;
                this.state.newPasswordMsg = '密码不一致';
                //  this.setState({newPasswordMsg: '密码不一致', isTrue: false});
            }
        }
        this.forceUpdate();
    },
    render(){
        return (
            <div>
                <div className="title">修改密码</div>
                <div className="edit-password">
                    <div>
                        <label>当前密码：<i>{this.state.oldPasswordMsg}</i></label>
                        <input type="password" onChange={this.changeHandle} name="oldPassword"
                               value={this.state.oldPassword} onBlur={this.onBlur}/>
                        <label>新密码：<i>{this.state.newPasswordMsg}</i></label>
                        <input type="password" onChange={this.changeHandle} name="newPassword"
                               value={this.state.newPassword} onBlur={this.onBlur}/>
                        <label>确认新密码：</label>
                        <input type="password" onChange={this.changeHandle} name="newPassword2"
                               value={this.state.newPassword2} onBlur={this.onBlur}/>
                        <a onClick={this.onClick}>提交</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = EditPassword;