var React = require('react');
var ReactDom = require('react-dom');
var safeCenter = require('../ajax/safeCenter').default;
var Header = require('../public/header').default;
var tool = require('../public/tools').default;
var FindPwd = React.createClass({
    mixins: [safeCenter, tool],
    getInitialState(){
        return {
            t: 5,
            icon: '',
            msg:''
        }
    },
    componentDidMount(){
        var t = 5;
        var code = this.getQuery('code');
        if (!code) {
            return;
        }
        this.findPwdFromEmailVerify(code, (data)=> {
            if (data.flag === 1) {
                this.setState({icon: './images/bank_ok.png',msg:'验证码验证成功'});
                this.timeHandle(url);
            } else {
                this.setState({icon: './images/bank_no.png',msg:data.msg})
                this.timeHandle('/zd/user.html#/forget/byEmail')
            }
        });
    },
    timeHandle(){
        this.timer = setInterval(()=> {
            if (t === 0) {
                clearInterval(this.timer);
                location.href = '/zd/uc.html';
            } else {
                t--;
                this.setState({t: t});
            }
        }, 1000);
    },
    componentWillUnmount(){
        clearInterval(this.timer);
    },
    render(){
        return (
            <div>
                <Header/>

                <div className="paySucc">
                    <div className="middle">
                        <div className="stateIcon">
                            <img src="./images/bank_ok.png"/>支付成功
                        </div>
                        <div className="timer">
                            {this.state.t}s后自动关闭
                        </div>
                        <div className="info">
                            <div>订单编号：{this.state.orderNum}</div>
                            <div>支付金额：<span className="orange">{this.state.totalAmount}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
ReactDom.render(
    <FindPwd/>,
    document.getElementById('main')
)