var React = require('react');
var Cookies = require('cookies-js');
var accountManage = require('../ajax/accountManage').default;
var baseSelect = require('../ajax/baseSelect').default;
var Pager = require('../public/pager').default;
var IsOpenService = require('../public/accountIsOpen').default;
var coupons = React.createClass({
    mixins: [accountManage, baseSelect],
    getDefaultProps(){
        return {
            tabs: [{i: 2, name: '代金券'}, {i: 1, name: '代时券'}],
            bg: ['greenbg', 'bluebg', 'redbg']
        }
    },
    getInitialState(){
        return {
            state: 2,
            areaCode: '',
            areaName: '全部',
            areaList: [],
            coupons: [],
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
        var list = [];
        if (Cookies('www_evcoming_com_area_code')) {
            let cookie = decodeURIComponent(Cookies('www_evcoming_com_area_code'));
            let code = cookie.split('|')[0];
            let name = cookie.split('|')[1];
            this.setState({areaCode: code, areaName: name});
        }
        if (Cookies('areaList')) {
            list = JSON.parse(decodeURIComponent(Cookies('areaList')));
            list.unshift({areaCode: '', areaName: '全部'});
            this.setState({areaList: list});
        } else {
            this.rentAreaSimple((data)=> {
                list = data;
                list.unshift({areaCode: '', areaName: '全部'});
                this.setState({areaList: list});
                Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)));
            });
        }
        this.getProcess(()=> {
            this.getData(this.state.state, this.state.areaCode);
        });
    },
    getData(state, areaCode){
        this.coupons(state, areaCode, '', '', this.state.pageNo, this.state.pageSize, (data)=> {
            this.setState({
                coupons: data.list,
                pageNo: 1,
                totalPage: data.totalPage,
                totalCount: data.totalCount,
                prePage: data.prePage,
                nextPage: data.nextPage,
                firstPage: data.firstPage,
                lastPage: data.lastPage,
                locked: false
            });
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
    pageHandle(pageNo){
        this.coupons(this.state.state, this.state.areaCode, '', '', pageNo, this.state.pageSize, (data)=> {
            this.setState({
                coupons: data.list,
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
    tabHandel(n){
        this.setState({state: n, pageNo: 1, isHide: true});
        this.getData(n, this.state.areaCode);
    },
    clickHandle(event){
        var target = event.target;
        var areaCode = '';
        var areaName = '';
        if (target.className === 'areaList') {
            this.setState({isHide: !this.state.isHide});
        } else if (target.nodeName === 'A') {
            areaCode = target.getAttribute('data-id');
            areaName = target.innerHTML;
            this.setState({areaCode: areaCode, areaName: areaName, isHide: true, pageNo: 1});
            this.getData(this.state.state, areaCode);
        }
    },
    render(){

        var style = {
            display: this.state.isHide ? 'none' : 'block'
        };
        var mDisplay = {
            display: this.state.state === 2 ? "inline-block" : "none"
        };
        var tDisplay = {
            display: this.state.state === 1 ? "inline-block" : "none"
        };
        var coupons = this.state.coupons.map(function (item, index) {
            return (
                <div key={index} className={"couponItem "+this.props.bg[parseInt(Math.random()*3)]}>
                    <div className="left">
                        <span style={mDisplay}>￥</span>{item.dailyLimit}<span style={tDisplay}>Min</span>
                    </div>
                    <div className="right">
                        <dl>
                            <dt>{item.areaName}</dt>
                            <dd>总额：{item.amount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每日限额：{item.leftAmount}</dd>
                            <dd>当日累计消费:{item.dailyConsume}</dd>
                            <dd>作废日期：{item.expirationDate}</dd>
                        </dl>
                    </div>
                </div>
            )
        });

        var tab = this.props.tabs.map((item, index)=> {
            if (item.i === this.state.state) {
                return ( <a className="active" onClick={this.tabHandel.bind(null,item.i)} key={index}>{item.name}</a>);
            } else {
                return ( <a onClick={this.tabHandel.bind(null,item.i)} key={index}>{item.name}</a>);
            }
        });
        var display = {
            display: this.state.hide ? 'block' : 'none'
        };
        return (
            <div>
                <div className="title">优惠券</div>
                <div className="coupon" style={display}>
                    <div className="tab">
                        {tab}
                    </div>
                    <div>
                        <div className="areaList" onClick={this.clickHandle}>
                            {this.state.areaName}
                            <div className="list" style={style}>
                                {this.state.areaList.map(function (item, index) {
                                    return <a key={index} data-id={item.areaCode}>{item.areaName}</a>
                                })}
                            </div>
                        </div>
                        <div className="couponList">
                            {coupons}
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
});
exports['default'] = coupons;