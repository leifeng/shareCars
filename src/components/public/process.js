var React =require('react');
var Process = React.createClass({
    getDefaultProps(){
        return {
            list: ["在线注册", "申请开通上传证件照片", "在线支付保证金", "等待审核通过"]
        }
    },
    render(){
        var list = [];
        for (var i = 0; i < this.props.list.length; i++) {
            if (this.props.stateIndex > i + 1) {
                list.push(<a className="finish" key={i+1}>{i + 1}<i></i></a>);
                list.push(<a className="line greenLine" key={i+10}></a>);
            } else if (this.props.stateIndex === i + 1) {
                list.push(<a className="action" key={i+1}>{i + 1}<i></i></a>);
            } else {
                list.push(<a className="line grayLine" key={i+1}></a>);
                list.push(<a className="unfinished" key={i+10}>{i + 1}<i></i></a>);
            }
        }

        var txt = this.props.list.map((item, index)=> {
            if (this.props.stateIndex === index + 1) {
                return <a className="action" key={index}>{item}</a>
            } else {
                return <a key={index}>{item}</a>
            }

        });
        return (
            <div className="process">
                <div className="img">
                    {list}
                </div>
                <div className="txt">
                    {txt}
                </div>
            </div>
        )
    }
});
exports['default']=Process;