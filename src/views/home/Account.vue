<template>
  <div class="about">
    <el-card style="height:92.5vh;">
      <span style="margin-right: 15px">Admin</span>
      <el-popconfirm
        confirm-button-text='是'
        cancel-button-text='否'
        icon="el-icon-info"
        icon-color="red"
        title="是否要退出?"
        @confirm="logout"
      >
        <el-button slot="reference" type="danger" plain><i class="el-icon-right"></i></el-button>
      </el-popconfirm>
    </el-card>
   
  </div>
</template>
