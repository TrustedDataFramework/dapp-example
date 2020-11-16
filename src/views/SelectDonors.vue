<template>
  <div>
    <header-bar></header-bar>
    <div id="" class="wid-1200">
      <div class="">
        <div class="outer">
          <div class="box-frame">
            <div class="select-welfare-title">{{ titles[idx] }}</div>
            <div class="select-welfare-menu">
              <div
                class="select-welfare-item item-0"
                @click="idx = 0"
                :class="{ mark: idx === 0 }"
              >
                1
              </div>
              <div class="select-welfare-mid"></div>
              <div
                class="select-welfare-item item-1"
                @click="idx = 1"
                :class="{ mark: idx === 1 }"
              >
                2
              </div>
            </div>
            <div class="select-welfare-kv">
              <div class="logistics-item">
                <span class="font-6">{{ subTitles[idx] }}</span>
              </div>
              <div class="select-welfare-info">
                <span>捐赠姓名：</span>
                <span>{{d.name}}</span>
              </div>
              <div class="select-welfare-info">
                <span>捐赠内容：</span>
                <span>{{ d.content }}</span>
              </div>
              <div class="select-welfare-info">
                <span>捐赠说明：</span>
                <span>{{ c.description }}</span>
              </div>
              <div class="select-welfare-info">
                <span>捐赠地址：</span>
                <span>{{d.address}}</span>
              </div>
              <div class="select-welfare-info">
                <span>捐赠机构：</span>
                <span>{{ d.donor }}</span>
              </div>
              <div class="select-welfare-info">
                <span>受益人：</span>
                <span>{{ d.get }}</span>
              </div>
              <div class="select-welfare-block" style="margin-top: 40px">
                <span>区块高度：</span>
                <span>{{heights[idx]}}</span>
              </div>
              <div class="select-welfare-block">
                <span>区块哈希：</span>
                <span>{{ blockHashes[idx] }}</span>
              </div>
              <div class="select-welfare-block">
                <span>事务哈希：</span>
                <span>{{ txHashes[idx] }}</span>
              </div>
              <div class="text-center">
                <router-link to="/"
                  ><button class="box-but" id="but-select-welfare">
                    信息无误
                  </button></router-link
                >
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
import HeaderBar from '@/components/HeaderBar'
import { emptyConfirm, emptyDonor, getConfirm, getDonor, getHashByHeight } from '@/api'

@Options({
  components: {
    HeaderBar
  }
})
export default class SelectDonors extends Vue {
  // 0 = 公益信息查询 1= 查询信息-红十字会
  idx = 0
  titles = ['公益信息查询', '查询信息-红十字会']
  subTitles = ['捐赠人上链信息：', '红十字会上链信息：']
  txHashes = []
  blockHashes = []
  heights = []

  d = emptyDonor()
  c = emptyConfirm()

  created(){
    this.refresh()
  }

  refresh(){
    getDonor().then(r => {
      this.d = r
      this.heights[0] = r.height
      this.txHashes[0] = r.hash
      getHashByHeight(r.height).then(h => this.blockHashes[0] = h)
    })

    getConfirm().then(c => {
      this.c = c
      this.heights[1] = c.height
      this.txHashes[1] = c.hash
      getHashByHeight(c.height).then(h => this.blockHashes[1] = h)
    })
  }
}
</script>

<style scoped>
@import url(@/css/select.css);
</style>
