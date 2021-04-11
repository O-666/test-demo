<template>
  <q-page>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="150"
      :breakpoint="500"
      bordered
      content-class="bg-white"
    >
      <q-scroll-area class="fit bg-grey-4">
        <q-list dense padding >
          <q-item>
            <q-item-label class="text-grey-8"
              ><q-icon name="inbox" size="25px" clickable='false' />设备库</q-item-label
            >
          </q-item>
          <q-item
            style="height: 15px"
            clickable
            v-ripple
            :to="'/industryRegulation'"
            :active="link === '传感器库'"
            @click="getItemName('传感器库')"
            active-class="my-menu-link"
          >
            <q-icon size="25px" />
            <q-item-section> 传感器库 </q-item-section>
          </q-item>

          <q-item
            clickable
            :to="'/infraredCodeLibrary'"
            :active="link === '红外码库'"
            @click="getItemName('红外码库')"
            active-class="my-menu-link"
          >
            <q-icon size="25px" />
            <q-item-section> 红外码库 </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>
               <q-toolbar class="bg-grey-2" elevated>
        <q-breadcrumbs  >
          <q-breadcrumbs-el :label="name" class="text-teal-8"/>
          <q-breadcrumbs-el
            :label="itemName"
          />
        </q-breadcrumbs>
        </q-toolbar>
    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      name:'',//一级导航名称
      link: "",//默认跳转
      itemName:'',//二级导航名称
      drawer: false,
      miniState: true,
      drawerLeft: false,
    };
  },
  mounted(){
    this.name=localStorage.getItem('name');
  },
  methods: {
    getItemName(itemName){
      this.itemName=itemName;
    }
  },
};
</script>
<style lang="sass" scoped>
.container
  padding: 0px!important
  margin-top: 1%
.my-menu-link
  color: #009688
  background: white
</style>
