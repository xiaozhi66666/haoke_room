<template>
    <div class="haoke-list">
      <div class="header"> <Header @click="jump" :title="`城市列表`"></Header>
        <!-- 搜索框S -->
            <div class="search">
                <van-search
                v-model="value"
                show-action
                :label="cname"
                placeholder="请输入搜索关键词"
                >
                <template #left-icon> <i class="haoke haoke-xiajiantou" @click="selectCity"></i><i class="haoke-shuxian">|</i> <i class="haoke haoke-sousuo_o"></i> </template>
            <template #action>
                <div ><i class="haoke haoke-ditu"></i></div>
            </template>
        </van-search>
            </div>
        <!-- 搜索框E -->
      </div>

        <!-- 中间分类区域S -->
        <div class="area-classify">
            <van-dropdown-menu>
            <van-dropdown-item v-model="value2" title="区域">
              <div slot="default">
              <van-picker show-toolbar :columns="columns"
              @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange">  <div slot="columns-bottom">  </div> </van-picker>
              </div>
            </van-dropdown-item>

            <van-dropdown-item v-model="value2" title="方式">
              <div slot="default">
                <van-picker
                show-toolbar
                :columns="columns1"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
              />
              </div>
            </van-dropdown-item>
           <van-dropdown-item v-model="value2"  title="租金">
              <div slot="default">
                <van-picker
                show-toolbar
                :columns="columns2"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
              />
              </div>
            </van-dropdown-item>
           <van-dropdown-item v-model="value2" title="筛选">
              <div slot="default">
                <van-area
            />
              </div>
            </van-dropdown-item>
        </van-dropdown-menu>
        </div>
        <!-- 挂载到 body 节点下 -->
<!-- <van-popup v-model="show" get-container="body" >2222</van-popup> -->
        <!-- 中间分类区域E -->
        <!-- 主体区域S -->
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
        <!-- 主体区域E -->
    </div>
</template>

<script>
// 引入头部组件
import Header from '@/components/Header'
// 引入根据城市名获取城市信息的方法
// 引入获取房屋信息的接口
// 引入获取指定城市子级城市列表的接口
import { getCityInfoNameAPI, getHouseInfoAPI, getSonCityListAPI } from '@/api'
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
      id: '', // 城市id
      houseList: [], // 指定城市相关数据
      baseURL: '', // 资源根路径
      cname: '', // 城市名
      sonList: [], // 指定城市子级城市列表数据
      show: false,
      columns: [], // 子级城市数据
      columns1: ['不限', '整租', '合租'],
      columns2: ['不限', '1000及以下', '1000-2000', '2000-3000', '3000-4000', '4000-5000', '5000-6000', '6000-7000', '7000及以上']
    };
  },

  mounted () {

  },
  created () {
    this.getHouseInfo()
    this.cname = this.$route.params.cname || '广州'
    // console.log(this.columns);
  },
  watch: {
    // 监视城市名的变化
    async cname (newVal) {
      const res = await getCityInfoNameAPI(newVal)
      // 获取新的城市id
      this.id = res.data.body.value
      // console.log(this.columns);
      // console.log(this.id);
      // 获取新的城市列表数据
      const houseRes = await getHouseInfoAPI(this.id)
      // console.log(houseRes);
      this.baseURL = houseRes.config.baseURL
      // console.log(this.baseURL);
      this.houseList = houseRes.data.body.list
      // 触发获取子级城市列表的数据
      this.getSonCityList(this.id)
      // console.log(this.houseList);
      // console.log(res);
    }
  },
  // computed: {
  //   columns () {
  //     return this.sonList.forEach(item => {
  //       return this.columns.push(item.label)
  //     })
  //   }
  // },
  methods: {
    showPopup () {
      this.show = true;
    },
    // 确认
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    // 改变
    onChange (picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
    },
    // 取消
    onCancel () {
      this.$toast('取消');
    },
    // 跳转到指定城市
    selectCity () {
      // 点击下箭头跳转到城市页面
      this.$router.push({
        name: 'city',
        params: {
          cname: this.cname
        }
      })
    },
    jump () {
      // 点击触发子组件内的方法，子组件内再触发vant绑定的左箭头的点击事件，跳转回去
      this.$emit('jump')
    },
    // 根据参数获取房屋信息
    async getHouseInfo () {
      // console.log(this.id);
      const houseRes = await getHouseInfoAPI(this.id)
      // console.log(houseRes);
      this.baseURL = houseRes.config.baseURL
      // console.log(this.baseURL);
      this.houseList = houseRes.data.body.list
      // console.log(this.houseList);
    },
    // 根据城市名获取相应子级城市
    async getSonCityList (id) {
      try {
        const res = await getSonCityListAPI(id)
        this.sonList = res.data.body
        // console.log(this.sonList);
        // 将对应城市的子级城市名保存起来
        this.sonList.forEach(item => this.columns.push(item.label))
        // console.log(this.columns);
      } catch (error) {
        this.$toast.fail('获取数据失败，请稍后重试！')
      }
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
    .van-search__label{
      padding: 0 20px;
    }
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
           padding-right: 20px;
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
  //  :deep(.van-search__label){
  //         padding:0 20px!important;
  //       }
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
        background-color: #21b97a;
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
          font-size: 30px;
          color: #394043;
        }
        p.house-info{
          font-size: 24px;
          color: #afb2b3;
          padding-top: 10px;
        }
        .house-adress{
          span{
              display: inline-block;
              font-size: 24px;
              border-radius: 6px;
              padding: 8px 10px;
              margin-right: 10px;
              // margin-bottom:10px;
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
