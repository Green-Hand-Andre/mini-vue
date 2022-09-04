import { isObject } from "@vue/shared";
import {mutabHandles,ReactiveFlags} from './baseHandler';

// 将数据转换成响应式的数据，只能做对象的代理
const reactiveMap = new WeakMap();

export function reactive(target){
    debugger
    if(!isObject(target)){
        return;
    }

    if(target[ReactiveFlags.IS_REACTIVE]){
        return target;
    }


    let exisitingProxy = reactiveMap.get(target);
    if(exisitingProxy){
        return exisitingProxy;
    }


    // 没有重新定义属性，在取值调用get，赋值
    const proxy = new Proxy(target,mutabHandles);
    reactiveMap.set(target,proxy);
    return proxy;
    
}