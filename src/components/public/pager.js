var React = require('react');
var pager = React.createClass({
    getDefaultProps(){
        return {
            showPage: 10
        }
    },
    getInitialState(){
        return {
            indexx: 0,
            n: 1,
            pageNo: this.props.pageNo,
            locked: false,
            showPage: 10,
            isHide: true
        }
    },
    componentWillMount(){
        this.setState({showPage: Math.min(this.props.totalPage, this.props.showPage)})
    },
    componentWillReceiveProps(nextProps){
        if (nextProps.totalCount !== 0) {
            this.state.isHide = false;
        } else {
            this.state.isHide = true;
        }

        if (nextProps.pageNo === 1) {
            this.state.indexx = 0;
            this.state.n = 1;
            this.state.pageNo = nextProps.pageNo;
        }
        if (nextProps.locked === false) {
            this.state.locked = false;
        }

        this.setState({showPage: Math.min(nextProps.totalPage, this.props.showPage)})


    },
    componentWillUnmount(){
        clearTimeout(this.Timer);
    },
    onPage(){
        this.props.pageHandle(this.state.pageNo);

    },

    onClick(event){
        if (this.state.locked) {
            return
        }

        var target = event.target;
        var cls = target.className;
        var pageNo = this.state.pageNo;
        var indexx = this.state.indexx;
        var n = this.state.n;
        switch (cls) {
            case 'first':
                if (this.state.pageNo === 1) {
                    return
                }
                pageNo = 1;
                indexx = 0;
                n = 1;
                this.setState({pageNo: pageNo, indexx: indexx, n: n});
                break;
            case 'last':
                if (this.state.pageNo === this.props.totalPage) {
                    return
                }
                pageNo = this.props.totalPage;
                indexx = this.state.showPage - 1;
                n = this.props.totalPage - this.state.showPage + 1;
                this.setState({pageNo: pageNo, indexx: indexx, n: n});
                break;
            case 'pre':
                if (this.props.firstPage) {
                    return;
                }
                pageNo--;
                indexx--;
                if (indexx < 0) {
                    n--;
                }
                if (indexx <= 0) {
                    indexx = 0;
                }
                this.setState({pageNo: pageNo, indexx: indexx, n: n, locked: true});
                break;
            case 'next':
                if (this.props.lastPage) {
                    return;
                }
                pageNo++;
                indexx++;
                if (indexx > this.state.showPage - 1) {
                    n++;
                }
                if (indexx >= this.state.showPage) {
                    indexx = this.state.showPage - 1;
                }
                this.setState({pageNo: pageNo, indexx: indexx, n: n, locked: true});
                break;
            case 'page':
                pageNo = parseInt(target.getAttribute('data-index')) + parseInt(target.getAttribute('data-n'));
                indexx = parseInt(target.getAttribute('data-index'));
                this.setState({pageNo: pageNo, indexx: indexx});
                break;
        }
        clearTimeout(this.Timer);
        this.Timer = setTimeout(()=> {
            this.onPage();
        }, 200);

    },
    render(){
        var display = {
            display: this.state.isHide ? 'none' : 'block'
        };
        var noData={
            display: !this.state.isHide ? 'none' : 'block'
        };
        var pages = [];
        //  var showPagers = Math.min(this.props.totalPage, this.state.showPage);
        for (var i = 0; i < this.state.showPage; i++) {
            if (i === this.state.indexx) {
                pages.push(<a className="page active" key={i} data-index={i}
                              data-n={this.state.n}>{this.state.n + i}</a>);
            } else {
                pages.push(<a className="page" key={i} data-index={i} data-n={this.state.n}>{this.state.n + i}</a>);
            }

        }
        return (
            <div>
                <div className="pager" onClick={this.onClick} style={display}>
                    <a className="first">首页</a>
                    <a className="pre">上页</a>
                    {pages}
                    <a className="next">下页</a>
                    <a className="last">末页</a>
                    <a className="pageNo">第{this.props.pageNo}页</a>
                    <a className="totalPage">共{this.props.totalPage}页</a>
                </div>
                <div className="noData" style={noData}>
                    <img src="./images/member_prompt_icon1.png"/>
                    <div>没有相关的数据</div>
                </div>
            </div>

        )
    }
});
exports['default'] = pager;