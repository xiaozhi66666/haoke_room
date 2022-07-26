<template>
  <div>
    <div class="item">
      <div class="title">
        <p>户型</p>
      </div>
      <div class="btn">
        <span>112</span>
        <span>112</span>
        <span>112</span>
        <span>112</span>
        <span>112</span>
        <span>112</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HaokeRoomPopup',

  data () {
    return {};
  },

  mounted () {},

  methods: {}
};
</script>

<style lang="less" scoped>
.item {
  .title {
    font-size: 30px;
    margin-left: 40px;
  }
  // 按钮
  .btn {
    width: 500px;
    height: 312px;
    margin-left: 80px;
    padding: 28px 0;
    display: flex;
    align-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 1px solid #e5e5e5;
    span {
      display: inline-block;
      height: 64px;
      width: 140px;
      margin: 0 36px 30px 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      line-height: 64px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  }
}
</style>
