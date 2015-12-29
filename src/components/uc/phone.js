var React = require('react');
var safeMixin = require('../ajax/safeCenter').default;
var userManageMixin = require('../ajax/userManage').default;
var accountManageMixin = require('../ajax/accountManage').default;
var PopBase = require('../public/_popBase').default;
var EditPhone = React.createClass({
    mixins: [safeMixin, userManageMixin, accountManageMixin],
    getInitialState(){
        return {
            oldPhone: '',
            password: '',
            newPhone: '',
            code: '',
            passwordMsg: '',
            newPhoneMsg: '',
            codeMsg: '',
            newPhoneValid: false,
            lock: false,
            isTrue: false,
            timeSpan: 120,
            isValid: true,
            isHide: true,
            msg: ''
        }
    },
    componentWillMount(){
        this.isMobileValidated((flag, isValidated)=> {
            this.setState({isValid: isValidated});
            if (isValidated) {
                this.userInfo((data)=> {
                    this.setState({oldPhone: data.user.mobile});
                });
            }
        });
    },
    componentWillUnmount(){
        clearInterval(this.intervalTime);
        clearTimeout(this.setTime);
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

        if (this.state.newPhone === '') {
            this.state.newPhoneMsg = '请输入手机号码';
            this.state.isTrue = false;
        } else {
            this.state.newPhoneMsg = '';
        }

        if (this.state.code === '') {
            this.state.codeMsg = '请输入验证码';
            this.state.isTrue = false;
        } else {
            this.state.codeMsg = '';
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
        this.mobileModify(this.state.password, this.state.newPhone, this.state.code, () => {
            this.setState({msg: '修改成功', isHide: false});
        });
    },
    valid(){
        var str = location.hash;
        this.mobileVerify(this.state.newPhone, this.state.code, ()=> {
            if (str.indexOf('open=')) {
                location.href = '/zd/openService.html';
            } else {
                this.setState({msg: '验证成功', isHide: false});
            }

        });
    },
    getCode(){
        this.setTime = setTimeout(()=> {
            clearTimeout(this.setTime);
            if (!this.state.newPhoneValid) {
                this.setState({codeMsg: '该手机号码不可用,不能发送验证码'});
                return
            }
            if (!this.state.lock) {
                this.getMobileVerifyCode(this.state.newPhone,0, (data)=> {
                    if (data.flag === 1) {
                        this.setState({lock: true, codeMsg: '验证码发送成功'});
                        var t = 120;
                        this.intervalTime = setInterval(()=> {
                            if (t <= 0) {
                                clearInterval(this.intervalTime);
                                this.setState({lock: false, codeMsg: ''});
                            } else {
                                t--;
                                this.setState({timeSpan: t});
                            }
                        }, 1000);
                    } else {
                        this.setState({msg: data.msg, isHide: false});
                    }
                });
            }
        }, 100);
    },
    closeHandle(){
        this.setState({isHide: true});
    },
    onBlur(){
        this.setState({isTrue: false, newPhoneMsg: '', codeMsg: '', newPhoneValid: false});
        if (this.state.newPhone.length === 11) {
            this.isMobileExist(this.state.newPhone, (data)=> {
                if (data) {
                    this.setState({newPhoneMsg: '该手机号已存在'});
                } else {
                    this.setState({newPhoneMsg: '可以使用该号码', newPhoneValid: true, isTrue: true});
                }
            });
        } else {
            this.setState({newPhoneMsg: '手机号码格式不正确'});
        }
    },
    render(){
        var msg = this.state.lock ? '(' + this.state.timeSpan + ')后重新获取' : '获取验证码';
        var title = this.state.isValid ? '修改手机号：' : '验证手机号：';
        var txt = this.state.isValid ? '新手机号码：' : '手机号码：';
        var display = {
            display: this.state.isValid ? 'block' : 'none',
            margin: 0
        };
        return (
            <div>
                <PopBase msg={this.state.msg} isHide={this.state.isHide} closeHandle={this.closeHandle}/>

                <div className="title">{title}</div>
                <div className="edit-phone">
                    <div>
                        <div style={display}>
                            <label>原手机号：</label>
                            <input type="text" value={this.state.oldPhone}/>
                            <label>密码：<i>{this.state.passwordMsg}</i></label>
                            <input type="password" onChange={this.changeHandle} name="password"
                                   value={this.state.password}/>
                        </div>
                        <label>{txt}<i>{this.state.newPhoneMsg}</i></label>
                        <input type="text" onChange={this.changeHandle} name="newPhone" value={this.state.newPhone}
                               onBlur={this.onBlur}/>
                        <label>验证码：<i>{this.state.codeMsg}</i></label>

                        <div className="code">
                            <input type="text" onChange={this.changeHandle} name="code" value={this.state.code}/><a
                            onClick={this.getCode}>{msg}</a>
                        </div>
                        <a onClick={this.onClick}>提交</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = EditPhone;