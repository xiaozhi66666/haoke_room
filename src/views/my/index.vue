<template>
<!-- 游客==未登录页面S -->
    <div class="hk-my">
      <!-- 信封区域S -->
        <div class="title">
          <div class="img">
             <div class="img-inside">
              <img src="http://liufusong.top:8080/img/profile/bg.png" alt="">
            </div>
          </div>
          <div class="letter">
            <div class="user-img">
              <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="">
            </div>
             <div class="youke-btn">
               <div class="youke">游客</div>
            <van-button type="primary" class="youke-login">去登录</van-button></div>
          </div>
        </div>
      <!-- 信封区域E -->
      <!-- 分类导航区域S -->
      <van-grid :column-num="3" class="nav-classify">
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
    </div>
   <!-- 游客==未登录页面E -->
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

  }
}
</script>

<style lang="less" scoped>
.hk-my{
  .title{
    min-height: 600px;
    position: relative;
    box-sizing: border-box;
    .img{
      border-radius: 50%;
    }
     img{
      width: 100%;
      // height: 100%;
     }
    .letter{
    position: absolute;
    background: #fff;
    width: 85%;
    height: 55%;
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
      position: absolute;
      width: 140px;
      height: 140px;
       position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
        }
    }
    .youke-btn{
       padding-bottom: 100px;
      .youke{
        margin-top: -30px;
        margin-bottom: 10px;
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
}

</style>
