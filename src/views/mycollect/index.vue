<template>
    <div>
        <!-- 头部标题栏S -->
        <Header title="收藏列表" ></Header>
        <!-- 头部标题栏E -->
        <!-- 主体区域S -->
        <div class="main"><HouseItem :houseList=houseList></HouseItem></div>
        <!-- 主体区域E -->
    </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/Header'
// 引入房源信息展示模板组件
import HouseItem from '../list/component/HouseItem.vue'
// 引入请求用户收藏列表的方法
import { getUserCollectAPI } from '@/api'
export default {
  name: 'HaokeRoomIndex',
  components: { Header, HouseItem },

  data () {
    return {
      houseList: []
    };
  },

  mounted () {

  },
  created () {
    this.getUserCollect()
  },

  methods: {
    async getUserCollect () {
      try {
        const res = await getUserCollectAPI()
        // console.log(res);
        this.houseList = res.data.body
        console.log(this.houseList)
      } catch (error) {
        this.$toast.fail('获取数据失败，请稍后重试！')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main{
    padding-top:92px;
}
</style>
