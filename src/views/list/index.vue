<template>
    <div class="haoke-list">
      <div class="header"> <Header @click="jump" :title="`城市列表`"></Header>
        <!-- 搜索框S -->
            <div class="search">
                <van-search
                v-model="value"
                show-action
                :label="acCityName"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                >
                <template #left-icon> <i class="haoke haoke-xiajiantou" @click="selectCity"></i><i class="haoke-shuxian">|</i> <i class="haoke haoke-sousuo_o"></i> </template>
            <template #action>
                <div @click="onSearch"><i class="haoke haoke-ditu"></i></div>
            </template>
        </van-search>
            </div>
        <!-- 搜索框E -->
      </div>

        <!-- 中间分类区域S -->
        <div class="area-classify">
            <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
            <van-dropdown-item v-model="value2" :options="option2" />
            <van-dropdown-item v-model="value2" :options="option3" />
            <van-dropdown-item v-model="value2" :options="option4" />
        </van-dropdown-menu>
        <!-- <van-tabs >
            <van-tab title="标签 1"  @change="showFn">
            <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <div class="block" />
            </div>
            </van-overlay></van-tab>
            <van-tab title="标签 2">内容 2</van-tab>
            <van-tab title="标签 3">内容 3</van-tab>
            <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs> -->
        </div>
        <!-- 中间分类区域E -->
        <!-- 主题区域S -->
        <main>
          <div class="house-item" v-for="item,index in houseList" :key="index">
            <div class="left"><img :src="`${baseURL}${item.houseImg}`" alt=""></div>
            <div class="right">
              <h4 class="house-name">{{item.title}}</h4>
              <p class="house-info">{{item.desc}}</p>
              <div class="house-adress"> <span>{{item.tags[0]}}</span>  </div>
              <div class="house-price"><span class="price">{{item.price}}</span>元/月</div>
            </div>
          </div>
        </main>
        <!-- 主题区域E -->
    </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/Header'
// 引入根据城市名获取城市信息的方法
import { getCityInfoNameAPI, getHouseInfoAPI } from '@/api'
// 引入获取热力城市的数据
// import { getHotCityListAPI } from '@/api'
// 引入根据条件查询房屋获取房源信息的接口
// import { getCityHouseInfoAPI } from '@/api'
export default {
  name: 'HaokeListIndex',
  components: { Header },
  data () {
    return {
      value: '',
      value1: 0,
      value2: 'a',
      option1: [
        { text: '区域', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '方式', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option3: [
        { text: '租金', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      option4: [
        { text: '筛选', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],
      id: '',
      houseList: [],
      baseURL: ''
    };
  },

  mounted () {

  },
  created () {
    this.getCityInfoName(this.acCityName)
    this.getHouseInfo()
    console.log(this.acCityName);
  },
  computed: {
    // 定义一个城市名计算属性变量
    acCityName () {
      // 通过编程式导航跳转传参，根据当时点击的城市名进行传参
      return this.$route.query.name
    }
  },

  methods: {
    getInit () {

    },
    onSearch () {},
    selectCity () {
      // 点击下箭头跳转到城市页面
      this.$router.push('/city')
    },
    showFn () {
      console.log(111);
    },
    jump () {
      // 点击触发子组件内的方法，子组件内再触发vant绑定的左箭头的点击事件，跳转回去
      this.$emit('jump')
    },
    // 获取热力城市列表
    async getCityInfoName (cityName) {
      console.log(cityName);
      const res = await getCityInfoNameAPI(cityName)
      console.log(res);
      this.id = res.data.body.value
      console.log(this.id);
      // console.log(res);
    },
    // 根据参数获取房屋信息
    async getHouseInfo () {
      const houseRes = await getHouseInfoAPI(this.id)
      console.log(houseRes);
      this.baseURL = houseRes.config.baseURL
      // console.log(this.baseURL);
      this.houseList = houseRes.data.body.list
      console.log(this.houseList);
    }

  }
};
</script>

<style lang="less" scoped>
*{
  margin:0;
  padding:0;
}
.haoke-list{
    // 顶部标题栏样式
    .list-header{
        position: relative;
        .van-nav-bar__content{
          display:flex;
          justify-content:center;
        }
    }
// 搜索框样式
    .van-search{
    position: absolute;
    top: 10px;
    z-index: 2;
    // margin-bottom: 116px;
    width: 90%;
    margin-left: 60px;
      //  padding-left: 80px;
      //  padding-right: 60px;
       .van-field{
           .van-field__left-icon{
             .haoke-xiajiantou{
               margin-right: 9px;
             color: #7f7f80;
           }
            .haoke-sousuo_o{
              font-size: 30px;
            }
           .haoke-shuxian{
               color:#e5e5e5;
           }
           }
       }
      .van-search__content{
        margin-left: 40px;
        margin-right: 40px;
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
    padding-top: 0;
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
   :deep(.van-tabs__wrap){
    border-bottom: 2px solid #e4e6f0;
   }
     .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
//  主体区域
main{
      padding: 0 30px;
    .house-item{
      display:flex;
      padding-top:36px;
      height: 180px;
      .left{
        width: 212px;
        height: 160px;
        background-color: red;
        img{
          width: 100%;
          height: 100%;
        }
      }
       .right{
        flex:1;
        padding-left: 24px;
        h4.house-name{
          width: 5.93333rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
          // width:100%;
          font-size: 28px;
          color: #394043;
        }
        p.house-info{
          font-size: 24px;
          color: #afb2b3;
          // padding: 10px 0;
        }
        .house-adress{
          span{
              display: inline-block;
              font-size: 24px;
              border-radius: 6px;
              padding: 8px 10px;
              margin-right: 10px;
              margin-bottom:10px;
              line-height: 24px;
              color: #39becd;
              background: #e1f5f8;
          }
        }
        .house-price{
          font-size: 24px;
          color: #fa5741;
          span.price{
            font-size: 32px;
            font-weight: 700;
            // padding: 10px 0;
            color: #fa5741;
          }
        }
      }
    }
}
}

</style>
