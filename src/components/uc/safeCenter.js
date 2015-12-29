var React = require('react');
var safeMixin = require('../ajax/safeCenter.js').default;
var Bar = require('./bar.js').default;
var tools = require('../public/tools.js').default;
var Cookies = require('cookies-js');
import {Link} from 'react-router';

var ValidSpan = React.createClass({
    render(){
        var txt = '未验证';
        var cls2 = 'no';
        if (this.props.v == 1) {
            cls2 = 'yes';
            txt = '验证';
        }
        return (
            <div className={cls2}><i></i>{txt}</div>
        )
    }
});
var safeCenter = React.createClass({
    mixins: [safeMixin, tools],
    getDefaultProps(){
        return {
            safeLevel: {1: '低', 2: '中', 3: '高'}
        }
    },
    getInitialState(){
        return {
            securityLevel: 1,
            isMobileValidated: '',
            isMailValidated: '',
            userName: Cookies('www_evcoming_com_user_name'),
            mobile: '',
            email: ''
        }
    },
    componentWillMount(){
        this.securityCenter(data=> {
            this.setState({
                mobile: data.mobile,
                email: data.email,
                securityLevel: data.securityLevel,
                isMobileValidated: data.isMobileValidated,
                isMailValidated: data.isMailValidated
            })
        });
    },
    render(){
        var percent = this.state.securityLevel / 3 * 100;
        var phoneTxt = this.state.isMobileValidated === 1 ? '修改' : '验证';
        var emailTxt = this.state.isMailValidated === 1 ? '修改' : '验证';
        return (
            <div>
                <div className="title">安全设置</div>
                <div className="safe">
                    <div className="info">
                        <dl>
                            <dt>您好，{this.state.userName}</dt>
                            <dd>
                                账号安全度：<Bar value={percent} w="100"/> {this.props.safeLevel[this.state.securityLevel]}
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <ul>
                            <li><b>登录密码</b>互联网账号存在被盗风险，建议您定期更换密码以保护账号安全
                                <div>
                                    <div className="yes"><i></i>已设置</div>
                                    <Link to="/editPassword">修改</Link></div>
                            </li>
                            <li><b>手机验证</b>手机号<span>{this.state.mobile}</span>

                                <div><ValidSpan v={this.state.isMobileValidated}/><Link
                                    to="/editPhone">{phoneTxt}</Link></div>
                            </li>
                            <li><b>邮箱验证</b><span>邮箱{this.state.email}</span>

                                <div><ValidSpan v={this.state.isMailValidated}/><Link to="/editEmail">{emailTxt}</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = safeCenter;