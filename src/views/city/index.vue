<template>
  <div class="city-container">
    <!-- 头部标题栏S -->
    <div class="header">
      <!-- <Header :title="`城市列表`"></Header> -->
      <!-- 头部标题栏S -->
      <div class="header">
        <van-nav-bar title="当前城市" left-arrow @click-left="onClickLeft" />
      </div>
      <!-- 头部标题栏E -->
    </div>
    <!-- 头部标题栏E -->
    <!-- 城市列表展示S -->
    <div class="city">
      <!-- 当前城市S -->
      <div class="now-city">
        <van-cell-group>
          <van-cell title="当前城市" value="#">
            <span slot="label">{{ cname }}</span>
          </van-cell>
        </van-cell-group>
      </div>
      <!-- 当前城市E -->
      <!-- 热门城市S -->
      <div class="hot-city">
        <van-cell-group>
          <div class="hot-city-title">热门城市</div>
          <van-cell
            :value="item.label"
            v-for="(item, index) in hotCityList"
            :key="index"
            @click="getHotName(item.label)"
          ></van-cell>
        </van-cell-group>
      </div>
      <!-- 热门城市E -->
      <!-- 城市列表E -->
      <van-index-bar
        :sticky="false"
        highlight-color="#21b97a"
        class="city-list"
      >
        <van-index-anchor
          v-for="(item, index) in firstNameList"
          :key="index"
          :index="index"
        >
          <span>{{ item.length == 0 ? '' : index }}</span>
          <van-cell
            @click="chooseCity(citem)"
            v-for="(citem, cindex) in item"
            :key="cindex"
            :title="citem"
          ></van-cell>
        </van-index-anchor>
      </van-index-bar>
      <!-- 城市列表E -->
    </div>
    <!-- 城市列表展示E -->
  </div>
</template>

<script>
// 导入获取城市列表的请求方法
import { getCityListAPI, getHotCityListAPI } from '@/api';
import pinyin from 'js-pinyin/index.js';
// 引入头部组件
// import Header from '@/components/Header.vue'
export default {
  name: 'HaokeRoomIndex',
  // components: { Header },
  data () {
    return {
      cityList: [],
      cityNameList: [],
      FirstPin: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'W',
        'X',
        'Y',
        'Z'
      ],
      firstNameList: [],
      nameFirst: [],
      hotCityList: []
      // cname: ''
    };
  },

  mounted () {},
  computed: {
    // computedCityList () {
    //   return this.cityList.map(item => item.type)
    // },
    // 定义一个计算属性用来保存用户点击到的哪个城市名(根据query传递过来的字符进行计算)
    cname () {
      return this.$store.state.cName;
    }
  },
  // watch: {
  //   cname (newVal) {
  //     this.cname = newVal
  //   }
  // },

  methods: {
    async getCityList () {
      try {
        const res = await getCityListAPI(1);
        // console.log(res);
        this.cityList = res.data.body;
        this.cityList.forEach((item) => {
          this.cityNameList.push(item.label);
          // console.log((item.short).substring(0, 1))
        });
        // console.log(this.cityName)
        const firstName = {};
        this.FirstPin.forEach((item) => {
          firstName[item] = [];
          this.cityNameList.forEach((el) => {
            const first = pinyin.getFullChars(el).substring(0, 1);
            this.nameFirst.push(first);
            if (first == item) {
              firstName[item].push(el);
            }
          });
          this.firstNameList = firstName;
        });
        // console.log(this.nameFirst);
      } catch (error) {
        this.$toast('获取数据失败！');
      }
    },
    // jump () {
    //   // 点击触发子组件内的方法，子组件内再触发vant绑定的左箭头的点击事件，跳转回去
    //   this.$emit('jump')
    // },
    async getHotCityList () {
      const res = await getHotCityListAPI();
      this.hotCityList = res.data.body;
      // console.log(this.hotCityList);
    },
    getHotName (name) {
      // 将城市名存入vuex
      this.$store.commit('setCityName', name);
      this.$router.back();
      // this.$router.push({
      //   name: 'home'
      // });
    },
    chooseCity (name) {
      // 将城市名存入vuex
      this.$store.commit('setCityName', name);
      this.$router.push({
        name: 'home',
        params: {
          cname: name
        }
      });
    },
    // 子组件内再触发vant绑定的左箭头的点击事件，跳转回去
    onClickLeft () {
      this.$router.push('/ ');
    }
  },
  created () {
    this.getCityList();
    this.getHotCityList();
    // this.cname = this.$route.query.name || '广州'
  }
};
</script>

<style lang="less" scoped>
.city-container {
  /deep/.header {
    .van-nav-bar__content {
      background-color: #21b97a;
      position: fixed;
      width: 100%;
      .van-nav-bar__left {
        color: #fff;
        .van-icon {
          color: #fff;
        }
      }
      .van-nav-bar__title {
        color: #fff;
      }
    }
  }
  .city {
    padding-top: 92px;
    .hot-city-title {
      // padding-left: 30px;
      font-size: 28px;
      color: #999;
      padding: 20px 0 20px 30px;
    }
    .city-list {
      :deep(.van-cell) {
        padding-left: 0;
      }
    }
  }
  .van-cell__label {
    height: 100px;
    color: #333;
    font-size: 32px;
    display: flex;
    align-items: center;
  }
  .van-cell__title {
    font-size: 28px;
    color: #999;
    span {
      font-size: 32px;
      color: #333;
      // border-bottom: 1px solid #eee;
      width: 100%;
      height: 100px;
      // padding: 0 30px;
      line-height: 100px;
    }
  }
}
</style>
