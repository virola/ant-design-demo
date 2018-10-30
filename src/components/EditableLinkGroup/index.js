import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.less';

// TODO: 添加逻辑

class EditableLinkGroup extends PureComponent {
  static propTypes = {
    links: PropTypes.array,
    // onAdd: PropTypes.func,
    linkElement: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  };

  static defaultProps = {
    links: [],
    // onAdd: () => {},
    linkElement: 'a',
  };

  render() {
    const { links, linkElement } = this.props;
    return (
      <div className={styles.linkGroup}>
        {links.map(link =>
          createElement(
            linkElement,
            {
              key: `linkGroup-item-${link.id || link.title}`,
              to: link.href,
              href: link.href,
            },
            link.title
          )
        )}
      </div>
    );
  }
}

export default EditableLinkGroup;
