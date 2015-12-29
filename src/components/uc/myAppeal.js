var React = require('react');
var serviceSelect = require('../ajax/serviceSelect').default;
var Pager = require('../public/pager').default;
var IsOpenService = require('../public/accountIsOpen').default;
var accountManageMixin = require('../ajax/accountManage').default;
var PopAppeal = React.createClass({
    getInitialState() {
        return {
            isHide: this.props.isHide
        }
    },
    render() {
        var display = {
            display: this.props.isHide ? 'none' : 'block'
        };
        var height = {
            height: document.body.scrollHeight + 'px'
        };
        return (
            <div style={display}>
                <div className="mask" style={height}></div>
                <div className="pop pop-appeal-show">
                    <div className="title">处理结果<a className="close" onClick={this.props.closeHandle}><i
                        className="fa fa-times"></i></a></div>
                    <div className="body">
                        {this.props.msg}
                    </div>
                </div>
            </div>
        )
    }
});

var appeal = React.createClass({
    mixins: [serviceSelect, accountManageMixin],
    getInitialState(){
        return {
            list: [],
            msg: '',
            isHide: true,
            hide: true,
            handleRemark: '',
            processState: 4,

            pageSize: 10,
            pageNo: 1,
            totalPage: 0,
            totalCount: 0,
            prePage: 0,
            nextPage: 2,
            firstPage: true,
            lastPage: false,
            locked: false
        }
    },
    componentWillMount(){
        this.getProcess(()=> {
            this.pageHandle(1);
        });

    },
    onClick(event){
        var target = event.target;
        if (target.nodeName === 'A') {
            var msg = target.getAttribute('data-msg');
            this.setState({msg: msg, isHide: false});
        }
    },
    pageHandle(pageNo){
        this.appealRecord(pageNo, this.state.pageSize, (pager)=> {
            this.setState({
                list: pager.list,
                pageNo: pager.pageNo,
                totalPage: pager.totalPage,
                totalCount: pager.totalCount,
                prePage: pager.prePage,
                nextPage: pager.nextPage,
                firstPage: pager.firstPage,
                lastPage: pager.lastPage,
                locked: false

            })
        });
    },
    getProcess(cb){
        this.accountProcess((flag, data)=> {
            if (flag === 1) {
                if (data.handleState === 4) {
                    cb()
                } else {
                    this.setState({processState: data.handleState, handleRemark: data.handleRemark, hide: false})
                }

            } else if (flag === -2) {
                this.setState({processState: -2, hide: false})
            } else {
                location.href = '/zd/user.html?cb=' + encodeURIComponent(location.pathname + location.hash);
            }
        })
    },
    closePopHandle()    {
        this.setState({isHide: true})
    },
    render(){
        var table = this.state.list.map(function (item, index) {
            var display = {
                display: item.isHandle === 1 ? 'block' : 'none'
            };
            return (
                <tr key={index}>
                    <td className="first">{item.sourceNum}</td>
                    <td className="second">{item.reViewTxt}</td>
                    <td>{item.isHandle === 1 ? '已处理' : '未处理'}</td>
                    <td>{item.handleDT}</td>
                    <td><a href="javascript:;" data-msg={item.handleReply} style={display}>查看详情</a></td>
                </tr>
            )
        });
        var display = {
            display: this.state.hide ? 'block' : 'none'
        };
        return (
            <div>
                <PopAppeal msg={this.state.msg} isHide={this.state.isHide} closeHandle={this.closePopHandle}/>

                <div className="title">我的申诉</div>
                <div className="myAppeal" style={display}>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <td className="first">订单编号</td>
                                <td className="second">申诉内容</td>
                                <td>申诉状态</td>
                                <td>处理时间</td>
                                <td>操作</td>
                            </tr>
                            </thead>
                            <tbody onClick={this.onClick}>
                            {table}
                            </tbody>
                        </table>
                    </div>
                    <Pager pageHandle={this.pageHandle}
                           locked={this.state.locked}
                           pageNo={this.state.pageNo}
                           totalPage={this.state.totalPage}
                           totalCount={this.state.totalCount}
                           prePage={this.state.prePage}
                           nextPage={this.state.nextPage}
                           firstPage={this.state.firstPage}
                           lastPage={this.state.lastPage}
                        />
                </div>
                <IsOpenService isHide={this.state.hide} processState={this.state.processState}
                               handleRemark={this.state.handleRemark}/>
            </div>
        )
    }
});
exports['default'] = appeal;