import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Avatar, List } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Workplace.less';

@connect(({ user, department, loading }) => ({
  currentUser: user.currentUser,
  department,
  departmentLoading: loading.effects['department/fetch'],
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });

    dispatch({
      type: 'department/fetch',
    });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
  }

  renderDepartments() {
    const { department: { list }, currentUser } = this.props;
    return list.map(item => (
      <List.Item key={item.projectId}>
        <List.Item.Meta
          title={
            <div className={item.projectId === currentUser.projectId ? styles.active : ''}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.datetime} title={item.createdTime}>
                加入日期：{moment(item.createdTime).format('YYYY-MM-DD')}
              </span>
            </div>
          }
        />
      </List.Item>
    ));
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
      departmentLoading,
      department: { list },
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
              。
            </div>
            <div className={styles.contentSubTitle}>欢迎使用壁虎E护·院外延续护理云平台</div>
            <div>
              {currentUser.jobTitle || '职称未填写'}&nbsp;&nbsp;|&nbsp;&nbsp;{currentUser.departmentName}
            </div>
          </div>
        </div>
      ) : null;


    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title={
                <span>全院科室（{list.length}）</span>
              }
              loading={departmentLoading}
            >
              <List loading={departmentLoading} size="large">
                <div className={styles.projectList}>{this.renderDepartments()}</div>
              </List>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
