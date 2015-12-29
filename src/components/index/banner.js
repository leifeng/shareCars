var React = require('react');
class Banner extends React.Component {
    render() {
        return (
            <div className="banner">

                <div className="bannerbg">
                    <img src="images/home_banner.png"/>

                    <div className="bannerHead"></div>
                    <div className="bannerBody"></div>
                    <div className="bannerFoot"></div>
                </div>
                <div className="bannerIcon">
                    <dl>
                        <dt>
                            <span className="icon-home_icon1"></span>
                        </dt>
                        <dd><span>分时租车</span></dd>
                        <dd>费用细化到分钟，为您的出行带来最大限度的实惠与高效。</dd>
                    </dl>
                    <dl>
                        <dt>
                            <span className="icon-home_icon2"></span>
                        </dt>
                        <dd><span>手机遥控</span></dd>
                        <dd>下载手机app，不仅可以查找空闲车辆，还能进行远程预约、远程还车。</dd>
                    </dl>
                    <dl>
                        <dt>
                            <span className="icon-home_icon3"></span>
                        </dt>
                        <dd><span>自助还车</span></dd>
                        <dd>租车、还车....全部流程采用无人值守的先进模式，省时省力。</dd>
                    </dl>
                    <dl>
                        <dt>
                            <span className="icon-home_icon4"></span>
                        </dt>
                        <dd><span>节能环保</span></dd>
                        <dd>零污染！零排放！身在“穹顶之下”的我们，是时候为环境做出一点点改变了。</dd>
                    </dl>
                </div>
            </div>
        )
    }
}


exports['default']= Banner;