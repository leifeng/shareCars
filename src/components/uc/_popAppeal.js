var React = require('react');
var bbsMixin = require('../ajax/bbs').default;
var appeal = React.createClass({
    mixins: [bbsMixin],
    getInitialState(){
        return {
            id: this.props.id,
            msg: '',
            isHide: this.props.isHide,
            isSuccess: false,
            txt: ''
        }
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.id !== '') {
            this.setState({isSuccess: false, id: nextProps.id});
        }
    },
    changeHandle(event){
        var target = event.target;
        this.setState({
            msg: target.value
        });
    },

    sendHandle(){
        if (this.state.msg === '') {
            this.setState({isSuccess: true, txt: '请输入申诉信息'});
            return
        }
        if (this.state.id) {
            this.appeal(this.state.id, this.state.msg, ()=> {
                this.setState({msg: '', isSuccess: true, txt: '申诉成功'});
            });
        }
    },
    render(){
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var isSuccess = {
            display: !this.state.isSuccess ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };

        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-appeal">
                    <div className="title">申诉<a className="close"
                                                onClick={this.props.closeHandle.bind(null,'appeal')}>x</a></div>
                    <div className="body">
                        <h2 style={isSuccess}>{this.state.txt}</h2>
                        <textarea value={this.state.msg} onChange={this.changeHandle}/>
                        <a onClick={this.sendHandle}>申诉</a>
                    </div>
                </div>
            </div>
        )
    }
});
exports['default'] = appeal;