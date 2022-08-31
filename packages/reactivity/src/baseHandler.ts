export const enum ReactiveFlags {
    IS_REACTIVE = '__v_isReactive'
}
export const mutabHandles = {
    get(target,key,receiver){
        if(key === ReactiveFlags.IS_REACTIVE){
            return true;
        }
        // return target[key]
        return Reflect.get(target,key,receiver)

    },
    set(target,key,value,receiver){
        // target[key] = value;
        return Reflect.set(target,key,value,receiver)

    }
}