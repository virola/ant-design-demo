import React, { PureComponent } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Avatar } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Workplace.less';

@connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.headImage} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              你好，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.jobTitle}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>患者数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>宣教发送</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={6} lg={12} md={12} sm={24} xs={24}>
            <Card style={{ marginBottom: 24 }}>
              <strong>147</strong>
              家合作医院
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12} sm={24} xs={24}>
            <Card style={{ marginBottom: 24 }}>
              <strong>147</strong>
              家合作医院
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12} sm={24} xs={24}>
            <Card style={{ marginBottom: 24 }}>
              <strong>147</strong>
              家合作医院
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12} sm={24} xs={24}>
            <Card style={{ marginBottom: 24 }}>
              <strong>147</strong>
              家合作医院
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={false}
            >
              <div className={styles.chart}>图表占位</div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
