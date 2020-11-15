<template>
  <div>
    <header-bar id="header"></header-bar>

    <div id="" class="wid-1200">
      <div class="">
        <div class="outer">
          <div class="box-frame">
            <div class="select-welfare-title">公益信息查询</div>
            <div class="select-welfare-menu">
              <div class="select-welfare-item mark item-0">1</div>
              <div class="select-welfare-mid"></div>
              <div class="select-welfare-item item-1">2</div>
            </div>
            <div class="select-welfare-kv">
              <div class="logistics-item">
                <span>2020-05-18 19:15:32 </span>
                <span>捐赠人XXX登记捐赠信息。</span>
              </div>
              <div class="select-welfare-info">
                <span>其他某件事信息：</span>
                <span>xxxxxxxxxxxxxxxxxxxx。</span>
              </div>
              <div class="select-welfare-info">
                <span>其他信息：</span>
                <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx。</span>
              </div>
              <div class="select-welfare-info">
                <span>其他信息：</span>
                <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx。</span>
              </div>
              <div class="select-welfare-block" style="margin-top: 40px">
                <span>区块高度：</span>
                <span>6789542</span>
              </div>
              <div class="select-welfare-block">
                <span>区块哈希：</span>
                <span
                  >weq3595cdas12d6q5we610f2a1ds563665c9as8d8asdasdczxcqwqwwqw</span
                >
              </div>
              <div class="select-welfare-block">
                <span>事务哈希：</span>
                <span>weq3595cdas12d6q5we610f2a1ds563665c9as8d8asdasdczxc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { HeaderBar } from '@/components/HeaderBar'

@Options({
  computed: {
    HeaderBar
  }
})
export default class SelectDonors extends Vue {}
</script>
