var React = require('react');
import { Link} from 'react-router';
var logo = require('../../images/logo.png');
class Reg extends React.Component {
    render() {
        return (
            <div>
                <div className="content">
                    <div className="logo">
                        <a href="index.html"><img src={logo}/></a>
                    </div>
                    <div className="reg">
                        <img src="./images/registered_tu.png" className="banner"/>

                        <div className="panel">
                            <div className="tab"><Link to="/reg/mobile" activeClassName="active"
                                                       className="mobileTab">手机号注册</Link><Link to="/reg/username"
                                                                                               activeClassName="active"
                                                                                               className="usernameTab">会员名注册</Link>

                                <div>如果您已拥有知豆账号，则可<Link to="/login">在此登录</Link></div>
                            </div>
                            <div className="form">
                                {this.props.children}
                                <em>点击“立即注册”，即表示您同意并愿意遵守知豆<a>《用户协议》</a>和<a>《隐私政策》</a></em>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
exports['default'] = Reg;