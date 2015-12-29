var React = require('react');
var accountManageMixin  = require( '../ajax/accountManage.js').default;
var lost = React.createClass({
    mixins: [accountManageMixin],
    getInitialState(){
        return {
            value: '',
            isHide: true
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.isHide !== '') {
            this.setState({isHide: nextProps.isHide});
        }
    },
    onChange(event){
        var target = event.target;
        this.setState({value: target.value});
    },
    close(){
        this.setState({isHide: true});
    },
    postData(){
        this.reportLoss(this.state.value, ()=> {
            alert('提交成功!');
            this.setState({isHide: true});
        })
    },
    render(){
        var style = {
            display: this.state.isHide ? 'none' : 'block'
        };
        var maskStyle = {
            height: document.body.clientHeight,
            display: this.state.isHide ? 'none' : 'block'
        };
        return (
            <div>
                <div className="mask" style={maskStyle}></div>
                <div className="lost" style={style}>
                    <div className="title">会员卡挂失<a onClick={this.close}><i className="fa fa-times"></i></a></div>
                    <div className="body">
                        <label>请输入登录密码</label>
                        <input type="password" onChange={this.onChange}/>
                        <a onClick={this.postData}>提交</a>
                    </div>
                </div>
            </div>

        )
    }
});
exports['default']= lost;