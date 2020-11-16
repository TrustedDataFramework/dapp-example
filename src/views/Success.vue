<template>
  <div id="success-body">
    <header-bar id="header"></header-bar>

    <div class="wid-1200">
      <div class="">
        <div class="outer">
          <img src="@/img/success.png" />
          <div class="success-title">
            <div class="">恭喜您信息登记成功！以下是您的上链哈希：</div>
            <div class="val">{{ txHash }}（请妥善保管）</div>
          </div>
          <div class="text-center">
            <router-link
              class="box-but but-confirm"
              id="confirm"
              :to="redirect"
            >
              确认
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import HeaderBar from '@/components/HeaderBar'

@Options({
  components: { HeaderBar }
})
export default class Success extends Vue {
  txHash = ''
  redirect = ''
  created() {
    this.txHash = <string>this.$route.query.txHash
    this.redirect = <string>this.$route.query.redirect
  }

  confirm() {}
}
</script>
