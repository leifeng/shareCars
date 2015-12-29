var React = require('react');
var ReactDom = require('react-dom');
var Header = require('../public/header').default;
var tool = require('../public/tools').default;
var PaySucc = React.createClass({
    mixins: [tool],
    getInitialState(){
        return {
            orderNum: '',
            totalAmount: 0,
            t: 5
        }
    },
    componentDidMount(){
        var t = 5;
        var totalAmount = this.getQuery('totalAmount');
        var orderNum = this.getQuery('orderNum');
        if (!totalAmount || !orderNum) {
            return;
        }
        this.setState({orderNum: orderNum, totalAmount: totalAmount});
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
    <PaySucc/>,
    document.getElementById('main')
)