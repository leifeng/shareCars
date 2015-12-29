var React = require('react');
var safeMixin = require('../ajax/safeCenter').default;
var userManageMixin = require('../ajax/userManage').default;
var email = React.createClass({
    mixins: [safeMixin, userManageMixin],
    getInitialState(){
        return {
            oldEmail: '',
            password: '',
            newEmail: '',
            passwordMsg: '',
            newEmailMsg: '',
            msg: '',
            msgIsHide:true,
            isTrue: false,
            isValid: true
        }
    },
    componentWillMount(){
        this.securityCenter((data)=> {
            this.setState({isValid: data.isMailValidated});
            if (data.isMailValidated) {
                this.userInfo((data)=> {
                    this.setState({oldEmail: data.user.mail})
                })
            }
        });

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
        if (this.state.isValid) {
            if (this.state.password === '') {
                this.state.passwordMsg = '请输入密码';
                this.state.isTrue = false;
            } else {
                this.state.passwordMsg = '';
            }
        }
        if (this.state.newEmail === '') {
            this.state.newEmailMsg = '请输入新邮箱';
            this.state.isTrue = false;
        } else {
            this.state.newEmailMsg = '';
        }

        this.forceUpdate();
    },
    onClick(){
        this.validHandle();
        if (this.state.isTrue) {
            if (this.state.isValid) {
                this.edit();
            } else {
                this.valid();
            }
        }
    },
    edit(){
        this.emailModify(this.state.password, this.state.newEmail, (data) => {
            if (data.flag === 1) {
                this.setState({msg: '修改成功',msgIsHide:false});
            } else {
                this.setState({msg: data.msg,msgIsHide:false});
            }

        });
    },
    valid(){
        this.emailVerify(this.state.newEmail,  (data)=> {
            if (data.flag === 1) {
                this.setState({msg: '验证码已发到邮箱，请进入邮箱查看',msgIsHide:false});
            } else {
                this.setState({msg: data.msg,msgIsHide:false});
            }
        });
    },
    render()
    {
        var title = this.state.isValid ? '修改邮箱：' : '验证邮箱：';
        var txt = this.state.isValid ? '新邮箱：' : '邮箱：';
        var display = {
            display: this.state.isValid ? 'block' : 'none',
            margin: 0
        };
        var msgDisplay={
            display: this.state.msgIsHide ? 'none' : 'block'
        };
        return (
            <div>
                <div className="title">{title}</div>
                <div className="edit-email">
                    <div>
                        <div style={display}>
                            <label>当前邮箱：</label>
                            <input type="text" value={this.state.oldEmail}/>
                            <label>密码：<i>{this.state.passwordMsg}</i></label>
                            <input type="password" onChange={this.changeHandle} name="password"
                                   value={this.state.password}/>
                        </div>
                        <label>{txt}<i>{this.state.newEmailMsg}</i></label>
                        <input type="text" onChange={this.changeHandle} name="newEmail"
                               value={this.state.newEmail}/>

                        <h2 style={msgDisplay}>{this.state.msg}</h2>
                        <a onClick={this.onClick}>提交</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = email;