import React, { PureComponent } from 'react';
// import moment from 'moment';
import {
  DatePicker,
} from 'antd';
import { getTimeDistance } from '@/utils/utils';

import styles from './index.less';

const { RangePicker } = DatePicker;

class DateRangePicker extends PureComponent {
  state = {
    rangePickerValue: getTimeDistance('yesterday'),
  };

  selectDate = type => {
    // const { dispatch } = this.props;
    const { onChange } = this.props;

    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    if (onChange) {
      onChange(getTimeDistance(type));
    }
  }

  handleRangePickerChange = rangePickerValue => {
    const { onChange } = this.props;
    // const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    if (onChange) {
      onChange(rangePickerValue);
    }

  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  }

  render () {
    const { rangePickerValue } = this.state;
    // const { onChange } = this.props;
    let { value } = this.props;
    if (!value) {
      value = rangePickerValue;
    }

    return (
      <div className={styles.dateRangePickerWrap}>
        <div className={styles.dateRangePicker}>
          <a className={this.isActive('yesterday')} onClick={() => this.selectDate('yesterday')}>
            <span>昨天</span>
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            <span>本周</span>
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            <span>本月</span>
          </a>
        </div>
        <RangePicker
          value={value}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );
  }

}

export default DateRangePicker;
