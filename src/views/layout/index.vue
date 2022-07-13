<template>
    <div class="hk-layout">
        <!-- 二级路由页面 -->
        <router-view></router-view>
        <!-- 底部导航栏S -->
        <div class="nav-footer">
          <van-tabbar v-model="active">
            <!-- 首页为默认路径，设置   /  -->
              <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
              <van-tabbar-item icon="search" to="/search">找房</van-tabbar-item>
              <van-tabbar-item icon="newspaper-o" to="/news">咨询</van-tabbar-item>
              <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
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
      active: 0
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
