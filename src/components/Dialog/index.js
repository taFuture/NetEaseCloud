import Vue from 'vue'
import Dialog from './Dialog.vue'
// console.log(Dialog.vue);
// 创建一个Dialog的vue的子类
export default function(option) {
    return new Promise(function(resolve,reject) {
        const VueDialog = Vue.extend(Dialog)
        const instanceOfDialog = new VueDialog({
            data() {
                return {
                    title:option.title,
                    msg:option.msg,
                    visible:true
                }
            },
            methods:{resolve,reject},
        });
        instanceOfDialog.$mount();
        document.querySelector('body').appendChild(instanceOfDialog.$el)
    })
}

