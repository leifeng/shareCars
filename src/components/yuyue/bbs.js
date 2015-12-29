var React = require('react');
var Star = require('../public/star.js').default;
var Pager = require('../public/pager').default;
var baseSelectMixin = require('../ajax/baseSelect.js').default;
var BBs = React.createClass({
    mixins: [baseSelectMixin],
    getInitialState(){
        return {
            list: [],
            avgReViewValue: 3,

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
        this.pageHandle(1);
    },
    pageHandle(pageNo){
        this.comment(this.props.vin, pageNo, this.state.pageSize, (pager)=> {
            this.setState({
                list: pager.page.list,
                avgReViewValue: pager.avgReViewValue,
                pageNo: pager.page.pageNo,
                totalPage: pager.page.totalPage,
                totalCount: pager.page.totalCount,
                prePage: pager.page.prePage,
                nextPage: pager.page.nextPage,
                firstPage: pager.page.firstPage,
                lastPage: pager.page.lastPage,
                locked: false
            })
        });
    },
    render() {
        var list = this.state.list.map(function (item, index) {
            return (
                <li key={index}>
                    <div className="headImg">
                        <img src="./images/line_tou.png"/>
                    </div>
                    <div className="ping">
                        <strong>{item.nickName}<Star starNum="2"/></strong>
                        {item.reViewTxt}
                    </div>
                    <div className="time">
                        <span>{item.createDT}</span>
                    </div>
                </li>
            )
        });
        return (
            <div className="bbs">
                <div className="title">用户评论<em>({this.state.totalCount})</em><Star starNum={this.state.avgReViewValue}/>
                </div>
                <ul>
                    {list}
                </ul>
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
        )
    }
});
exports['default'] = BBs;