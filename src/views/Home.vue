<template>
  <el-container class="home">
    <el-aside style="padding:20px;padding-right:0" height="100">
      <el-card style="height:92.5vh;">
        <el-menu router>
          <el-menu-item index="/account"><i class="el-icon-user-solid"></i>账号管理</el-menu-item>
          <!-- <el-menu-item index="1-2"><i class="el-icon-menu"></i>Option 2</el-menu-item> -->
          <el-submenu index="/" default-openeds="/home-setting,/live-setting">
            <template slot="title"><i class="el-icon-setting"></i>页面配置</template>
            <el-menu-item index="/home-setting"><i class="el-icon-s-home"></i>首页配置</el-menu-item>
            <el-menu-item index="/live-setting"><i class="el-icon-video-camera-solid"></i>直播页面配置</el-menu-item>
          <!-- <el-menu-item-group>
            <template slot="title">Group 1</template>
            <el-menu-item index="2-1"><i class="el-icon-setting"></i> Option 1</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-menu"></i>Option 2</el-menu-item>
          </el-menu-item-group> -->
          </el-submenu>
        </el-menu>
      </el-card>
     
    </el-aside>

    <el-container>
      <el-main>
        <router-view ></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    };
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods: {
    logout(){
      this.$ls.clear()
      this.$router.push('/login')
    }
  },
};
</script>
<style lang="less">
  .home {
    height: 98.4vh;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>