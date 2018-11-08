import { fakeChartData } from '@/services/api';

const fakeData = [];
for (let index = 0; index < 7; index++) {
  fakeData[index] = {
    x: `test-${index}`,
    y: Math.round(Math.random() * 1000),
    title: `老师-${index}`,
    total: Math.round(Math.random() * 1000),
  };
}

const genderData = [
  {
    x: '未知性别',
    y: Math.round(Math.random() * 1000),
  },
  {
    x: '男性',
    y: Math.round(Math.random() * 1000),
  },
  {
    x: '女性',
    y: Math.round(Math.random() * 1000),
  },
];

const today = new Date();
today.setMinutes(0);
today.setSeconds(0);

const fakeLineData = [];
for (let index = 0; index < 24; index++) {
  const day = today - (25 - index) * 24 * 3600 * 1000;
  fakeLineData[index] = {
    x: day,
    y1: Math.round(Math.random() * 1000),
    y2: Math.round(Math.random() * 1000),
  };
}

export default {
  namespace: 'chart',

  state: {
    // 新增患者数据
    patientData: [ ...fakeData ],
    // 录入排行
    rankingListData: [ ...fakeData ],
    // 性别分布
    genderPieData: [ ...genderData ],
    // 医患互动数据
    msgChartData: [ ...fakeLineData ],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      const data = {
        // 新增患者数据
        patientData: [ ...fakeData ],
        // 录入排行
        rankingListData: [ ...fakeData ],
        // 性别分布
        genderPieData: [ ...genderData ],
        // 医患互动数据
        msgChartData: [ ...fakeLineData ],
      };
      yield put({
        type: 'save',
        payload: response || data,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          patientData: response.patientData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        patientData: [],
        rankingListData: [],
        genderPieData: [],
        msgChartData: [],
      };
    },
  },
};
