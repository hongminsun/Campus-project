<template>
  <div>
    <MyHeader></MyHeader>
    <!-- 书写路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home、search显示时显示，在登陆注册时隐藏 -->
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
// 引入
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";

export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    // 派发一个action  获取商品分类的三级列表的数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped lang="less">
</style>
