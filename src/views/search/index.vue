<template>
  <div>
    <form action="/" ref="search">
      <van-search
        v-model="keyWords"
        show-action
        :input-align="position"
        placeholder="请输入小区或地址"
        background="#eee"
        @cancel="onCancel"
        @focus="onFocus"
        @blur="onBlur"
        @input="onChange"
      />
      <div class="area-list">
        <van-cell-group v-for="(item, index) in communityList" :key="index">
          <van-cell
            :title="item.communityName"
            @click="toPublish(item.communityName, item.community)"
          />
        </van-cell-group>
      </div>
    </form>
  </div>
</template>

<script>
// 引入根据关键词查询小区的API/获取城市id的API
import { getCommunityAPI, getCityInfoNameAPI } from '@/api';
export default {
  name: 'HaokeRoomSearch',

  data () {
    return {
      keyWords: '',
      position: 'center', // 搜索框的定位
      currentCityCode: '', // 当前城市id
      communityList: [], // 搜索结果
      timer: null
    };
  },
  created () {
    this.getCityInfoName();
  },
  computed: {
    cname () {
      // 保存跳转传参传进来的当前城市名
      return this.$route.params.cname;
    }
  },
  mounted () {},

  methods: {
    // 按下取消触发
    onCancel () {
      this.$router.back();
    },
    // 获取焦点
    onFocus () {
      this.position = 'left';
    },
    // 失去焦点
    onBlur () {
      this.position = 'center';
    },
    // 内容改变，获取搜索结果
    onChange () {
      // 添加防抖
      this.timer = setTimeout(async () => {
        if (this.keyWords.trim().length === 0) {
          return;
        }
        try {
          const res = await getCommunityAPI(
            this.keyWords,
            this.currentCityCode
          );
          this.communityList = res.data.body;
          if (this.communityList.length == 0) {
            return this.$toast.fail('抱歉，暂无该小区匹配数据');
          }
        } catch (error) {
          this.$toast.fail('获取数据失败！请稍后重试');
        }
      }, 1000);
    },
    // 获取当前城市id
    async getCityInfoName () {
      try {
        const res = await getCityInfoNameAPI(this.cname);
        this.currentCityCode = res.data.body.value;
      } catch (error) {
        this.$toast.fail('获取数据失败！请稍后重试');
      }
    },
    // 点击结果，返回上一级发布房源页面
    toPublish (communityName, communityCode) {
      this.$router.push({
        name: 'publish',
        params: {
          communityName: communityName,
          communityCode: communityCode
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
