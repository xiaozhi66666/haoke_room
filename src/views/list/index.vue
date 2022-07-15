<template>
    <div class="haoke-list">
        <Header class="list-header">
        </Header>
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
        <!-- 中间分类区域S -->
        <div class="area-classify">
        <van-tabs >
            <van-tab title="标签 1"></van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
            <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs>
        <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"/>
        </div>
        <!-- 中间分类区域E -->
    </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/Header'
export default {
  name: 'HaokeRoomIndex',
  components: { Header },
  data () {
    return {
      value: ''
    };
  },

  mounted () {

  },

  methods: {
    onSearch () {},
    selectCity () {
      // 点击下箭头跳转到城市页面
      this.$router.push('/city')
    }
  }
};
</script>

<style lang="less" scoped>
.haoke-list{
    // 顶部标题栏样式
    .list-header{
        position: relative;
    }
// 搜索框样式
    .van-search{
    position: absolute;
    top: -12px;
    z-index: 2;
    // margin-bottom: 116px;
    width: 100%;
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
   .area-classify{
    padding-top: 86px;
    :deep(.van-tab){
        position: relative;
        font-size: 34px;
    }
    :deep(.van-tabs__line){
        display:none;
        .van-tabs__wrap{
            height: 30px;
    padding-bottom: 5px;
        }
    }
    :deep(.van-tabs__content){
        position:absolute;
        bottom:0;
        background-color: red!important;;
    }
   }
}

</style>
