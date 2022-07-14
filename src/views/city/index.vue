<template>
    <div class="city-container">
        <!-- 头部标题栏S -->
        <div class="header">
            <van-nav-bar
            title="城市列表"
            left-arrow
            @click-left="onClickLeft"
        />
        </div>
        <!-- 头部标题栏E -->
        <!-- 城市列表展示S -->
        <div class="city">
            <!-- 当前城市S -->
            <div class="now-city">
            <van-cell-group>
                    <van-cell title="当前城市" value="#" label="杭州" />
            </van-cell-group>
            </div>
            <!-- 当前城市E -->
            <!-- 热门城市S -->
            <div class="hot-city">
                <van-cell-group>
                    <van-cell title="热门城市" value="热门" label="杭州" />
            </van-cell-group>
            </div>
            <!-- 热门城市E -->
            <!-- 城市列表E -->
          <van-index-bar>
            <van-index-anchor index="A" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-index-anchor index="B" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />
             <van-index-anchor index="C" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />
             <van-index-anchor index="D" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />
             <van-index-anchor index="E" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            <van-cell title="文本" />
            </van-index-bar>
            <!-- 城市列表E -->
        </div>
        <!-- 城市列表展示E -->
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

  methods: {
    getCityList () {}
  },
  created () {
    this.getCityList()
  }
}
</script>

<style lang="less" scoped>
.city-container{
    .header{
        /deep/.van-nav-bar__content{
            background-color:#21b97a;
           .van-nav-bar__title{
            color:#fff;
            .van-nav-bar__left{
                .van-icon{
                    color:#fff;
                }
            }
           }
        }
    }
}

</style>
