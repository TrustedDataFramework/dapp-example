<template>
  <div>
    <header-bar></header-bar>
    <div class="wid-1200">
      <div class="">
        <div class="outer">
          <div class="box-frame">
            <div class="register-title font-6">捐赠人上链信息填写</div>
            <div class="register-kv">
              <div class="register-item">
                <span class="">捐赠姓名：</span>
                <input type="text" id="name" v-model="name" />
              </div>

              <div class="conent-item">
                <span class="">捐赠内容：</span>
                <select id="content" name="content" v-model="content">
                  <option value="口罩">口罩</option>
                  <option value="防毒面具">防毒面具</option>
                </select>
                <input
                  type="text"
                  id="quantity"
                  v-model.number="quantity"
                  class="conent-input"
                  placeholder="输入数量"
                />
                <input
                  type="text"
                  id="info"
                  v-model="info"
                  class="conent-input"
                  placeholder="输入简介信息"
                />
              </div>
              <div class="register-item">
                <span class="">捐赠地址：</span>
                <input
                  type="text"
                  id="address"
                  required="required"
                  v-model="address"
                />
              </div>
              <div class="register-item">
                <span class="">受益人：</span>
                <input type="text" id="get" v-model="get" />
              </div>
              <div class="register-item">
                <span class="">捐赠机构：</span>
                <input type="text" id="donor" v-model="donor" />
              </div>
            </div>
            <div class="text-center">
              <button class="box-but" @click="publish" :disabled="disabled">
                存证上链
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import HeaderBar from '@/components/HeaderBar.vue'
import { DonorPayload, saveDonor } from '@/api'

@Options({
  name: 'Donors',
  components: {
    HeaderBar
  }
})
export default class Donors extends Vue implements DonorPayload {
  name = ''
  content = '口罩'
  quantity = null
  info = ''
  address = ''
  get = ''
  donor = ''
  confirmed = false
  disabled = false

  publish() {
    // 校验表单
    const regs: Record<string, [RegExp, string]> = {
      name: [/.+/, '请输入捐赠人姓名'],
      quantity: [/[0-9]+/, '请输入正确的捐赠数量'],
      info: [/.+/, '请输入简介信息'],
      address: [/[a-fA-F0-9]{20}/, '请输入正确的捐赠人地址'],
      get: [/[a-fA-F0-9]{20}/, '请输入正确的受益人地址'],
      donor: [/.+/, '请输入正确的捐赠机构']
    }

    const o = {}
    let error = false
    for (let k of Object.keys(regs)) {
      let val = (this[k] || '').toString().trim()
      let reg = regs[k][0]
      if (!reg.test(val)) {
        alert(regs[k][1])
        error ||= true
      }
    }
    if (error) return
    saveDonor(this)
  }
}
</script>

<style scoped>
@import url(@/css/donors.css);
</style>
