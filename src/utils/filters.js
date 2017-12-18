import Vue from 'vue';
import utils from '@/utils'

// 数字转化为千分位
Vue.filter('toThousands', val => utils.toThousands(val));