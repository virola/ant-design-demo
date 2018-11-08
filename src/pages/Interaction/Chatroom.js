import React, { Component } from 'react';
import { connect } from 'dva';
// import { FormattedMessage } from 'umi/locale';
import {
  Card,
  Layout,
  Tabs,
  Icon,
  List,
  Avatar,
  Badge,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Chatroom.less';

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

const data = [
  {
    name: '患者1',
    count: Math.round(Math.random() * 200),
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    name: '患者2',
    count: Math.round(Math.random() * 200),
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    name: '患者3',
    count: Math.round(Math.random() * 200),
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    name: '患者4',
    count: Math.round(Math.random() * 200),
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
];

@connect(({ chart, loading }) => ({
  chart,
  conversationLoading: loading.effects['conversation/fetch'],
}))
class Chatroom extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'conversation/fetch',
    });
  }

  componentWillUnmount() {
  }


  render() {
    const { conversationLoading } = this.props;

    return (
      <PageHeaderWrapper>
        <Card
          className={styles.chatBox}
          bordered={false}
        >
          <Layout>
            <Sider theme="light" width="256px">
              <Tabs defaultActiveKey="conversation">
                <TabPane tab={<Icon className={styles.tabIcon} type="message" />} key="conversation">
                  <List
                    loading={conversationLoading}
                    itemLayout="horizontal"
                    dataSource={data}
                    size="large"
                    renderItem={item => (
                      <List.Item className={styles.listItem}>
                        <div className={styles.avatar}>
                          <Badge count={item.count} overflowCount={99}>
                            <Avatar size="large" src={item.avatar} />
                          </Badge>
                        </div>
                        <div className={styles.content}>{item.name}</div>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab={<Icon className={styles.tabIcon} type="user" />} key="contactor">
                  Tab 2
                </TabPane>
                <TabPane tab={<Icon className={styles.tabIcon} type="picture" />} key="attachment">
                  附件列表
                </TabPane>
              </Tabs>
            </Sider>
            <Content>卡片内容卡片内容</Content>
          </Layout>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Chatroom;
