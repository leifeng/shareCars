import { Link} from 'react-router';
var React = require('react');
var logo = require('../../images/logo.png');


var forget = React.createClass({
    render(){
        return (
            <div>
                <div className="content">
                    <div className="logo">
                        <a href="index.html"><img src={logo}/></a>
                    </div>
                    <div className="forget">
                        <div className="panel">
                            <div className="tab">
                                <Link to="/forget/byMobile" activeClassName="active" className="mobileTab">通过手机找回</Link>
                                <Link to="/forget/byEmail" activeClassName="active" className="emailTab">通过邮箱找回</Link>
                                <div>如果您已拥有知豆账号，则可<Link to="/login">在此登录</Link></div>
                            </div>
                            <div className="form">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = forget;
