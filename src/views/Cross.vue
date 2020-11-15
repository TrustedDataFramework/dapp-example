<template>
  <div>
    <header-bar></header-bar>
    <div id="" class="wid-1200">
      <div class="">
        <div class="outer">
          <div class="box-frame">
            <div class="select-sender-title" id="org"></div>
            <div class="select-sender-kv">
              <div class="select-sender-info">
                <span>红十字会上链信息：</span>
              </div>
              <div class="select-sender-info">
                <span>捐赠区块高度：</span>
                <span id="height"></span>
              </div>
              <div class="select-sender-info">
                <span>捐赠区块哈希：</span>
                <span
                  id="blockHash"
                  style="
                    font-size: 0.7em;
                    position: relative;
                    display: block;
                    top: 0.5em;
                  "
                ></span>
              </div>
              <div class="select-sender-info">
                <span>捐赠事务哈希：</span>
                <span
                  id="txHash"
                  style="
                    font-size: 0.7em;
                    position: relative;
                    display: block;
                    top: 0.5em;
                  "
                ></span>
              </div>
            </div>
            <div class="box-donate">
              <div class="cross-donate donate-info">
                <span>捐赠信息：</span>
              </div>
              <div class="cross-donate">
                <span>捐赠姓名：</span>
                <span id="name"></span>
              </div>
              <div class="cross-donate">
                <span>捐赠内容：</span>
                <div class="donated-content">
                  <div class="countersign" id="content"></div>
                </div>
              </div>
              <div class="cross-donate">
                <span id="confirm-description"></span>
              </div>
              <div class="cross-donate">
                <span>捐赠地址：</span>
                <span id="address"></span>
              </div>
              <div class="cross-donate">
                <span>受益人：</span>
                <span id="get"></span>
              </div>
              <div class="cross-donate">
                <span>捐赠机构：</span>
                <span id="donor"></span>
              </div>
            </div>
            <div class="text-center">
              <button class="box-but" id="but-select-sender">存证上链</button>
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

@Options({
  components: {
    HeaderBar
  }
})
export default class Cross extends Vue {}
</script>

<style scoped lang="css">
@import url('@/css/cross.css');
</style>
