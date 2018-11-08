import React, { PureComponent } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Avatar, List } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

// import styles from './Personal.less';

@connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Personal extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });

    // dispatch({
    //   type: 'department/fetch',
    // });
  }

  componentWillUnmount() {
    // const { dispatch } = this.props;
  }

  render() {
    // const {
    //   currentUser,
    //   currentUserLoading,
    //   departmentLoading,
    //   department: { list },
    // } = this.props;

    return (
      <PageHeaderWrapper>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              title={
                <span>汇总数据</span>
              }
            >
              汇总数据内容
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Personal;
