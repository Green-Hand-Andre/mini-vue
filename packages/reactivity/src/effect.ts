class ReactiveRffect{
    active = true;//这个effect默认是激活状态
    
   
    constructor(public fn){

    }
    run(){

    }
}


export function effect(fn){
    // fn可以根据状态变化重新执行
    const _effect = new ReactiveRffect(fn);
    _effect.run();//默认先执行一次

}