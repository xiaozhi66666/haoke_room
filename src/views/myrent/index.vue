<template>
    <div>
        <!-- 头部标题栏S -->
        <header><Header title="房屋管理"></Header></header>
        <!-- 头部标题栏E -->
        <!-- 主题区域S -->
        <div class="main"><HouseItem :houseList=isRent></HouseItem></div>
        <!-- 主题区域E -->
    </div>
</template>

<script>
// 导入头部标题栏模板组件
import Header from '@/components/Header'
// 导入展示房源信息的模板组件
import HouseItem from '../list/component/HouseItem'
// 引入获取用户已发布房源信息的接口
import { getUserRentAPI } from '@/api'
export default {
  name: 'HaokeRoomIndex',
  components: { Header, HouseItem },

  data () {
    return {
      isRent: []
    };
  },

  mounted () {

  },
  created () {
    this.getUserRent()
  },
  methods: {
    async getUserRent () {
      try {
        const res = await getUserRentAPI()
        this.isRent = res.data.body
        // console.log(this.isRent);
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
