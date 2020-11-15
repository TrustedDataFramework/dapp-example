<template>
  <div class="safe-conent">
    <div class="top_right">
      <i class="fa fa-cog" style="color: #ffffff; font-size: 36px"></i>
    </div>

    <div class="safe-item">
      <div class="safe-title">欢迎使用TDS公益查询网站</div>
      <div class="safe-slogan"></div>
      <div class="safe-wrap">
        <input type="text" placeholder="请输入事务哈希值" id="txt" />
        <div class="safe-wrap-img" id="safe-search">
          <img src="@/img/addressee-search.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class BeneficiarySelect extends Vue {}
</script>

<style scoped lang="css">
@import url(@/css/safe.css);
</style>
