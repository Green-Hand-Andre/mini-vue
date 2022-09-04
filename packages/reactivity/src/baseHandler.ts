
import {track,trigger}from './effect'
export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}
export const mutabHandles = {
    get(target,key,receiver){
        debugger
        if(key === ReactiveFlags.IS_REACTIVE){
            return true;
        }
        track(target,'get',key)
        // return target[key]
        return Reflect.get(target,key,receiver)

    },
    set(target,key,value,receiver){
        // target[key] = value;
        let oldValue = target[key];
        let result = Reflect.set(target,key,value,receiver)
        if(oldValue != result){
            trigger(target,'set',key,value,oldValue)
        }
        return result

    }
}

// 一个对象对应某个属性，对应多个effect
// weakmap{对象：map{属性：set}}