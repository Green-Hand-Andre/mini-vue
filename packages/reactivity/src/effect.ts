export let activeEffect = undefined;

class ReactiveRffect{
    // 这里表示实例上新增了active属性
   public active = true;//这个effect默认是激活状态
   public parent = null;
   public deps = [];

   
    constructor(public fn){//用户传递的参数也会放到this上

    }
    run(){
        debugger
        if(!this.active){
            this.fn()//如果非激活，只需要执行函数不需要进行依赖收集
        }

        // 核心就是将当前的effect和稍后渲染的属性关联在一起
        try{
            this.parent = activeEffect
            activeEffect = this;
            return this.fn();

        }finally{
            activeEffect = this.parent;
            this.parent = null;
        }

    }
}


export function effect(fn){
    debugger
    // fn可以根据状态变化重新执行
    const _effect = new ReactiveRffect(fn);
    _effect.run();//默认先执行一次

}

const targetMap = new WeakMap();
export function track(target,type,key){
    debugger
    if(!activeEffect) return;
    let depsMap = targetMap.get(target);
    if(!depsMap){
        targetMap.set(target,(depsMap=new Map()))
    }
    let dep = depsMap.get(key);
    if(!dep){
        depsMap.set(key,(dep=new Set()))
    }
    let shouldTrack = !dep.has(activeEffect)
    if(shouldTrack){
        debugger
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
    }

}
// 单向指的是属性记录了effect方向记录，应该让effect也记录他被那些属性收集过，这样做的好处是为了可以清理

export function trigger(target,type,key,value,oldValue){
    const depsMap = targetMap.get(target);
    if(!depsMap) return;
   const effects =  depsMap.get(key)
   effects && effects.forEach(effect => {
    effect.run()
    
   });
}