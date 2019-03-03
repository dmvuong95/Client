<template>
  <el-card class="el-card-full">
    <add-new-dialog :visible.sync="visibleDialog" @new-product="onNewProduct"></add-new-dialog>
    <el-container style="height: 100%;">
      <el-aside style="width: 150px; background-color: green;"></el-aside>
      <el-container>
        <el-header style="height: 45px; padding: 5px; text-align: right;">
          <el-button @click="addNew(newProduct)">Add new</el-button>
        </el-header>
        <el-main style="padding: 5px;">
          <el-table :data="productsArr" height="100%">
            <el-table-column label="Product name" prop="name"></el-table-column>
            <el-table-column label="Buy cost" prop="buyCost" align="right"></el-table-column>
            <el-table-column label="Sale cost" prop="saleCost" align="right"></el-table-column>
            <el-table-column label="Remain quantity" prop="remainQuantity" align="right"></el-table-column>
          </el-table>
        </el-main>
        <el-footer style="height: 32px; background-color: white; text-align: right;">
          <el-pagination
            @current-change="loadData"
            :current-page.sync="filter.currentPage"
            :page-size="filter.pageSize"
            layout="prev, pager, next, jumper, total"
            :total="totalProduct">
          </el-pagination>
        </el-footer>
      </el-container>
    </el-container>
  </el-card>
</template>
<script>
import _ from 'lodash'
import app from '@/app'
import PRODUCT from './product.js'
import addNewDialog from './dialog'

export default {
  data () {
    return {
      productsArr: [],
      totalProduct: 0,
      filter: {
        currentPage: 1,
        pageSize: 15,
        sort: {remainQuantity: -1}
      },
      visibleDialog: false
    }
  },
  methods: {
    async loadData () {
      try {
        let result = await PRODUCT.getAll({
          limit: this.filter.pageSize,
          skip: this.filter.pageSize * (this.filter.currentPage - 1),
          sort: this.filter.sort
        })
        this.productsArr = result.data
        this.totalProduct = result.total
      } catch (error) {
        console.error(error)
        this.$message.error('Error!!!!')
      }
    },
    async addNew (product) {
      await app.storeVue.Product.dispatch('changeCurrentProduct', _.cloneDeep(product))
      this.visibleDialog = true
    },
    onNewProduct (product) {
      this.productsArr.splice(0, 0, product)
    }
  },
  created () {
    this.loadData()
  },
  computed: {
    newProduct: () => ({
      name: '',
      buyCost: 0,
      saleCost: 0,
      remainQuantity: 0
    })
  },
  components: {
    addNewDialog
  }
}
</script>
