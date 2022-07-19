<template>
    <div class="login">
        <!-- 头部navd导航栏S -->
        <van-nav-bar
            title="账号登录"
            left-arrow
            @click-left="onClickLeft"
            class="nav-bar"
        />
        <!-- 头部navd导航栏E -->
        <!-- 手机/验证码S -->
        <van-form @submit="onSubmit" class="from">
        <van-field
            v-model="username"
            name="username"
            placeholder="请输入账号"
            :rules="[{ required: true, message: '请输入正确账号' }]"
            border
        />
        <van-field
            v-model="password"
            type="password"
            name="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            border
            autocomplete="off"
        />
    <div style="margin: 16px;">
        <van-button  block type="info" native-type="submit">登录</van-button>
    </div>
        </van-form>
        <!-- 手机/验证码E -->
        <!-- 账号注册提示文字S -->
        <div class="register">
             <router-link to="register">还没有账号，去注册~ </router-link>
         </div>
        <!-- 账号注册提示文字E -->
    </div>
</template>

<script>
// 导入登录请求方法
import { getLoginAPI } from '@/api/user.js'

export default {
  name: 'LoginIndex',

  data () {
    return {
      username: '',
      password: ''
    //   pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    }
  },
  mounted () {
  },

  methods: {
    onClickLeft () {
      // 返回上级页面
      this.$router.back()
    },
    async onSubmit (users) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await getLoginAPI(users)
        // console.log(res);
        const stu = res.data.status
        if (stu === 400) {
          this.$toast.fail('登录失败，请检查账号密码是否错误')
          // console.log(res);
        } else {
          // console.log(res);
          // this.$state
          this.$toast.success('登录成功')
          // console.log(res.data.body)
          // 将获取到的后台token数据存储到vuex容器中，并且会调用存入本地存储的方法(this.$store.commit('容器名',获取出来的包含token的对象))
          this.$store.commit('setUser', res.data.body)
          //   跳转到首页'/'
          this.$router.push('/')
        }
      } catch (error) {
        this.$toast.fail('登录失败,请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 登录页面nav-bar样式
.login{
    /deep/.nav-bar{
        background-color:#21b97a;
        margin-bottom: 42px;
        .van-nav-bar__title{
            color:#fff;
        }
        .van-icon{
            color:#fff
        }
    }
// 表格样式
.from{
    .van-cell{
       height: 120px;
    }
    .van-button{
        background-color:#1cb676;
        border:0;
    }
    }
}
   .register{
    display:flex;
    justify-content:center;
        a{
            font-size: 28px;
            color:#666
        }
    }
</style>
