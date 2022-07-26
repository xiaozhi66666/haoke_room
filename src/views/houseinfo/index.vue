<template>
  <div class="myHouse">
    <!-- 头部标题栏S -->
    <header>
      <Header :title="houseInfo.community || '房源信息'"></Header>
    </header>
    <!-- 头部标题栏E -->
    <!-- 主题内容区域S -->
    <main>
      <!-- 轮播图S -->
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item, index) in houseInfo.houseImg"
            :key="index"
          >
            <img :src="`http://liufusong.top:8080${item}`" alt=""
          /></van-swipe-item>
        </van-swipe>
      </div>
      <!-- 轮播图E -->
      <!-- 房屋信息S -->
      <div class="house-info">
        <div class="house-title">
          <div class="adress-info">
            <h3 class="houseInfoTitle">{{ houseInfo.title }}</h3>
            <div
              class="house-trait"
              v-for="(item, index) in houseInfo.tags"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <div class="price-size-info">
            <van-grid column-num="3" :border="false">
              <van-grid-item text="租金">
                <template #icon
                  >{{ houseInfo.price }} <span>/月</span></template
                >
              </van-grid-item>
              <van-grid-item text="房型">
                <template #icon
                  >{{ houseInfo.roomType }}<span></span>
                </template>
              </van-grid-item>
              <van-grid-item text="面积">
                <template #icon
                  >{{ houseInfo.size ? houseInfo.size : '' }}<span>平米</span>
                </template>
              </van-grid-item>
            </van-grid>
          </div>
          <div class="house-type">
            <div class="left">
              <div>
                <span class="left-title">装修： </span><span>精装</span>
              </div>
              <div>
                <span class="left-title">楼层： </span
                ><span>{{ houseInfo.floor }}</span>
              </div>
            </div>
            <div class="right left">
              <div>
                <span class="left-title">朝向： </span
                ><span
                  v-for="(item, index) in houseInfo.oriented"
                  :key="index"
                  >{{ item }}</span
                >
              </div>
              <div>
                <span class="left-title">类型： </span><span>普通住宅</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 房屋信息E -->
      <!-- 地图展示区域S -->
      <div class="map">
        <div class="map-content">
          <div class="map-title">
            小区：<span>{{ houseInfo.title }}</span>
          </div>
          <div class="img">
            <img src="~@/assets/img/map.png" alt="" />
          </div>
        </div>
      </div>
      <!-- 配套 -->
      <div class="Package">
        <h3>房屋配套</h3>
        <div class="Package-info">
          <van-grid column-num="5" :border="false">
            <van-grid-item
              :text="item"
              v-for="(item, index) in supportList"
              :key="index"
            >
              <span
                slot="icon"
                :class="[item == '冰箱' ? 'haoke haoke-bingxiang' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '天然气' ? 'haoke haoke-meiqitianranqi' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '宽带' ? 'haoke haoke-kuandai' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '暖气' ? 'haoke haoke-nuanqi' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '电视' ? 'haoke haoke-dianshi' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '洗衣机' ? 'haoke haoke-xiyiji' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '衣柜' ? 'haoke haoke-yigui' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '空调' ? 'haoke haoke-kongdiao' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '沙发' ? 'haoke haoke-shafa' : '']"
              ></span>
              <span
                slot="icon"
                :class="[item == '热水器' ? 'haoke haoke-reshuiqi' : '']"
              ></span>
            </van-grid-item>
          </van-grid>
        </div>
      </div>

      <!-- 地图展示区域E -->
      <!-- 房屋概况S -->
      <div class="house-desc">
        <h3 class="house-desc-title">房源概况</h3>
        <div class="house-desc-userinfo">
          <van-cell center>
            <template #title>
              <van-image
                width="52"
                height="52"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                round
              />
              <div class="room-user">
                <span class="name">姓名</span>
                <span class="confirm"
                  ><span class="haoke haoke-shimingrenzheng"></span>认证</span
                >
              </div>
            </template>
            <van-button
              slot="default"
              plain
              type="primary"
              size="small"
              class="sendMessage"
              >发消息</van-button
            >
          </van-cell>
        </div>
        <div class="house-desc-text">
          {{ houseInfo.description }}
        </div>
      </div>
      <!-- 房屋概况E -->
      <!-- 猜你喜欢S -->
      <div class="house-maylike">
        <h3>猜你喜欢</h3>
        <HouseItem :houseList="guessLikeList"></HouseItem>
      </div>
      <!-- 猜你喜欢E -->
    </main>
    <!-- 主题内容区域E -->
    <!-- 底部区域S -->
    <footer>
      <div class="foot">
        <div class="foot-collect" @click="isCollectFn">
          <span
            :class="[
              isCollect
                ? 'haoke haoke-shoucang_shixin'
                : 'haoke haoke-collection'
            ]"
          ></span
          >{{ isCollect ? '已收藏' : '收藏' }}
        </div>
        <div class="foot-consult">在线咨询</div>
        <div class="foot-reserve">
          <a href="tel:400-618-4000" class="tell-phone">电话预约</a>
        </div>
      </div>
    </footer>
    <!-- 底部区域E -->
  </div>
</template>

<script>
// 引入获取查询房屋具体信息的api,添加/删除收藏的api
import {
  getHouseFullInfoAPI,
  addCollectAPI,
  delCollectAPI,
  checkCollectAPI
} from '@/api';
// 引入头部标题栏组件
import Header from '@/components/Header';
// 引入房屋信息展示模版组件
import HouseItem from '../list/component/HouseItem.vue';
// 引入保存到本的的方法
import storage from '@/utils/stroage.js';

export default {
  name: 'HaokeHouseInfo',
  components: { Header, HouseItem },
  data () {
    return {
      houseInfo: {},
      supportList: [],
      isCollect: false, // 表示是否已收藏
      guessLikeList: [
        {
          desc: '四室/11/东北/白广路东里1号院',
          houseCode: 'e4ac804d-a760-7ccf',
          houseImg: '/uploads/upload_6cb0e00bf9a139d9fcd2f4c1ab5a6793.jpg',
          price: 11,
          tags: ['近地铁'],
          title: '龙生龙,凤生凤,老鼠儿子会打洞'
        },
        {
          desc: '/1//白广路东里1号院',
          houseCode: '2a224378-e0f4-40ed',
          houseImg: '/uploads/upload_b582d620cbe62348ce2ad444234f6c39.jpg',
          price: 11,
          tags: ['近地铁'],
          title: '龙生龙,凤生凤,老鼠儿子会打洞'
        },
        {
          desc: '一室//东/亮马水晶',
          houseCode: '2e91f0e6-ca5d-55cb',
          houseImg: '/uploads/upload_f205426be93a4816655b2fbd349bafcc.jpg',
          price: 5000,
          tags: ['近地铁'],
          title: '到货时间多久啊'
        }
      ]
    };
  },
  mounted () {},
  computed: {
    // 定义一个计算属性code为跳转传参传递过来的参数，为点击的相应城市的code
    code () {
      return this.$route.params.code || storage.get('CITYCODE');
    }
  },
  created () {
    this.getHouseInfo();
    storage.set('CITYCODE', this.code);
    this.checkCollect();
  },
  methods: {
    async getHouseInfo () {
      try {
        const res = await getHouseFullInfoAPI(this.code);
        this.houseInfo = res.data.body;
        console.log(this.houseInfo);
        this.supportList = this.houseInfo.supporting;
        if (!this.houseInfo) {
          this.$toast.fail('获取数据失败！请稍后重试！');
        }
        console.log(this.houseInfo);
      } catch (error) {
        this.$toast.fail('获取数据失败！请稍后重试！');
      }
    },
    // 发请求查询当前房屋是否已处于收藏状态
    async checkCollect () {
      const res = await checkCollectAPI(this.code);
      console.log(res);
      this.isCollect = res.data.body.isFavorite;
      console.log(this.isCollect);
    },
    // 是否收藏
    async isCollectFn () {
      // 将控制其收藏的变量置反
      this.isCollect = !this.isCollect;
      if (this.isCollect) {
        // 收藏
        try {
          await addCollectAPI(this.code);
        } catch (error) {
          this.$toast.fail('收藏失败！！');
        }
        this.$toast.success('已收藏成功！');
      } else {
        // 取消收藏（删除收藏）
        const res = await delCollectAPI(this.code);
        console.log(res);
        this.$toast.success('已取消收藏！');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.myHouse {
  padding-bottom: 92px;
  box-sizing: border-box;
}
main {
  // padding:92px 0;
  padding-top: 92px;
  background-color: #eee;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  // 轮播图区域
  .banner {
    .van-swipe-item {
      height: 506px;
    }
  }
  // 房屋详细信息
  .house-info {
    padding: 30px;
    background: #fff;
    .house-title {
      .adress-info {
        border-bottom: 2px solid #cecece;
      }
      h3.houseInfoTitle {
        border: 0;
        padding: 0;
      }
      .house-trait {
        color: #39becd;
        background: #e1f5f8;
        display: inline-block;
        font-size: 24px;
        border-radius: 6px;
        padding: 8px 10px;
        margin-right: 10px;
        line-height: 24px;
        margin: 20px 6px;
      }
      .price-size-info {
        padding: 6px 0;
        margin: 6px 0;
        border-bottom: 2px solid #cecece;
        :deep(.van-grid-item__content--center) {
          color: #fa5741;
          font-size: 36px;
          font-weight: bolder;
          .van-grid-item__text {
            padding-top: 10px;
            color: #999;
            font-size: 28px;
          }
        }
        span {
          font-size: 24px;
          color: #fa5741;
        }
      }
      .house-type {
        display: flex;
        .left {
          flex: 1;
          color: #333;
          font-size: 26px;
          .left-title {
            display: inline-block;
            width: 78px;
            height: 52px;
            color: #999;
            padding-right: 10px;
            line-height: 52px;
          }
        }
        .right {
          flex: 1;
        }
      }
    }
  }
  // 地图
  .map {
    margin-top: 20px;
    .map-content {
      height: 290px;
      background-color: #fff;
      .map-title {
        margin: 0 3%;
        line-height: 88px;
        color: #666;
        font-size: 24px;
        span {
          color: #333;
          font-size: 28px;
        }
      }
    }
    // 配套
    // .Package{
    // }
    // 概况
  }
  // 配套
  .Package {
    padding-top: 100px;
    background-color: #fff;
    h3 {
      padding: 20px 20px !important;
    }
    .Package-info {
      .van-grid-item {
        :deep(.van-grid-item__text) {
          color: red;
          font-size: 22px;
          color: #333;
        }
        span.haoke {
          font-size: 44px;
          color: #333;
        }
      }
    }
    h3 {
      padding: 30px 0;
    }
  }

  // 描述
  .house-desc {
    background-color: #fff;
    margin-top: 10px;
    .house-desc-userinfo {
      .van-cell__title {
        display: flex;
        .room-user {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-left: 20px;
          .name {
            font-size: 28px;
            color: #333;
          }
          .confirm {
            color: #fa5741;
            font-size: 24px;
          }
        }
      }
      .sendMessage {
        width: 148px;
        height: 60px;
        font-size: 28px;
      }
    }
    .house-desc-text {
      font-size: 28px;
      color: #333;
    }
  }

  // 猜你喜欢
  .house-maylike {
    background-color: #fff;
    padding-bottom: 30px;
  }

  // 公共样式
  h3 {
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 20px;
    padding: 30px 20px;
    border-bottom: 2px solid #cecece;
  }
}
//底部样式
footer {
  .foot {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 100px;
    width: 100%;
    display: flex;
    text-align: center;
    background-color: #fff;
    border-top: 2px solid #e8e8e9;
    div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 34px;
      border-right: 1px solid #e8e8e9;
      color: #999;
    }
    .foot-collect {
      color: #ff4f00;
      .haoke {
        font-size: 32px;
        padding-right: 12px;
      }
    }
    .foot-reserve {
      color: #fff;
      background-color: #21b97a;
      a.tell-phone {
        color: #fff !important;
      }
    }
  }
}
</style>
