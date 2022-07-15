<template>
    <div class="city-container">
        <!-- 头部标题栏S -->
      <div class="header">
        <Header @click="jump" :title="`城市列表`"></Header>
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
         <van-index-bar  :sticky="false" highlight-color="blue">
              <van-index-anchor  v-for="(item,index) in firstNameList" :key="index" :index="index">
              <span >{{item.length == 0 ? '' : index}}</span>
              <van-cell @click="chooseCity(citem)" v-for="(citem,cindex) in item" :key="cindex" :title="citem"/>
              </van-index-anchor>
      </van-index-bar>
            <!-- 城市列表E -->
        </div>
        <!-- 城市列表展示E -->
    </div>
</template>

<script>
// 导入获取城市列表的请求方法
import { getCityListAPI } from '@/api/area'
import pinyin from 'js-pinyin/index.js'
// 引入头部组件
import Header from '@/components/Header.vue'
export default {
  name: 'HaokeRoomIndex',
  components: { Header },
  data () {
    return {
      cityList: [],
      cityNameList: [],
      FirstPin: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      firstNameList: [],
      nameFirst: []
    }
  },

  mounted () {

  },
  computed: {
    computedCityList () {
      return this.cityList.map(item => item.type)
    }
  },
  methods: {
    async getCityList () {
      try {
        const res = await getCityListAPI(1)
        this.cityList = res.data.body
        this.cityList.forEach(item => {
          this.cityNameList.push(item.label)
          // console.log((item.short).substring(0, 1))
        })
        // console.log(this.cityName)
        const firstName = {}
        this.FirstPin.forEach((item) => {
          firstName[item] = []
          this.cityNameList.forEach((el) => {
            const first = pinyin.getFullChars(el).substring(0, 1)
            this.nameFirst.push(first)
            if (first == item) {
              firstName[item].push(el)
            }
          })
          this.firstNameList = firstName
        })
        // console.log(this.nameFirst);
      } catch (error) {
        this.$toast('获取数据失败！')
      }
    },
    jump () {
      // 点击触发子组件内的方法，子组件内再触发vant绑定的左箭头的点击事件，跳转回去
      this.$emit('jump')
    }

  },
  created () {
    this.getCityList()
  }
}
</script>

<style lang="less" scoped>
.city-container{
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
    .city{
      padding-top: 92px;
    }
}

</style>
