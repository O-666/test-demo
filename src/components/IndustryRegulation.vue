<template>
  <div class="flex flex-center">
    <!-- 左侧内容 -->
    <q-card class="card1 mr1 fl">
      <q-card-section class="text-subtitle12 text-weight-bold">
        <q-icon
          name="style"
          style="font-size: 2em"
          color="teal-6"
        />单位分组管理
      </q-card-section>
      <q-separator inset size="2px" color="teal-6" />
      <q-card-section>
        <!-- 左侧树 -->
        <q-card class="card1-1 mr1 fl">
          <!-- 查询 -->
          <q-card-section>
            <q-input
              outlined
              v-model="search"
              placeholder="请输入文件名称"
              :dense="true"
              bg-color="teal-2"
              color="teal-6"
              type="search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-card-section>
          <!-- 树 -->
          <q-card-section>
            <q-scroll-area
              :visible="false"
              style="height: 370px; max-width: 100%"
            >
              <q-tree
                :nodes="simple"
                accordion
                selected-color="teal-6"
                node-key="label"
                :selected.sync="selected"
                default-expand-all
              />
            </q-scroll-area>
          </q-card-section>
        </q-card>
        <!-- 左侧表 -->
        <q-card class="card1-2 fl no-shadow">
          <div class="left-top bg-teal-1">
            <!-- 左侧表的第一行按钮 -->
            <q-card-section>
              <q-input
                outlined
                v-model="search"
                :dense="true"
                placeholder="请输入单位名称"
                class="input mr1 fl"
                bg-color="teal-2"
                color="teal-6"
                type="search"
              >
                <template v-slot:before>
                  <div class="text-subtitle1 text-weight-bolder">
                    单位名称：
                  </div>
                </template>
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-select
                class="select mr1 fl"
                color="teal-6"
                bg-color="teal-2"
                outlined
                v-model="optionModel"
                :options="options"
                :dense="optionDense"
                :options-dense="denseOpts"
              >
                <template v-slot:before>
                  <div class="text-subtitle1 text-weight-bolder">
                    所在区域：
                  </div>
                </template>
              </q-select>
              <q-select
                class="select mr1 fl"
                color="teal-6"
                bg-color="teal-2"
                outlined
                v-model="optionModel"
                :options="options"
                :dense="optionDense"
                :options-dense="denseOpts"
              >
                <template v-slot:before>
                  <div class="text-subtitle1 text-weight-bolder">
                    所在区域：
                  </div>
                </template>
              </q-select>
              <q-select
                :options-cover="true"
                class="select mr1 fl"
                color="teal-6"
                bg-color="teal-2"
                outlined
                v-model="optionModel"
                :options="options"
                :dense="optionDense"
                :options-dense="denseOpts"
              >
                <template v-slot:before>
                  <div class="text-subtitle1 text-weight-bolder">
                    所在区域：
                  </div>
                </template>
              </q-select>
              <q-btn
                class="search fl"
                color="teal-6"
                icon="search"
                label="查询"
              />
            </q-card-section>
            <!-- 左侧表的第二行按钮 -->
            <q-card-section class="mt2">
              <q-btn
                class="operation fr"
                color="teal-6"
                icon="delete"
                label="删除"
              />
              <q-btn
                class="operation fr mr1"
                color="teal-6"
                icon="add"
                label="新建"
              />
              <q-input
                outlined
                v-model="search"
                :dense="true"
                placeholder="请输入分组"
                class="input mr1 fr"
                bg-color="teal-2"
                color="teal-6"
                type="search"
              >
                <template v-slot:before>
                  <div class="text-subtitle1 text-weight-bolder">
                    分组名称：
                  </div>
                </template>
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-card-section>
          </div>
          <!-- 左侧表的穿梭框 -->
          <q-card-section class="transfer" style="padding: 0px">
            <div class="left-table">
              <q-table
                :data="leftTableData"
                :columns="leftColumns"
                row-key="name"
                :selected-rows-label="getLeftSelectedString"
                class="my-sticky-header-table"
                separator="cell"
                card-style="height:350px;"
                no-data-label="暂无数据"
                rows-per-page-label="每页显示"
                title="分组内单位"
                title-class="text-subtitle2 text-weight-bolder text-grey-1 "
                table-header-class="bg-teal-6 text-grey-1"
                selection="multiple"
                :selected.sync="leftSelected"
              >
              </q-table>
            </div>
            <div class="content">
              <div class="shuttle-button">
                <q-btn
                  color="teal"
                  label=">>"
                  round
                  @click="push"
                  size="10px"
                />
                <q-btn
                  color="teal"
                  label="<<"
                  round
                  @click="del"
                  size="10px"
                  class="mt2"
                />
              </div>
            </div>
            <div class="right-table">
              <q-table
                :data="rightTableData"
                :selected-rows-label="getRightSelectedString"
                rows-per-page-label="每页显示"
                :columns="rightColumns"
                row-key="name"
                class="my-sticky-header-table"
                separator="cell"
                card-style="height:350px;"
                no-data-label="暂无数据"
                title="分组外单位"
                title-class="text-subtitle2 text-weight-bolder text-grey-1 "
                table-header-class="bg-teal-6 text-grey-1"
                selection="multiple"
                :selected.sync="rightSelected"
              >
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
    <!-- 右侧内容 -->
    <q-card class="card2 fl">
      <q-card-section class="text-subtitle2 text-weight-bold">
        <q-icon name="style" style="font-size: 2em" color="teal-6" />相关功能
      </q-card-section>
      <q-separator inset size="2px" color="teal-6" />
      <q-card-section>
        <div v-for="index in 5" :key="index">
          <q-item
            clickable
            v-ripple
            style="width: 50px; padding: 0px"
            class="fl mr1"
          >
            <q-item-section side class="text-caption text-weight-bold">
              <q-avatar
                rounded
                size="45px"
                font-size="30px"
                color="teal"
                text-color="white"
                icon="directions"
              />功能{{ index }}
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>
      <div class="text-subtitle2 text-weight-bold fl" style="width: 100%">
        <q-card-section>
          <q-icon name="style" style="font-size: 2em" color="teal-6" />功能说明
        </q-card-section>
        <q-separator inset size="2px" color="teal-6" />
      </div>
      <q-card-section>
        <q-scroll-area class="fr scroll">
          <q-item clickable v-ripple v-for="index in 5" :key="index">
            <q-item-section side class="text-caption text-weight-bold">
              {{ index }}.旋转器用于向用户显示当前正在及时进行的过程。
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </div>
</template>
<script >
export default {
  data() {
    return {
      leftTableData: [], //左侧数据
      rightTableData: [], //右侧数据
      leftSelected: [], //左侧选择
      rightSelected: [], //右侧选择
      functions: [], //相关功能
      //左侧属性设计
      leftColumns: [
        {
          name: "index",
          label: "序号",
          field: (row) => row.index + 1,
        },
        {
          name: "name",
          required: true,
          label: "单位名称",
          align: "center",
          field: "name",
          sortable: true,
        },
        {
          name: "region",
          required: true,
          label: "所在区域",
          align: "center",
          field: "region",
          sortable: true,
        },
        {
          name: "industry",
          required: true,
          label: "所属行业",
          align: "center",
          field: "industry",
          sortable: true,
        },
        {
          name: "state",
          required: true,
          label: "经营状态",
          align: "center",
          field: "state",
          sortable: true,
        },
      ],
      //右侧属性设计
      rightColumns: [],
      optionModel: null,
      options: ["区域1", "区域2", "区域3", "区域4", "区域5"],
      optionDense: true,
      denseOpts: false,
      //树对象
      simple: [
        {
          label: "文件1",
          icon: "photo",
          children: [
            {
              label: "文件1-1",
              icon: "photo",
              children: [{ label: "文件1-1-1" }, { label: "文件1-1-2" }],
            },
            {
              label: "文件1-2",
              icon: "photo",
              children: [{ label: "文件1-2-1" }, { label: "文件1-2-2" }],
            },
            {
              label: "文件2",
              icon: "photo",
              children: [
                {
                  label: "文件2-1",
                },
                { label: "文件2-2" },
                { label: "文件2-3" },
              ],
            },
          ],
        },
      ],
      selected: "文件1-1-1", //默认选中
      search: "", //搜索
    };
  },
  mounted() {
    //挂载
    this.getData();
    this.rightColumns = this.leftColumns;
  },
  methods: {
    del() {
      for (var i = 0; i < this.rightSelected.length; i++) {
        this.leftTableData.push(this.rightSelected[i]);
        this.rightTableData = this.rightTableData.filter(
          (item) => item.index != this.rightSelected[i].index
        );
      }
      // 清空选中
      this.rightSelected.splice(0, this.rightSelected.length);
      this.sort(this.leftTableData, this.rightTableData);
    },
    push() {
      for (var i = 0; i < this.leftSelected.length; i++) {
        this.rightTableData.push(this.leftSelected[i]);
        this.leftTableData = this.leftTableData.filter(
          (item) => item.index != this.leftSelected[i].index
        );
      }
      // 清空选中
      this.leftSelected.splice(0, this.leftSelected.length);
      this.sort(this.leftTableData, this.rightTableData);
    },
    //左侧选中
    getLeftSelectedString() {
      return `选中 ${this.leftSelected.length} 条`;
    },
    //右侧选中
    getRightSelectedString() {
      return `选中 ${this.rightSelected.length} 条`;
    },
    //重新设置序号
    sort(ldata, rdata) {
      //重排左序号
      let lda = [];
      for (var i = 0; i < ldata.length; i++) {
        let lobject = {
          index: i,
          name: ldata[i].name,
          region: ldata[i].region,
          industry: ldata[i].industry,
          state: ldata[i].state,
        };
        lda.push(lobject);
      }
      this.leftTableData = lda;
      //重排右序号
      let rda = [];
      for (var i = 0; i < rdata.length; i++) {
        let robject = {
          index: i,
          name: rdata[i].name,
          region: rdata[i].region,
          industry: rdata[i].industry,
          state: rdata[i].state,
        };
        rda.push(robject);
      }
      this.rightTableData = rda;
    },
    //获取数据
    getData() {
      // 获取左侧数据
      let ldata = require("../static/data.json").leftTableData;
      let lda = [];
      for (var i = 0; i < ldata.length; i++) {
        let lobject = {
          index: i,
          name: ldata[i].name,
          region: ldata[i].region,
          industry: ldata[i].industry,
          state: ldata[i].state,
        };
        lda.push(lobject);
      }
      this.leftTableData = lda;
      // 获取右侧数据
      let rdata = require("../static/data.json").rightTableData;
      let rda = [];
      for (var i = 0; i < rdata.length; i++) {
        let robject = {
          index: i,
          name: rdata[i].name,
          region: rdata[i].region,
          industry: rdata[i].industry,
          state: rdata[i].state,
        };
        rda.push(robject);
      }
      this.rightTableData = rda;
    },
  },
};
</script>
<style lang="sass">
.scroll
  height: 200px
  width: 100%
.left-top
  height: 120px
  margin-bottom: 10px
//穿梭按钮
.shuttle-button
  margin: auto
//穿梭内容
.transfer
  width: 100%
  display: flex
  justify-content: center
  align-items: center
//左侧穿梭框
.left-table
  width: 48%
//右侧穿梭框
.right-table
  width: 48%
//按钮
.content
  width: 4%
  height: 350px
  display: flex
// 表格样式
.my-sticky-header-table
  height: 310px

  .q-table__top,
  thead tr:first-child th
    background-color: #009688
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  &.q-table--loading thead tr:last-child th
    top: 48px
// 操作
.operation
  width: 10%
.search
  width: 10%
  margin-left: 8%
.select
  width: 18%
.input
  width: 24%
.card1
  width: 88%
  height: 580px
.card1-1
  width: 15%
.card1-2
  width: 84%
.card2
  width: 10%
  height: 580px
.fl
  float: left
.fr
  float: right
.mt2
  margin-top: 2%
.mr1
  margin-right: 1%
</style>