<template>
<!-- 游客==未登录页面S -->
    <div class="hk-my">
        <!-- 信封区域S===已登录状态 -->
        <div class="title" v-if="user">
          <div class="img">
             <div class="img-inside">
              <img src="http://liufusong.top:8080/img/avatar.png" alt="">
            </div>
          </div>
          <div class="letter">
            <div class="user-img">
              <img :src="info.avatar" alt="">
            </div>
             <div class="youke-btn">
               <div class="youke">{{info.nickname}}</div>
            <van-button type="primary" class="youke-login" @click='exitFn'>退出</van-button>
            </div>
           <p class="edit-info">编辑个人资料<van-icon name="setting-o" /></p>
          </div>
        </div>
      <!-- 信封区域E===已登录状态 -->
      <!-- 信封区域S===未登录状态 -->
        <div class="title" v-else>
          <div class="img">
             <div class="img-inside">
              <img src="http://liufusong.top:8080/img/profile/bg.png" alt="">
            </div>
          </div>
          <div class="letter">
            <div class="user-img">
              <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="">
            </div>
             <div class="youke-btn youke-btn-exit">
               <div class="youke">游客</div>
            <van-button type="primary" class="youke-login" @click='$router.push("/login")'>去登录</van-button></div>
          </div>
        </div>

      <!-- 信封区域E===未登录状态 -->
      <!-- 分类导航区域S -->
      <van-grid :column-num="3" class="nav-classify" :border=false>
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="wap-home-o" text="我的出租" />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="idcard" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" >
          <template #icon> <i class="haoke haoke-geren"></i> </template>
        </van-grid-item>
         <van-grid-item icon="contact" text="联系我们" >
          <template #icon> <i class="haoke haoke-kefu"></i> </template>
        </van-grid-item>
      </van-grid>
      <!-- 分类导航区域E -->
      <div class="advertise"><img src="http://liufusong.top:8080/img/profile/join.png" alt=""></div>
    </div>
   <!-- 游客==未登录页面E -->
</template>

<script>
// import { watch } from 'vue'
// 导入vuex中保存的token
import { mapState } from 'vuex'
// 导入请求用户信息的方法
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  // props: {
  //   active: {
  //     type: Number
  //   }
  // },

  data () {
    return {
      info: {}
    }
  },
  mounted () {

  },
  // 将保存的token==》user解构出来
  computed: { ...mapState(['user']) },
  created () {
    // 获取用户信息
    this.loadingLogin()
  },
  methods: {

    exitFn () {
      this.$dialog.confirm({
        title: '确认退出登录？'
      })
        .then(() => {
          // on confirm
          console.log('确认')
          // 确认退出  ==>  清楚登录状态(容器中的user + 本地存储中的TOKEN-USER)
          // 使用this.$store.commit('setUser',null)  this.$store.commit(a,b) ==> a==> 代表要提交到哪一个vuex容器变量 b ===> 代表提交什么数据给这个指定的vuex容器变量
          this.$store.commit('setUser', null)
          // this.$router.push('/login')
        })
        .catch(() => {
          console.log('取消')
        })
    },
    async loadingLogin () {
      try {
        const res = await getUserInfo()
        this.info = res.data.body
        console.log(this.info)
      } catch (error) {

      }
    }
  }

}
</script>

<style lang="less" scoped>
.hk-my{
  .title{
    min-height: 600px;
    position: relative;
    // box-sizing: border-box;
    .edit-info{
      position: absolute;
      bottom: 30px;
      color: #9a9b9c;
      // margin-bottom: 10px;
      .van-icon{
        padding-left: 10px;
      }
    }
    .img{
      border-radius: 50%;
    }
     img{
      width: 100%;
     }
    .letter{
    position: absolute;
    background: #fff;
    // height: 500px;
    width: 85%;
    // height: 40%;
      height: 50%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 6px #ddd;
    margin: 50px auto 10px;
    padding: 0 10px;
    text-align: center;
    font-size: 26px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .user-img{
      position: relative;
    transform: translateY(-50%);
    border-radius: 50%;
    width: 140px;
    height: 140px;
    border: 5px solid #f5f5f5;
    display: inline-block;
    box-shadow: 0 2px 2px #bdbdbd;
        }
    }
    .youke-btn{
       padding-bottom: 90px;

      .youke{
        margin-top: -30px;
      }
      .youke-login{
        width: 148px;
        height: 60px;
        margin-top: 30px;
        border-radius: 10px;
      }
    }
  }
  .nav-classify{
    .haoke{

      font-size:56px ;
    }
   /deep/ .van-grid-item__text{
       margin-top: 16px;
    }
  }
  .advertise{
    text-align: center;
    margin-top: 10px;
    width: 690px;
    height: 170px;
    margin-left:30px;
    img{
      width: 100%;
    }
  }
}

</style>
