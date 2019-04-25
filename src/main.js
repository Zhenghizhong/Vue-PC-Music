// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import axios from 'axios'
import {Carousel,CarouselItem,Loading} from "element-ui";
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Loading);
Vue.use(Vuex);


/* eslint-disable no-new */
var songList={}
var singers=[]
var music=[]
axios.get("../static/data.json")
  .then((response)=>{
    // 将歌单数据保存到songList
    console.log("给劲嗷，铁汁");
    songList=response.data.SongLists;
    singers=response.data.Singer.map(singer=>{
      return {
        name:singer.name,
        id:singer.id,
        photo:require("./assets/images/singer/"+singer.name+".jpg"),
        photo1:require("./assets/images/SingerInfoImg/"+singer.name+".jpg"),
        introduce:singer.introduce,
        fans:singer.fans
      }
    });
    music=response.data.Music;
    const state={
      showHeader:true,
      Lists:songList,
      Singers:singers,
      Music:music
    }
    const getters={
      isShow(state) {
        return state.showHeader;
      }
    }
    const mutations={
      hide(state){
        state.showHeader=false;
      }
    }
    const actions={
      hideHeader(context){
        context.commit('hide');
      }
    }
    const store=new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
    });
  })
  .catch((error)=>{
    console.log(error);
  })



