const args = require("minimist")(process.argv.slice(2));
console.log(args)
const { build } = require("esbuild");
const {resolve} = require('path');
// minimist是用来解析命令行参数的

const target = args._[0] || 'reactivity';

const format = args.f || 'global';

const pkg = require(resolve(__dirname,`../packages/${target}/package.json`));


// iife立即执行函数
// cjs node中的模块
// esm浏览器中的esmodul模块
const outputFormat = format.startsWith('global')? 'iife':format === 'cjs'?'cjs':'esm';
const outfile = resolve(__dirname,`../packages/${target}/dist/${target}.${format}.js`)

build({
    entryPoints:[resolve(__dirname,`../packages/${target}/src/index.ts`)],
    outfile,
    bundle:true,//把所有的包全部达到一起
    sourcemap:true,
    format:outputFormat,
    globalName:pkg.buildOptions?.name,
    platform:format === 'cjs'?'node':'browser',
    watch:{
        onRebuild(error){
            if(!error) console.log('rebuild----')
        }
    }

    
}).catch(()=>{
    console.log('watch------')
})