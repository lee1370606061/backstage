<template>
  <el-card v-loading="loading" style="height:92.5vh;">
    <el-button @click="addNew">添加产品</el-button>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        label="菜单">
        <template slot-scope="scope">
          <div v-for="item of categories" :key="item.id">
            <span v-if="item.id === scope.row.category_id">{{item.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="优惠">
        <template slot-scope="scope">
          <div v-for="item of offers" :key="item.id">
            <span v-if="item.id === scope.row.offer_id">{{item.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="原价"
        prop="origin_price">
      </el-table-column>
      <el-table-column
        label="价格"
        prop="price">
      </el-table-column>
      <el-table-column
        label="排序"
        prop="sort">
      </el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <img style="width:5rem" :src="scope.row.image">
        </template>
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
    <el-dialog title="添加产品" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单" :label-width="formLabelWidth">
          <el-select v-model="form.category_id" placeholder="请输入菜单">
            <el-option v-for="(item, index) of categories" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠" :label-width="formLabelWidth">
          <el-select v-model="form.offer_id" placeholder="请输入优惠">
            <el-option v-for="(item, index) of offers" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原价" :label-width="formLabelWidth">
          <el-input v-model="form.origin_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <ImageUpload :imageUrl="form.image" @success="res => form.image = res" />
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
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      loading: false,
      visible: false,
      categories: [],
      offers: [],
      tableData: [],
      search: '',
      imageUrl: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        offer_id: '',
        category_id: '',
        image: '',
        title: '',
        price: '',
        origin_price: '',
        sort: '',
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
        this.categories = res
      }).finally(() => {
        this.loading = false
      })

      this.$http.post('api/promote/getOffer', {}).then(res => {
        this.offers = res
      }).finally(() => {
        this.loading = false
      })

      this.$http.post('api/promote/getproduct', {}).then(res => {
        this.tableData = res
      }).finally(() => {
        this.loading = false
      })
    },
    addNew(){
      this.visible = true
      this.form.offer_id = ''
      this.form.category_id = ''
      this.form.image = ''
      this.form.title = ''
      this.form.price = ''
      this.form.origin_price = ''
      this.form.sort = ''
    },
    handleAdd() {
      this.loading = false
      this.$http.post('api/promote/saveProduct', this.form).then(res => {
        this.$message.success('保存成功')
        this.visible = false
        this.init()
      }).finally(() => {
        this.loading = false
      })
    },
    handleDelete(data) {
      this.loading = false
      this.$http.post('api/promote/deleteProduct', {id: data.id}).then(res => {
        this.init()
      }).finally(() => {
        this.loading = false
      })
    }
  },
}
</script>