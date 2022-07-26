<template>
  <div class="haoke-list">
    <div class="header">
      <Header @click="jump" :title="`城市列表`"></Header>
      <!-- 搜索框S -->
      <div class="search">
        <van-search
          v-model="value"
          show-action
          :label="cname"
          placeholder="请输入搜索关键词"
        >
          <template #left-icon>
            <i class="haoke haoke-xiajiantou" @click="selectCity"></i
            ><i class="haoke-shuxian">|</i> <i class="haoke haoke-sousuo_o"></i>
          </template>
          <template #action>
            <div><i class="haoke haoke-ditu"></i></div>
          </template>
        </van-search>
      </div>
      <!-- 搜索框E -->
    </div>
    <!-- 中间分类区域S -->
    <div class="area-classify">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value2" title="区域">
          <div slot="default">
            <van-picker show-toolbar :columns="columns" @change="onChangeArea">
              <div slot="columns-bottom"></div>
            </van-picker>
          </div>
        </van-dropdown-item>
        <van-dropdown-item v-model="mannerList" title="方式">
          <div slot="default">
            <van-picker
              show-toolbar
              :columns="columnsManner"
              @confirm="onConfirm"
              @cancel="onCancel"
            />
          </div>
        </van-dropdown-item>
        <van-dropdown-item v-model="value2" title="租金">
          <div slot="default">
            <van-picker
              show-toolbar
              :columns="columnsPrice"
              @confirm="onConfirm"
              @cancel="onCancel"
            />
          </div>
        </van-dropdown-item>
        <van-dropdown-item v-model="value2" title="筛选" @open="show = true">
          <div slot="default"></div>
        </van-dropdown-item>
      </van-dropdown-menu>
      <van-popup
        v-model="show"
        position="right"
        :style="{ width: '80%', height: '100%' }"
      >
        <Popup></Popup>
      </van-popup>
    </div>
    <!-- 主题区域 -->
    <main>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="300"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div class="house-item" v-for="(item, index) in houseList" :key="index">
          <div class="left">
            <img :src="`${baseURL}${item.houseImg}`" alt="" />
          </div>
          <div class="right">
            <h4 class="house-name">{{ item.title }}</h4>
            <p class="house-info">{{ item.desc }}</p>
            <div class="house-adress">
              <span>{{ item.tags[0] }}</span>
            </div>
            <div class="house-price">
              <span class="price">{{ item.price }}</span
              >元/月
            </div>
          </div>
        </div>
      </van-list>
    </main>
    <!-- 主体区域E -->
  </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/Header';
import Popup from './component/Popup.vue';
// import stroage from '@/utils/stroage';
// 引入根据城市名获取城市信息的方法
// 引入获取房屋信息的接口
// 引入获取指定城市子级城市列表的接口
import {
  getCityInfoNameAPI,
  getHouseInfoAPI,
  getHouseCondiTionsAPI
} from '@/api';
// 引入获取热力城市的数据
// import { getHotCityListAPI } from '@/api'
// 引入根据条件查询房屋获取房源信息的接口
// import { getCityHouseInfoAPI } from '@/api'
export default {
  name: 'HaokeListIndex',
  components: { Header, Popup },
  data () {
    return {
      error: false,
      loading: false,
      finished: false,
      start: 1,
      end: 10,
      limit: 10,
      value: '',
      value1: 0,
      value2: 'a',
      mannerList: [], // 方式
      id: '', // 城市id
      houseList: [], // 指定城市相关数据
      baseURL: '', // 资源根路径
      // cname: '', // 城市名
      sonList: [], // 指定城市子级城市列表数据
      show: false,
      // columns: [
      //   // 第一列
      //   {
      //     values: [],
      //     defaultIndex: 2
      //   },
      //   // 第二列
      //   {
      //     values: [],
      //     defaultIndex: 1
      //   }
      // ],
      cityList: this.columnsSonCity,
      columnsSonCity: [], // 子级城市数据
      columnsManner: [],
      columnsPrice: [],
      columns: [],
      areaObj: {}, //
      filterList: []
    };
  },
  computed: {
    cname () {
      return this.$store.state.cName;
    }
  },

  mounted () {},
  created () {
    this.getCityInfoName();
    this.getHouseInfo();
  },

  // watch: {
  //   // 监视城市名的变化
  //   async cname (newVal) {

  //     // 触发获取子级城市列表的数据
  //     this.getSonCityList(this.id);
  //   }
  // },

  methods: {
    // 加载事件
    async onLoad () {
      this.start = this.start + this.limit;
      this.end = this.end + this.limit;
      try {
        const houseRes = await getHouseInfoAPI(this.id, this.start, this.end);
        this.houseList.push(...houseRes.data.body.list);
        this.loading = false;
        if (houseRes.data.body.list === []) {
          return (this.finished = true);
        }
      } catch (error) {
        this.error = true;
      }
    },
    async getCityInfoName () {
      const res = await getCityInfoNameAPI(this.cname);
      console.log(res);
      // 获取新的城市id
      this.id = res.data.body.value;
    },
    // 获取城市列表数据
    async getHouseInfo () {
      try {
        const houseRes = await getHouseInfoAPI(this.id, this.start, this.end);
        this.baseURL = houseRes.config.baseURL;
        this.houseList = houseRes.data.body.list;
      } catch (error) {
        this.error = true;
      }
    },
    showPopup () {
      this.show = true;
    },
    // 确认
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel () {
      this.$toast('取消');
    },
    // 跳转到指定城市
    selectCity () {
      // 点击下箭头跳转到城市页面
      this.$router.push({
        name: 'city',
        params: {
          cname: this.cname
        }
      });
    },
    jump () {
      // 点击触发子组件内的方法，子组件内再触发vant绑定的左箭头的点击事件，跳转回去
      this.$emit('jump');
    },
    // 根据城市名获取相应子级城市
    async getSonCityList (id) {
      try {
        const { data } = await getHouseCondiTionsAPI(id);
        console.log(data); // 获取到详细信息
        this.filterList = data.body;
        // 获取对应的方式数组
        data.body.floor.forEach((item) => this.columnsManner.push(item.label));
        // 获取对应的价格数组
        data.body.price.forEach((item) => this.columnsPrice.push(item.label));

        // const arr = [];
        // data.body.area.children.forEach((item) => {
        //   const obj = {};
        //   obj.text = item.label;
        //   obj.children = item.children;
        //   console.log(obj);
        //   arr.push(obj);
        // });
        // console.log(arr);
        // this.columns = [
        //   {
        //     text: data.body.area.label,
        //     children: [
        //       text:,
        //       children:[]
        //     ]
        //   },
        //   {
        //     text: data.body.subway.label,
        //     children: data.body.subway.children
        //   }
        // ];
        // console.log(this.columns);
        // const areaList = [];
        // const areaObj = { text: data.body.area.children[1].label };
        // this.columns = [
        //   {
        //     text: data.area.label,
        //     children: [
        //       text:data.area.
        //     ]
        //   }
        // ];
        const areaArr = []; // 区名
        const subwayArr = []; // 地铁名
        // const loadList = []; // 路名（区）
        const obj = {};
        data.body.area.children.forEach((item) => {
          areaArr.push(item.label);
        });
        data.body.area.children.forEach((item) => {
          areaArr.push(item.label);
        });
        // console.log(loadList);
        data.body.subway.children.forEach((item) => subwayArr.push(item.label));
        // 获取区域数据
        obj[data.body.area.label] = areaArr;
        // 获取地铁数据
        obj[data.body.subway.label] = subwayArr;
        this.areaObj = obj;
        this.columns = [{ values: Object.keys(obj) }, { values: obj['区域'] }];
      } catch (error) {
        this.$toast.fail('获取数据失败，请稍后重试！');
      }
    },
    // 区域多级联动
    onChangeArea (picker, values) {
      picker.setColumnValues(1, this.areaObj[values[0]]);
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.haoke-list {
  // 顶部标题栏样式
  .list-header {
    position: relative;
    .van-nav-bar__content {
      display: flex;
      justify-content: center;
    }
  }
  // 搜索框样式
  .van-search {
    position: absolute;
    top: 10px;
    z-index: 2;
    // margin-bottom: 116px;
    width: 90%;
    margin-left: 60px;
    .van-search__label {
      padding: 0 20px;
    }
    .van-field {
      .van-field__left-icon {
        .haoke-xiajiantou {
          margin-right: 9px;
          color: #7f7f80;
        }
        .haoke-sousuo_o {
          font-size: 30px;
        }
        .haoke-shuxian {
          color: #e5e5e5;
        }
      }
    }
    .van-search__content {
      margin-left: 40px;
      margin-right: 40px;
    }
    .van-search__action {
      color: #fff;

      .haoke {
        font-size: 50px;
        padding-right: 20px;
      }
    }

    background-color: transparent !important;
    .van-search__content {
      width: 300px;
    }
  }
  .area-classify {
    padding-top: 0;
    .van-dropdown-menu {
      padding-top: 100px;
    }
    :deep(.van-tab) {
      position: relative;
      font-size: 34px;
    }
    :deep(.van-tabs__line) {
      display: none;
      .van-tabs__wrap {
        height: 30px;
        padding-bottom: 5px;
      }
    }
    :deep(.van-tabs__content) {
      position: absolute;
      bottom: 0;
      background-color: red !important;
    }
  }
  :deep(.van-tabs__wrap) {
    border-bottom: 2px solid #e4e6f0;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
  //  :deep(.van-search__label){
  //         padding:0 20px!important;
  //       }
  //  主体区域
  main {
    padding: 0 30px;
    .house-item {
      display: flex;
      padding-top: 36px;
      height: 180px;
      .left {
        width: 212px;
        height: 160px;
        background-color: #21b97a;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1;
        padding-left: 24px;
        h4.house-name {
          width: 5.93333rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          // width:100%;
          font-size: 30px;
          color: #394043;
        }
        p.house-info {
          font-size: 24px;
          color: #afb2b3;
          padding-top: 10px;
        }
        .house-adress {
          span {
            display: inline-block;
            font-size: 24px;
            border-radius: 6px;
            padding: 8px 10px;
            margin-right: 10px;
            // margin-bottom:10px;
            line-height: 24px;
            color: #39becd;
            background: #e1f5f8;
          }
        }
        .house-price {
          font-size: 24px;
          color: #fa5741;
          span.price {
            font-size: 32px;
            font-weight: 700;
            // padding: 10px 0;
            color: #fa5741;
          }
        }
      }
    }
  }
}
</style>
