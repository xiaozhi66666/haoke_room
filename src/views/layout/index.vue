<template>
    <div class="hk-layout">
        <!-- 二级路由页面 -->
        <router-view></router-view>
        <!-- 底部导航栏S -->
        <div class="nav-footer">
          <van-tabbar route>
            <!-- 首页为默认路径，设置   /  -->
              <van-tabbar-item icon="wap-home-o" to="/ ">首页</van-tabbar-item>
              <van-tabbar-item icon="search" to="/list">找房</van-tabbar-item>
              <van-tabbar-item icon="newspaper-o" to="/news">咨询</van-tabbar-item>
              <van-tabbar-item icon="contact" to="/my" >我的</van-tabbar-item>
          </van-tabbar>
        </div>
        <!-- 底部导航栏E -->
    </div>
</template>

<script>
export default {
  name: 'HaokeRoomIndex',

  data () {
    return {
    }
  },

  mounted () {

  },
  created () {

  },
  watch: {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.hk-layout{
  .nav-footer{
    .van-tabbar-item--active{
      color:#21b97a;
    }
  }

}

</style>
