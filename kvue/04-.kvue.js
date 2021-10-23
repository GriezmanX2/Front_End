// KVue
// 1.对data做响应式处理
// 2.编译模板
class KVue{
    constructor(options){
        this.$options = options;
        this.$data = options.data;

        // data响应式处理
        observe(this.$data);

        proxy(this);

        new Compile(this.$options.el, this);
    }
}
// 根据传入value的类型做相应的响应式处理
class Observer{
    constructor(value){
        this.value = value;
        if(Array.isArray(value)){

        }else{
            this.walk(value);
        }
    }
    walk(obj){
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        });
    }
}

// 解析模板
// 1.处理插值
// 2.处理指令和事件
// 3.以上两者初始化和更新
class Compile{
    constructor(el,vm){
        this.$vm = vm;
        this.$el = document.querySelector(el);

        if(this.$el){
            this.compile(this.$el);
        }
    }

    compile(el){
        // 遍历el子节点，判断其类型并做相应处理
        const childNodes = el.childNodes;
        childNodes.forEach(node => {
            if(node.nodeType === 1){
                // 元素节点
                console.log('元素节点: ', node.nodeName);

                // 处理指令和事件
                const attrs = node.attributes;
                Array.from(attrs).forEach(attr => {
                    const attrName = attr.name;
                    const exp = attr.value;
                    if(attrName.startsWith('k-')){
                        const dir = attrName.substring(2);
                        this[dir] && this[dir](node, exp);
                    }
                })
            }else if(this.isInter(node)){
                // 文本节点
                console.log('文本节点: ', node.textContent);
                this.compileText(node);
            }

            // 递归子节点，如果存在
            if(node.childNodes){
                this.compile(node);
            }
        });
    }

    // 是否插值表达式
    isInter(node){
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    update(node, exp, dir){
        // 1.初始化
        const fn = this[dir + 'Updater'];
        fn && fn(node, this.$vm[exp]);

        // 2.更新
        new Watcher(this.$vm, exp, val => {
            fn && fn(node, val);
        });
    }

    // 编译文本
    compileText(node){
        this.update(node, RegExp.$1, 'text');
    }

    text(node, exp){
        // node.textContent = this.$vm[exp];

        this.update(node, exp, 'text');
    }

    textUpdater(node, exp){
        node.textContent = exp;
    }

    html(node, exp){
        // node.innerHTML = exp;

        this.update(node, exp, 'html');
    }

    htmlUpdater(node, exp){
        node.innerHTML = exp;
    }
}
const watchers = [];
// 监听器：负责更新以来
class Watcher {
    constructor(vm, key, updateFn){
        this.vm = vm;
        this.key = key;
        this.updateFn = updateFn;

        watchers.push(this);
    }

    // 未来被Dep调用
    update(){
        // 执行实际的更新操作
        this.updateFn.call(this.vm, this.vm[this.key]);
    }
}
function defineReactive(obj, key, val) {
    observe(val);

    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key , ':', val);
            return val;
        },
        set(newVal) {
            console.log('set', key);

            // 保证如果newVal是对象，再次对其做响应式处理
            observe(newVal);
            if (newVal !== val) { 
                val = newVal;
            }

            watchers.forEach(w => w.update());
        }
    })
}

function observe(obj){
    if(typeof obj !== 'object' || obj === null) return;
    
    // Object.keys(obj).forEach(key => {
    //     defineReactive(obj, key, obj[key]);
    // });
    new Observer(obj);
}

function proxy(vm){
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get(){
                return vm.$data[key];
            },
            set(v){
                vm.$data[key] = v;
            }
        })
    });
}