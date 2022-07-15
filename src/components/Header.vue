<template>
    <div>
        <!-- 头部标题栏S -->
        <div class="header">
            <van-nav-bar
            title="城市列表"
            left-arrow
            @click-left="onClickLeft"
        />
        </div>
        <!-- 头部标题栏E -->
    </div>
</template>

<script>
export default {
  name: 'HaokeRoomHeader',

  data () {
    return {

    };
  },

  mounted () {

  },

  methods: {

  }
};
</script>

<style lang="less" scoped>
/deep/.header{
        .van-nav-bar__content{
            background-color:#21b97a;
            position:fixed;
            width: 100%;
          .van-nav-bar__left{
              color:#fff;
                 .van-icon{
                    color:#fff;
                }
           }
           .van-nav-bar__title {
            color:#fff;
           }
        }
    }

</style>
