<template>
  <el-card v-loading="loading" style="height:92.5vh;">
    <el-button @click="addNew">添加导航</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="240"
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加导航" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="导航名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="visible-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确认</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      visible: false,
      tableData: [],
      search: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.loading = false
      this.$http.post('api/promote/getCategory', {}).then(res => {
        this.tableData = res
      }).finally(() => {
        this.loading = false
      })
    },
    addNew(){
      this.visible = true
      this.form.name = ''
    },
    handleAdd() {
      this.loading = false
      this.$http.post('api/promote/saveCategory', this.form).then(res => {
        this.$message.success('保存成功')
        this.visible = false
        this.init()
      }).finally(() => {
        this.loading = false
      })
    },
    handleDelete(data) {
      this.loading = false
      this.$http.post('api/promote/deleteCategory', {id: data.id}).then(res => {
        this.init()
      }).finally(() => {
        this.loading = false
      })
    }
  },
}
</script>