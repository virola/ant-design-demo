import React, { Component } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Tooltip,
} from 'antd';
import {
  ChartCard,
  LineChart,
  Field,
  Bar,
  Pie,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import DateRangePicker from '@/components/DateRangePicker';
import numeral from 'numeral';
import { getTimeDistance } from '@/utils/utils';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Personal.less';

const { TabPane } = Tabs;

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Personal extends Component {

  state = {
    rangePickerValue: getTimeDistance('yesterday'),
    dateRangeChat: getTimeDistance('yesterday'),
    loading: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleRangePickerChange = rangePickerValue => {
    // const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    // console.log(rangePickerValue);

    // dispatch({
    //   type: 'chart/fetchSalesData',
    // });
  };

  handleChatDateChange = dateRangeChat => {
    this.setState({
      dateRangeChat,
    });
    // console.log(dateRangeChat);
  };

  render() {
    const { rangePickerValue, dateRangeChat, loading: propsLoding } = this.state;
    const { chart, loading: stateLoading } = this.props;
    const {
      patientData,
      rankingListData,
      genderPieData,
      msgChartData,
    } = chart;
    const loading = propsLoding || stateLoading;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const pieColors = [ '#988afc', '#73a5fb', '#fa6a69' ];

    const toolTip = (
      <span>截止统计时间： 今天 00:00</span>
    );

    return (
      <PageHeaderWrapper>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title={
                <span>我的患者数</span>
              }
              action={
                <Tooltip
                  title={toolTip}
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              total={
                <span>{numeral(12560).format('0,0')}</span>
              }
              footer={
                <Field
                  label={
                    <span>本月</span>
                  }
                  value={`${numeral(12423).format('0,0')}`}
                />
              }
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              title={<span>我的宣教发送数</span>}
              action={
                <Tooltip
                  title={toolTip}
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={
                <Field
                  label={<span>本月</span>}
                  value={numeral(1234).format('0,0')}
                />
              }
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              title={<span>我的消息回复数</span>}
              action={
                <Tooltip
                  title={toolTip}
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(6560).format('0,0')}
              footer={
                <Field
                  label={<span>本月</span>}
                  value="604"
                />
              }
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
              bordered={false}
              title={<span>我的爱心值</span>}
              action={
                <Tooltip
                  title={toolTip}
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="1280"
              footer={
                <Field
                  label={<span>本月</span>}
                  value="604"
                />
              }
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs
              tabBarExtraContent={
                <DateRangePicker
                  value={rangePickerValue}
                  onChange={this.handleRangePickerChange}
                />
              }
              size="large"
              tabBarStyle={{ marginBottom: 24 }}
            >
              <TabPane
                tab={<span>新增患者</span>}
                key="patient"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={295}
                        title={<span>新增患者趋势图</span>}
                        data={patientData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        <span>患者录入排行</span>
                      </h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span className={styles.rankingItemValue}>
                              {numeral(item.total).format('0,0')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tab={<span>宣教发送数</span>}
                key="xj"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={292}
                        title={<span>宣教发送趋势图</span>}
                        data={patientData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        <span>宣教发送排行</span>
                      </h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24}>
          <Col xl={16} lg={12} md={24} sm={24} xs={24}>
            <Card
              style={{ marginTop: 24 }}
              bordered={false}
              title={
                <span>医患互动</span>
              }
              extra={
                <DateRangePicker
                  value={dateRangeChat}
                  onChange={this.handleChatDateChange}
                />
              }
            >
              <div style={{ padding: '0 24px' }}>
                <LineChart
                  height={400}
                  data={msgChartData}
                  titleMap={{
                    y1: '医护发送消息',
                    y2: '患者发送消息',
                  }}
                />
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={12} md={24} sm={24} xs={24}>
            <Card
              style={{ marginTop: 24, minHeight: 534 }}
              bordered={false}
              title={
                <span>性别分布占比</span>
              }
            >
              <Pie
                hasLegend
                subTitle={<span>患者数</span>}
                total={() => <span>{genderPieData.reduce((pre, now) => now.y + pre, 0)}</span>}
                data={genderPieData}
                valueFormat={value => <span>{numeral(value).format('0,0')}</span>}
                colors={pieColors}
                height={400}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>

      </PageHeaderWrapper>
    );
  }
}

export default Personal;
