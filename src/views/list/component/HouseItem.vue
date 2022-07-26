<template>
  <div>
    <!-- 房源展示项S -->
    <main>
      <div
        class="house-item"
        v-for="(item, index) in houseList"
        :key="index"
        @click="jump(index)"
      >
        <div class="left">
          <img
            :src="`http://liufusong.top:8080${item.houseImg}`"
            alt=""
            v-if="item.houseImg"
          /><van-loading type="spinner" v-else />
        </div>
        <div class="right">
          <h4 class="house-name">{{ item.title }}</h4>
          <p class="house-info">{{ item.desc }}</p>
          <div class="house-adress">
            <span>{{ item.tags[0] }}</span>
          </div>
          <div class="house-price">
            <span class="price">{{ item.price }}</span
            >元/月
          </div>
        </div>
      </div>
    </main>
    <!-- 房源展示项E -->
  </div>
</template>

<script>
export default {
  name: 'HouseItem',
  props: {
    houseList: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      code: ''
    };
  },

  mounted () {},

  methods: {
    jump (index) {
      // console.log(22);
      // 保存具体点击的房屋的code
      this.code = this.houseList[index].houseCode;
      console.log(this.code);
      // 再跳转时将房屋的code传递过去
      this.$router.push({
        name: 'houseinfo',
        params: {
          code: this.code
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

main {
  padding: 0 30px;
  .house-item {
    display: flex;
    padding-top: 36px;
    height: 180px;
    .left {
      width: 212px;
      height: 160px;
      background-color: #21b97a;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      padding-left: 24px;
      h4.house-name {
        width: 5.93333rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        // width:100%;
        font-size: 30px;
        color: #394043;
      }
      p.house-info {
        font-size: 24px;
        color: #afb2b3;
        padding-top: 10px;
      }
      .house-adress {
        span {
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
      .house-price {
        font-size: 24px;
        color: #fa5741;
        span.price {
          font-size: 32px;
          font-weight: 700;
          // padding: 10px 0;
          color: #fa5741;
        }
      }
    }
  }
}
</style>
