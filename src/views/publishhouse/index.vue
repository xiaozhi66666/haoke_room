<template>
  <div class="publisgInfo">
    <!-- 头部标题栏S -->
    <header>
      <Header title="发布房源"></Header>
    </header>
    <!-- 头部标题栏E -->
    <!-- 主题区域S -->
    <main>
      <van-cell-group class="publisgInfo-title">
        <van-cell title="房源信息" />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          title="房源信息"
          is-link
          :value="communityName ? communityName : '请输入小区名'"
          @click="$router.push({ path: '/search', cname: $route.params.cname })"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="rentPrice"
          label="租金"
          placeholder="请输入租金/月"
          class="rent-price"
        >
          <span slot="right-icon">￥/月</span>
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="area" label="建筑面积" placeholder="请输入建筑面积"
          ><span slot="right-icon">m²</span>
        </van-field>
      </van-cell-group>
      <van-cell-group class="houseType">
        <van-cell title="户型" is-link @click="showPopupHouseType"
          >{{ houseType || '请选择' }}
        </van-cell>
        <van-popup
          v-model="showHouseType"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            title="户型"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="所在楼层" is-link @click="showPopupFloor"
          >{{ houseFloor || '请选择' }}
        </van-cell>
        <van-popup
          v-model="showFloor"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            title="楼层"
            show-toolbar
            :columns="columnsFloor"
            @confirm="onConfirmFloor"
            @cancel="onCancelFloor"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group class="houseType">
        <van-cell title="朝向" is-link @click="showPopupTowards"
          >{{ houseOriented || '请选择' }}
        </van-cell>
        <van-popup
          v-model="showTowards"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            title="朝向"
            show-toolbar
            :columns="columnsTowards"
            @confirm="onConfirmTowards"
            @cancel="onCancelTowards"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group class="house-title" :border="false"
        ><van-field
          v-model="houseTitle"
          rows="2"
          autosize
          label="房屋标题"
          type="textarea"
          maxlength="50"
          placeholder="请输入标题（例如：整租小区名1单元106室）"
          show-word-limit
        />
      </van-cell-group>
      <van-cell-group class="house-img">
        <van-cell title="房屋图像" size="large" />
        <van-uploader
          v-model="fileList"
          class="upLoader"
          :after-read="afterread"
          capture="camera"
          multiple
        />
      </van-cell-group>
      <!-- 房屋配置 -->
      <van-cell-group class="house-config">
        <van-cell title="房屋配置" size="large" />
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            v-for="(item, index) in houseConfigList"
            :key="index"
            :text="item.title"
            @click="chooseConfig(item.title)"
            :class="{ active: configList.includes(item.title) }"
          >
            <span class="haoke" slot="icon" v-html="item.icon"></span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <!-- 描述 -->
      <van-cell-group class="house-desc">
        <van-cell-group class="house-title" :border="false"
          ><van-field
            v-model="houseDesc"
            rows="2"
            label="房屋描述"
            type="textarea"
            placeholder="请输入房屋描述信息"
            show-word-limit
          />
        </van-cell-group>
      </van-cell-group>
      <van-loading
        type="spinner"
        color="#1989fa"
        class="loading"
        size="50px"
        vertical
        v-show="isShowLoading"
        >房源发布中...</van-loading
      >
    </main>
    <!-- 主题区域E -->
    <!-- 底部按钮S -->
    <footer>
      <div class="cancel" @click="cancel">取消</div>
      <div class="confirm" @click="submitHouseInfo">提交</div>
    </footer>
    <!-- 底部按钮E -->
  </div>
</template>

<script>
import Header from '@/components/Header';
// 导入上传房源信息的接口
// import { publishHouseInfoAPI, setHouseImageAPI } from '@/api';
import {
  setHouseImageAPI,
  publishHouseInfoAPI,
  getCityInfoNameAPI,
  getHouseCondiTionsAPI
} from '@/api';
export default {
  name: 'HaokeRoomIndex',
  components: { Header },

  data () {
    return {
      isShowLoading: false,
      showHouseType: false,
      showFloor: false,
      showTowards: false,
      rentPrice: '', // 租金
      area: '', // 面积
      houseTitle: '', // 房屋标题
      houseConfigList: [
        { title: '衣柜', icon: '&#xe60a;' },
        { title: '洗衣机', icon: '&#xe67d;' },
        { title: '空调', icon: '&#xe65b;' },
        { title: '天然气', icon: '&#xe60e;' },
        { title: '冰箱', icon: '&#xe64d;' },
        { title: '暖气', icon: '&#xe90d;' },
        { title: '电视', icon: '&#xe8ba;' },
        { title: '热水器', icon: '&#xe645;' },
        { title: '宽带', icon: '&#xe6ba;' },
        { title: '沙发', icon: '&#xe6c6;' }
      ],
      floorList: [], //
      orientedList: [],
      priceList: [],
      roomTypeList: [],

      houseDesc: '', // 房屋描述
      configList: [], // 保存的配置设施列表
      houseType: '', // 类型
      houseFloor: '', // 楼层
      houseOriented: '', // 朝向
      fileList: [], // 存储上传图片的列表
      id: this.$route.params.communityCode,
      imagesList: [],
      cityId: ''
    };
  },

  mounted () {
    // this.getCityInfo();
    this.getCityInfoName();
  },
  created () {},

  methods: {
    showPopupHouseType () {
      this.showHouseType = true;
    },
    showPopupFloor () {
      this.showFloor = true;
    },
    showPopupTowards () {
      this.showTowards = true;
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 确认
    onConfirm (value, index) {
      this.houseType = value;
      this.showHouseType = false;
    },
    // 取消
    onCancel () {
      this.$toast('取消');
      this.showHouseType = false;
    },
    // 确认
    onConfirmFloor (value, index) {
      this.houseFloor = value;
      this.showFloor = false;
    },
    // 取消
    onCancelFloor () {
      this.$toast('取消');
      this.showHouseType = false;
    },
    // 确认
    onConfirmTowards (value) {
      this.houseOriented = value;
      this.showTowards = false;
    },
    // 取消
    onCancelTowards () {
      this.$toast('取消');
      this.showTowards = false;
    },
    // 选择房屋配置(接收遍历出的每一项配置名字)
    chooseConfig (configName) {
      // 添加判断，判断保存配置的数组中是否已存在相同的配置，如果存在，就筛选出其在数组中的索引，将其删除
      if (this.configList.includes(configName)) {
        // 获取在数组中的索引
        const index = this.configList.findIndex((item) => item == configName);
        // 已存在，删除
        this.configList.splice(index, 1);
      } else {
        // 如果不存在，将其添加入数组
        this.configList.push(configName);
      }
    },

    // 获取文件
    async afterread (file) {
      // 此时可以自行将文件上传至服务器
      const res = await setHouseImageAPI(file.file);
      this.imagesList.push(res.data.body[0]);
    },
    // 提交上传房源数据
    async submitHouseInfo () {
      this.isShowLoading = true;
      try {
        const res = await publishHouseInfoAPI(this.housePublishInfo);
        if (res.data.status === 200) {
          this.isShowLoading = false;
          return this.$toast.success('发布房源成功！');
        }
        this.housePublishInfo = '';
      } catch (error) {
        this.$toast.fail('发布房源失败！');
      }
    },

    cancel () {
      this.$router.push('/');
    },
    // 获取城市id
    async getCityInfoName () {
      const res = await getCityInfoNameAPI(this.cName);
      // console.log(res);
      this.cityId = res.data.body.value;
      const ress = await getHouseCondiTionsAPI(this.cityId);
      console.log(ress);
      // 楼层
      this.floorList = ress.data.body.floor;
      // 朝向
      this.orientedList = ress.data.body.oriented;
      // 价格
      this.priceList = ress.data.body.price;
      // 户型
      this.roomTypeList = ress.data.body.roomType;
    }
  },

  computed: {
    communityName () {
      // 小区名
      return this.$route.params.communityName;
    },
    communityCode () {
      // 小区ID
      return this.$route.params.communityCode;
    },
    cName () {
      return this.$store.state.cName;
    },
    // 展示
    // 户型
    columns () {
      const arr = [];
      this.roomTypeList.forEach((item) => {
        arr.push(item.label);
      });
      return arr;
    },
    // 朝向
    columnsTowards () {
      const arr = [];
      this.orientedList.forEach((item) => {
        arr.push(item.label);
      });
      return arr;
    },
    // 楼层
    columnsFloor () {
      const arr = [];
      this.floorList.forEach((item) => {
        arr.push(item.label);
      });
      return arr;
    },
    // 获取数据
    // 户型
    roomTypeConfirm () {
      let str = '';
      this.roomTypeList.forEach((item) => {
        if (this.houseType === item.label) {
          str = item.value;
        }
      });
      return str;
    },
    // 楼层
    floorConfirm () {
      let str = '';
      this.floorList.forEach((item) => {
        if (this.houseFloor === item.label) {
          str = item.value;
        }
      });
      return str;
    },
    // 朝向
    oritenedConfirm () {
      let str = '';
      this.orientedList.forEach((item) => {
        if (this.houseOriented === item.label) {
          str = item.value;
        }
      });
      return str;
    },
    // 上传的图片
    imagesListConfirm () {
      return this.imagesList.join('|');
    },
    supportConfirm () {
      return this.configList.join('|');
    },

    housePublishInfo () {
      return {
        title: this.houseTitle,
        description: this.houseDesc,
        houseImg: this.imagesListConfirm,
        oriented: this.oritenedConfirm,
        supporting: this.supportConfirm,
        price: this.rentPrice,
        roomType: this.roomTypeConfirm,
        size: this.area,
        floor: this.floorConfirm,
        community: this.communityCode
      };
    }
  }
};
</script>
<style lang="less" scoped>
.publisgInfo {
  // 主体样式
  padding-bottom: 60px;
  main {
    position: relative;
    padding: 92px 0;
    background-color: #f6f5f6;
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 300%);
    }
    .publisgInfo-title {
      border-bottom: 1px solid #e8e8e8;
      .van-cell__title {
        span {
          font-size: 30px;
          color: #21b97a;
        }
      }
    }
    .rent-price {
      :deep(.van-field__label) {
        span {
          letter-spacing: 58px;
        }
      }
    }
    .houseType {
      .van-cell__title {
        letter-spacing: 58px;
      }
    }
    :deep(.van-field__label) {
      margin: 0;
    }
    .house-title {
      :deep(.van-cell) {
        display: flex;
        flex-direction: column;
      }
      :deep(.van-field__label) {
        padding: 10px 0;
      }
      :deep(.van-cell__value) {
        width: 100%;
        border-top: 2px solid #eee;
      }
    }
    .house-img {
      border-top: 0;
      .van-cell--large {
        padding-bottom: 0.1rem;
      }
    }
    :deep(.van-hairline--top-bottom::after) {
      width: 0;
      height: 0;
      border-width: unset !important;
      background-color: #fff;
      border: none;
    }
    // 配置
    .house-config {
      .van-cell--large {
        border-bottom: 2px solid #eee;
      }
      .van-grid-item {
        span.haoke {
          font-size: 50px;
          // color:#333;
        }
        :deep(.van-grid-item__text) {
          color: unset;
        }
      }
      .active {
        color: #21b97a;
      }
    }
    // 文件上传
    .upLoader {
      :deep(.van-uploader__wrapper) {
        padding-left: 20px;
        padding-top: 20px;
      }
    }
    // 房屋描述
    .house-desc {
      margin-top: 40px;
      .house-title {
        height: 296px;
      }
    }
  }
  // 底部按钮
  footer {
    display: flex;
    height: 90px;
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0;
    div {
      font-size: 30px;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cancel {
      background-color: #fff;
      color: #21b97a;
    }
    .confirm {
      background-color: #21b97a;
      color: #fff;
    }
  }
}
</style>
