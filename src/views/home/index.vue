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
          label="杭州"
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

    </div>
</template>

<script>
import { getBannerAPI } from '@/api/home'
export default {
  name: 'HaokeRoomIndex',

  data () {
    return {
      bannerList: [],
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
    }
  },
  created () {
    this.getBanners()
  }
}
</script>

<style lang="less" scoped>
.home-container{
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
}

</style>
