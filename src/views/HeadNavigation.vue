<template>
  <div>
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-teal-5">

        <q-toolbar class="bg-teal-6">
            <!-- 工具栏图标 -->
          <q-avatar size="50px">
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          <!-- 工具栏标题 -->
          <q-toolbar-title>Quasar</q-toolbar-title>
          {{nowTime}}欢迎您~{{userName}}
          <!-- 退出按钮 -->
          <div class="q-pa-md">
            <q-btn label="退出" icon="power"/>
          </div>
        </q-toolbar>

        <!-- 导航条 -->
        <div >
          <q-btn-toggle
            v-model="selected"
            toggle-color="teal-1"
            toggle-text-color="teal-6"
            class="ml20"
            unelevated
            stretch
            color="teal-5"
            @click="toTurn"
            :options="option"
          />
        </div>
      </q-header>
      <!-- 页面内容 -->
    <q-page-container>
      <router-view />
    </q-page-container>

    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowTime:"",//进入时间
      userName:'管理员',//用户名
        option:[
              { label: '首页', value: '首页' },
              { label: '在线监测', value: '在线监测' },
              { label: '行业监管', value: '行业监管' },
              { label: '预警预测', value: '预警预测' },
              { label: '可视化管理', value: '可视化管理' },
              { label: '系统管理', value: '系统管理' },
            ],
      link: "inbox",
      drawer: false,
      selected: "首页",//默认选项
    };
  },
  mounted(){
			this.getTime();
		},
  methods: {
    onItemClick() {
    },
    //获取访问时间
    getTime(){
			let yy = new Date().getFullYear();
		  let mm = new Date().getMonth()+1;
		  let dd = new Date().getDate();
		  let hh = new Date().getHours();
		  let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
		  let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
		  this.nowTime = yy+'年'+mm+'月'+dd+'日 '+hh+':'+mf+':'+ss+'  ';
			},
    toTurn() {
      if (this.selected.includes("首页")) {
        this.$router.push("/home").catch((err) => {
        });
      } else if (this.selected.includes("在线监测")) {
        this.$router.push("/onlineMonitoring").catch((err) => {
          console.log("输出报错", err);
        });
      } else if (this.selected.includes("行业监管")) {
          window.localStorage.setItem('name',this.selected);
        this.$router.push("/industryRegulationNavigation").catch((err) => {
          console.log("输出报错", err);
        });
      }else if (this.selected.includes("预警预测")) {
        this.$router.push("/forecastWarning").catch((err) => {
          console.log("输出报错", err);
        });
      }else if (this.selected.includes("可视化管理")) {
        this.$router.push("/visualAnalysis").catch((err) => {
          console.log("输出报错", err);
        });
      }
       else {
        this.$router.push("/systemManagement").catch((err) => {
          console.log("输出报错", err);
        });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.ml20
    margin-left: 5%
</style>
