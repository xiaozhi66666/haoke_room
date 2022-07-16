<template>
    <div class="home-container">
      <!-- 头部S -->
      <div class="header">
        <!-- 轮播图S -->
        <div class="banner">
        <van-swipe style="height: 200px;" vertical  :autoplay="3000">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
          <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" >
        </van-swipe-item>
        </van-swipe>
         <!-- 轮播图E -->
         <!-- 搜索框S -->
        <div class="search">
         <van-search
          v-model="value"
          show-action
          :label="acCityName"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
        <template #left-icon> <i class="haoke haoke-xiajiantou" @click="selectCity"></i><i class="haoke-shuxian">|</i></template>
         <!-- <template #label> <van-icon name="arrow-down" /></template> -->
      <template #action>
        <div @click="onSearch"><i class="haoke haoke-ditu"></i></div>
      </template>
      </van-search>
        </div>
        <!-- 搜索框E -->
        </div>

      </div>
      <!-- 头部 -->
      <!-- 中间功能分类区域S -->
      <div class="body">
        <van-grid :border=false>
        <van-grid-item text="整租" @click="jumpFn">
          <div slot="icon" class="item-icon"><img src="~@/assets/img/all.png" alt=""></div>
        </van-grid-item>
             <van-grid-item text="合租" @click="jumpFn">
          <div slot="icon" class="item-icon"><img src="~@/assets/img/each.png" alt=""></div>
        </van-grid-item>
             <van-grid-item text="地图找房" >
          <div slot="icon" class="item-icon"><img src="~@/assets/img/local.png" alt=""></div>
        </van-grid-item>
             <van-grid-item text="去出租" >
          <div slot="icon" class="item-icon"><img src="~@/assets/img/rent.png" alt=""></div>
        </van-grid-item>
      </van-grid>
      </div>
     <!-- 中间功能分类区域E -->
      <!-- 租房小组S -->
      <div class="rent-room">
        <div class="rent-room-header">
          <span class="title-left">租房小组</span>
          <span class="title-right">更多</span>
      </div>
        <div class="rent-room-item">
          <van-grid direction="horizontal" :column-num="2" gutter="10px">
          <van-grid-item v-for="item in rentRoomList" :key="item.id">
            <div slot="icon" class="img">
              <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="">
              <div class="text">
                <span>{{item.desc}}</span>
                <span>{{item.title}}</span>
            </div>
          </div>
      </van-grid-item>
          <!-- <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" /> -->
        </van-grid>
      </div>
      </div>
      <!-- 租房小组E -->
      <!-- 底部图片S -->
      <div class="foot-img"><img src="~@/assets/img/join.png" alt=""></div>
      <!-- 底部图片E -->
    </div>
</template>

<script>
import { getBannerAPI, getRentGroupsAPI } from '@/api/home'
export default {
  name: 'HaokeRoomIndex',

  data () {
    return {
      bannerList: [],
      rentRoomList: [],
      value: ''
    }
  },

  mounted () {

  },

  methods: {
    async getBanners () {
      try {
        const res = await getBannerAPI()
        this.bannerList = res.data.body
        const data = await getRentGroupsAPI()
        this.rentRoomList = data.data.body
        // console.log(this.rentRoomList);
        // console.log(data);
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    onSearch (val) {

    },
    onCancel () {

    },
    selectCity () {
      // 点击下箭头跳转到城市页面
      this.$router.push('/city')
    },
    jumpFn () {
      // 跳转到list页面
      this.$router.push('/list')
    }
  },
  created () {
    this.getBanners()
  },
  computed: {
    // 定义一个计算属性用来保存用户点击到的哪个城市名
    acCityName () {
      return this.$route.query.name || '广州'
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  // 头部样式
  .header{
    // 轮播图样式
    .banner{
      position: relative;
      /deep/.search{
        position: absolute;
        align-items: center;
        top: 20px;
        width: 750px;
        height: 68px;
        // 搜索框样式
          .van-search{
            padding-left: 40px;
            .van-field{
              .van-field__left-icon{
                color: #7f7f80;
                .haoke-xiajiantou{
                  margin-right: 9px;

                }
                .haoke-shuxian{
                  color:#e5e5e5;
                }
              }
            }
            .van-search__action{
              color: #fff;

              .haoke{
                font-size: 50px;
              }
            }
            background-color:transparent!important;
           .van-search__content{
             width: 300px;
            }
          }
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  // 中键分类功能区域
  .body{
    width: 100%;
    height: 246px;
    .van-grid-item{

      .van-grid-item__content{
        // width: 120px;
        // height: 100px;
        border:0;
      .item-icon{
        img{
          width: 120px;
          height: 120px;
          margin-bottom: 10px;
        }
      }
    }
      :deep(.van-grid-item__text){
        font-size: 28px;
        color: #333
      }
    }
  }
  .rent-room{
    width: 100%;
    height: 374px;
    background-color:#f6f5f6;
    .rent-room-header{
      padding:0 10px;
      display:flex;
      justify-content:space-between ;

    }
      .title-left{
        color:#333;
        font-size: 30px;
        font-weight:700;
        margin:30px 0 30px 30px;
      }
       .title-right{
        color: #787d82;
        font-size: 28px;
        margin:30px 15px 30px 10px;
      }
  }
  .rent-room-item{
   :deep(.van-grid-item__content--horizontal){
        border-radius: 20px;
        padding-right: 100px;
            justify-content: unset;
          height: 120px;
        .van-grid-item__content{
          display: inline-block;
        }
          .img{
            width: 100px;
            height: 100px;
            background-color: pink;
              margin:0 10px;
            img{
              position: relative;
              width: 100%;
            }
            .text{
              position:absolute;
              right:-160px;
              top: 10px;
              // margin-left: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              font-size: 28px;
              color: #333;
            }
        }
    }
  }
  .foot-img{
   img{
    width: 100%;
    height: 100%;
   }
  }
}

</style>
