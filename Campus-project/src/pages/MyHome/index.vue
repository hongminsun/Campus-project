<template>
  <div>
    <!-- 三级联动全局组件  已经注册为全局组件了 因此不需要再引入和注册了 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <MyRank />
    <MyLike />
    <MyFloor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    />
    <MyBrand />
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from "@/pages/MyHome/ListContainer";
import Recommend from "@/pages/MyHome/Recommend";
import MyRank from "@/pages/MyHome/MyRank";
import MyLike from "@/pages/MyHome/MyLike";
import MyFloor from "@/pages/MyHome/MyFloor";
import MyBrand from "@/pages/MyHome/MyBrand";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand,
  },
  mounted() {
    // 派发action 获取floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped lang="less">
</style>