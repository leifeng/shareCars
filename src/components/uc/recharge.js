var React = require('react');

var recharge = React.createClass({
    render(){
        console.log('recharge.....')
        return (
            <div>
                <div className="title">充值</div>
                <div className="recharge">
                    <div>
                        <label>当前密码：</label>
                        <input type="password"/>
                        <label>新密码：</label>
                        <input type="password"/>
                        <label>确认新密码：</label>
                        <input type="password"/>
                        <a>提交</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = recharge;