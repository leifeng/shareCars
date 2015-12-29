var React = require('react');
var serviceSelect = require('../ajax/serviceSelect').default;
var Pager = require('../public/pager').default;
var IsOpenService = require('../public/accountIsOpen').default;
var accountManageMixin = require('../ajax/accountManage').default;
var cost = React.createClass({
    mixins: [serviceSelect, accountManageMixin],
    getInitialState(){
        return {
            hide: true,
            handleRemark: '',
            processState: 4,

            list: [],
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
            this.getData();
        });
    },
    pageHandle(pageNo){
        this.consumeRecord(pageNo, 10, (data)=> {
            this.setState({
                list: data.list,
                pageNo: data.pageNo,
                totalPage: data.totalPage,
                totalCount: data.totalCount,
                prePage: data.prePage,
                nextPage: data.nextPage,
                firstPage: data.firstPage,
                lastPage: data.lastPage,
                locked: false
            })
        });
    },
    getData(){
        this.consumeRecord(this.state.pageNo, 10, (data)=> {
            this.setState({
                list: data.list,
                pageNo: data.pageNo,
                totalPage: data.totalPage,
                totalCount: data.totalCount,
                prePage: data.prePage,
                nextPage: data.nextPage,
                firstPage: data.firstPage,
                lastPage: data.lastPage,
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
    render(){
        var table = this.state.list.map(function (item, index) {
            var money = item.sourceAmount || item.topUpAmount;
            var txt = item.sourceAmount !== '' ? '消费单号' : '充值单号';
            var txt2 = item.sourceAmount !== '' ? '消费' : '充值';
            var Num = item.sourceNum || item.topUpNumber;
            return (
                <table key={index}>
                    <thead>
                    <tr>
                        <td colSpan="4">
                            {txt}：{Num}<i>{item.recordingTime}</i>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="tl first">{txt2}</td>
                        <td className="orange">{money}</td>
                        <td>{item.source}</td>
                        <td rowSpan="2" className="orange">{item.accountAmount}</td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="tl">备注:{item.remark}</td>
                    </tr>
                    </tbody>
                </table>
            )
        });
        var display = {
            display: this.state.hide ? 'block' : 'none'
        };
        return (
            <div>
                <div className="title">消费记录</div>
                <div className="costRecord" style={display}>
                    <div>
                        <div className="head"><span
                            className="first">类型</span><span>金额</span><span>来源</span><span>余额</span></div>

                        <div className="panel">
                            {table}
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
                </div>
                <IsOpenService isHide={this.state.hide} processState={this.state.processState}
                               handleRemark={this.state.handleRemark}/>
            </div>
        )
    }
})

exports['default'] = cost;
