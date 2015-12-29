var React = require('react');
var userManageMixin = require('../ajax/userManage.js').default;
var login = React.createClass({
    mixins: [userManageMixin],
    getInitialState(){
        return {
            userName: '',
            password: '',
            isHide: this.props.loginHide,
            msg: ''
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.loginHide !== this.state.loginHide) {
            this.setState({isHide: nextProps.loginHide, msg: ''});
        }
    },
    loginHandle(){
        this.login(this.state.userName, this.state.password, (flag, data)=> {
            if (flag === 1) {
                this.setState({isHide: true, msg: ''});
                this.props.parent.changeUserName(this.state.userName);
                this.props.onClosePopLogin();
            } else {
                this.setState({msg: data.msg})
            }
        });
    },
    onChange(event){
        var target = event.target;
        var newState = {};
        newState[target.name] = target.value;
        this.setState(newState);
    },
    render(){
        var display = {
            display: this.state.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-login">
                    <div className="title">用户登录<a className="close" onClick={this.props.onClosePopLogin}><i
                        className="fa fa-times"></i></a></div>
                    <div className="body">
                        <div>
                            <label>用户名</label>
                            <input type="text" value={this.state.userName} onChange={this.onChange} name="userName"/>
                            <label>密码</label>
                            <input type="password" value={this.state.password} onChange={this.onChange}
                                   name="password"/>

                            <h3>{this.state.msg}</h3>
                            <a onClick={this.loginHandle} className="btn">登录</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = login;