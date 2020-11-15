<template>
  <div>
    <div class="home-box">
      <ul class="section-ui">
        <li>
          <div class="li-div-title">
            <img src="@/img/welfare-juanzeng.png" />
            <router-link class="item-title" to="/donors">捐赠人</router-link>
          </div>
        </li>
        <li>
          <div class="li-div-title">
            <img src="@/img/welfare-Cross.png" />
            <router-link class="item-title" to="/cross">红十字会</router-link>
          </div>
        </li>

        <li>
          <div class="li-div-title">
            <img src="@/img/welfare-shouyi.png" />
            <router-link class="item-title" to="/beneficiary-select"
              >受益人</router-link
            >
          </div>
        </li>
      </ul>
      <div class="paompt bg-white d-flex flex-column container px-5">
        <div class="paompt-item row mt-4">
          <span class="col-sm-3 offset-sm-2">捐赠人分配地址：</span>
          <span id="address" class="col-sm-6">{{ tip0 }}</span>
        </div>
        <div class="paompt-item row mt-4">
          <span class="col-sm-3 offset-sm-2">红十字会分配地址：</span>
          <span class="col-sm-6">5cc87525535e1668599373ad2ac475226beebede</span>
        </div>
        <div class="paompt-item row mt-4">
          <span class="col-sm-3 offset-sm-2">受益人分配地址：</span>
          <span class="col-sm-6">{{ tip2 }}</span>
        </div>
        <div class="text-center mt-2">
          <button class="btn btn-outline-secondary btn-sm" id="reset">
            重置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/css/home.css);
</style>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { emptyDonor, getDonor } from '@/api'
import { deployOnce } from '@/api/deploy'
import { ADDRESS } from '@/api/constants'

const TIP = '请在捐赠人处填写相关信息并且上链'

@Options({
  name: 'Home'
})
export default class App extends Vue {
  title = '标题2'
  donor = emptyDonor()
  hasDonor = false
  tm = []

  get tip0(): string {
    return this.hasDonor ? ADDRESS : TIP
  }

  get tip2(): string {
    return this.hasDonor ? this.donor.get : TIP
  }

  created() {
    // 尝试部署合约
    deployOnce()
    this.tm.push(setInterval(() => this.refresh(), 500))
  }
  refresh() {
    getDonor().then((r) => {
      if (r) this.hasDonor = true
      this.donor = r || emptyDonor()
    })
  }

  beforeUnmount() {
    this.tm.forEach((t) => clearInterval(t))
  }
}
</script>
