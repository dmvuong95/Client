<template>
  <el-form ref="formAddNew" :model="currentProduct" :rules="formRules" label-width="100" label-position="left">
    <el-dialog :visible.sync="visible" :before-close="onClose" :title="currentProduct._id ? 'Edit product' : 'Add new product'" center append-to-body>
      <el-form-item label="Name" prop="name">
        <el-input v-model="currentProduct.name"></el-input>
      </el-form-item>
      <el-form-item label="Buy cost" prop="buyCost">
        <el-input-number v-model="currentProduct.buyCost" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="Sale cost" prop="saleCost">
        <el-input-number v-model="currentProduct.saleCost" :min="0" controls-position="right"></el-input-number>
      </el-form-item>
      <span slot="footer">
        <el-button @click="onClose">Cancel</el-button>
        <el-button type="success" @click="onSave">Save</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>
<script>
import app from '@/app'
import PRODUCT from './product.js'

export default {
  data () {
    return {
      formRules: {
        name: [{required: true, message: 'Please fill product name', trigger: 'blur'}]
      }
    }
  },
  methods: {
    onClose () {
      this.$emit('update:visible', false)
    },
    onSave () {
      this.$refs.formAddNew.validate(async valid => {
        if (!valid) return false
        console.log(this.currentProduct)
        try {
          let result = await PRODUCT.new(this.currentProduct)
          if (!result.ok) throw result.message
          this.$emit('new-product', result.data)
          this.$message({
            message: 'Add new product success!',
            type: 'success'
          })
          this.onClose()
        } catch (error) {
          console.error('44 error', error)
          this.$message.error('Add new product error! ' + error)
        }
      })
    }
  },
  computed: {
    currentProduct: () => app.storeVue.Product.getters.currentProduct
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>
