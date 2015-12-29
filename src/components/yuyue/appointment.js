var React = require('react');
var Category = require('./category.js').default;
var ResultList = require('./resultList.js').default;
var Point = require('./point.js').default;
var Area = require('./area.js').default;
var baseSelectMixin = require('../ajax/baseSelect.js').default;
var Cookies = require('cookies-js');
var Pager = require('../public/pager').default;
var Appointment = React.createClass({
    mixins: [baseSelectMixin],
    getInitialState(){
        return {
            categoryId: 1,
            areaId: '',
            pointId: '',
            resultList: [],
            areas: [],
            more: false,

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

        var cookie;
        var areaId = '';
        var list = [];
        if (Cookies('www_evcoming_com_area_code')) {
            cookie = decodeURIComponent(Cookies('www_evcoming_com_area_code'));
            areaId = cookie.split('|')[0];
        }

        if (Cookies('areaList')) {
            list = JSON.parse(decodeURIComponent(Cookies('areaList')));
            areaId = areaId || list[0].areaCode;
            this.setState({areas: list, areaId: areaId});
            setTimeout(()=> {
                this.getData(this.state.categoryId, areaId, this.state.pointId);
            }, 30);
        } else {
            this.rentAreaSimple((data)=> {
                list = data;
                areaId = areaId || list[0].areaCode;
                this.setState({areas: list, areaId: areaId});
                Cookies.set('areaList', encodeURIComponent(JSON.stringify(data)), {expires: 1800});
                setTimeout(()=> {
                    this.getData(this.state.categoryId, areaId, this.state.pointId);
                }, 30);
            });
        }
    },
    setCategoryId(id){
        this.setState({categoryId: id});
    },
    setAreaId(id){
        this.setState({areaId: id, pointId: ''});
    },
    setPointId(id){
        this.setState({pointId: id});
    },
    getData(categoryId, areaId, pointId){
        this.appointmentItems(categoryId, areaId, pointId, 1, this.state.pageSize, (pager)=> {
            this.setState({
                resultList: pager.list,
                pageNo: 1,
                totalPage: pager.totalPage,
                totalCount: pager.totalCount,
                prePage: pager.prePage,
                nextPage: pager.nextPage,
                firstPage: true,
                lastPage: pager.lastPage
            });
        });
    },
    pageHandle(pageNo){
        this.appointmentItems(this.state.categoryId, this.state.areaId, this.state.pointId, pageNo, this.state.pageSize, (pager)=> {
            this.setState({
                resultList: pager.list,
                pageNo: pager.pageNo,
                totalPage: pager.totalPage,
                totalCount: pager.totalCount,
                prePage: pager.prePage,
                nextPage: pager.nextPage,
                firstPage: pager.firstPage,
                lastPage: pager.lastPage,
                locked: false
            });
        });
    },
    onClick(event) {
        const target = event.target;
        if(target.nodeName==='I'||target.parentNode.className==='more'){
            this.setState({more: !this.state.more});
            return
        }
        if (target.nodeName === 'A') {
            if (target.className === 'more') {
                this.setState({more: !this.state.more});
            } else {
                let id = target.getAttribute('data-id');
                let str = target.parentNode.className;
                switch (str) {
                    case'category':
                        this.setCategoryId(id);
                        this.getData(id, this.state.areaId, this.state.pointId);
                        break;
                    case 'area':
                        this.state.areaId = id;
                        this.state.pointId = '';
                        this.getData(this.state.categoryId, id, '');
                        break;
                    case 'point':
                        this.setPointId(id);
                        this.getData(this.state.categoryId, this.state.areaId, id);
                        break;
                    default:
                        break;
                }
            }
        }
    },
    render() {
        return (
            <div className="appointment content">
                <div className="filter" onClick={this.onClick}>
                    <Category categoryId={this.state.categoryId}/>
                    <Area areaId={this.state.areaId} areas={this.state.areas}/>
                    <Point pointId={this.state.pointId} areaId={this.state.areaId} more={this.state.more}/>
                </div>
                <ResultList categoryId={this.state.categoryId}
                            areaId={this.state.areaId}
                            resultList={this.state.resultList}/>
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
exports['default'] = Appointment;