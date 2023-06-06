# 数据结构与算法

1. 常见的数据结构
  数组Array
  栈Stack
  链表Linked List
  图Graph
  散列表Hash
  队列Queue
  堆Heap
  树Tree



  详细
    数组Array
      常用方法
        .concat() 返回一个合并之后的新数组，不会改变调用方法的数组
        .splice()
        .every()
        .some()
        .filter()
        .map()
        .forEaah()
        .reduce()
        .find()
        .findIndex()
        .findLast()
        .findLastINdex()
        .includes()

    栈Stack
      是一种运算受限的线性表，限定仅在表尾进行插入和删除操作的线性表，这一端被称为栈顶，相对的另一端成为栈底。
      特点： 后进先出（Last In First Out）

      ```js
        class Stack(){
          constructor(){
            this._items = []
          }

          push(item){
            this._items.push(item)
          }

          pop(){
            return this._items.pop()
          }

          peek(){
            return this._items[this._items.length - 1]
          }

          isEmpty()[
            return this._items.length === 0
          ]

          size(){
            return this._items.length
          }

          clear(){
            this._items = []
          }
        }
      ```

    队列Queue
      是一种特殊的线性表，特殊之处在于它只允许在表的前端进行删除操作，而在表的后端进行插入操作。表前端也被称为队头，表后端也被称为队尾。
      特点：先进先出（First In First Out）

      ```js
        class Queue(){
          constructor(){
            this._items = {}
            this._lowCount = 0
            this._count = 0
          }

          dequeue(){
            if(this.isEmpty()){
              return
            }

            let value = this._items[this._lowCount]
            delete this._items[this._lowCount]
            this._lowCount++
            return value
          }

          enqueue(item){
            this._items[this._lowCount] = item
            this._count++
          }

          front(){
            retutn this._items[this._lowCount]
          }

          isEmpty(){
            return this.size() === 0
          }

          size(){
            return this._items._count - this._items._lowCount
          }

          clear(){
            this._items = {}
            this._lowCount = 0
            this._count = 0
          }
        }
      ```

    链表Linked List
      是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实线的。链表由一系列结点组成，结点可以在运行时动态生成。每个结点包括两个部分，一个是存储数据元素的数据域，另一个是存储下下一个结点地址的指针域。
      特点： 1.插入、删除数据效率高（O(1)），只需要更改指针即可，随机访问效率低（O(n)），需要链表头至链表尾遍历。2.和数组相比，内存空间消耗更大，因为每个存储数据的结点都需要额外空间存储后继指针。


      ```js

        class Node(){
          constructor(ele){
            this.element = element;
            this.next = null;
          }
        }

        class LinkedList(){
          constructor(
            this.count = 0;
            this.head = null;
          )

          push(ele){
            const node = new Node(ele)

            if(this.head === null){
              this.head = node
            }else{
              let current = this.head

              while(current.next !== null){
                current = current.next
              }

              current.next = node
            }

            this.count++
          }

          removeAt(index){
            if(index < 0 || index >= this.count) return;
            let currrent = null;
            if(index === 0){
              current = this.head
              this.head = this.head.next;
            }else{
              let previous = null
              current = this.head
              for(let i = 0;i < index;i++){
                previous = current
                current = current.next
              }

              previous.next = current.next;
            }

            this.count--;

            return current.element;
          }

          getNodeAt(index){
            if(index < 0 || index >= this.count) return;

            let node = this.head

            for(let i = 0;i < index;i++){
              node = node.next;
            }

            return node;
          }

          equalFn(a,b){
            return JSON.stringify(a) === JSON.stringify(b);
          }

          indexOf(element){
            let current = this.head
            for(let i = 0;i < this.count;i++){
              if(this.equalFn(current.element,element)){
                return i;
              }else{
                current = current.next;
              }
            }

            return -1;
          }

          remove(element){
            const index = this.indexOf(element);
            return this.removeAt(index);
          }

          insert(element,index){
            if(index < 0 || index > this.count) return;

            const node = new Node(element);

            if(index === 0){
              node.next = this.head;
              this.head = node;
            }else{
              const previous = this.getNodeAt(index - 1);
              const current = previous.next;

              node.next = current;
              previous.next = node;
            }
          }

          ifEmpty(){
            return this.count === 0;
          }

          size(){
            return this.count;
          }

          getHead(){
            return this.head;
          }
        }
      ```
    集合Set

      ```js

        class Set(){
          constructor(){
            this._items = {}
          }

          add(){
            if(!this.has(element)){
              this._item[element] = element;
              return true;
            }
            return false;
          }

          has(element){
            return element in this.items;
          }

          delete(element){
            if(this.has(element)){
              delete this._items[element];
              return true
            }

            return false;
          }

          clear(){
            this._items = {}；
          }

          size(){
            return Object.keys(this._items).length;
          }

          values(){
            Object.values(this._items);
          }
        }
      ```

    树Tree
      1.二叉树 Binary Tree
        其中结点只能由两个子结点：一个为左结点，一个为右结点。
      2.二叉搜索树（Binary Search Tree）是二叉树中的一钟，但是只允许在左结点存储相比父结点更小的值，在右结点中存储更大或相等的值。

      树结构遍历
        中序遍历：一种以上行顺序访问BST所有结点的遍历方式，也就是以从小到大的顺序访问所有结点。中序遍历的一种应用就是对树进行排序操作。
        先序遍历：以优先于后代结点的顺序访问每个节点。先序遍历的一种应用是打印一个结构化文档。
        后序遍历：先访问结点的后代结点，再访问结点本身。后续遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。

      ToDo-> 查询、删除

      ```js

      const Compare = {
        lesser: -1,
        bigger: 1,
        equal: 0
      }

      class Node(key){
        constructor(key){
          this.key = key;
          this.left = null;
          this.right = null;
        }
      }

      class BinarySearchTree(){
        constructor(){
          this.root = null;
        }

        insert(key){
          if(this.root === null){
            this.root = new Node(key)
          }else{
            this.insertNode(this.root,key)
          }
        }

        insertNode(node,key){
          if(this.compareFn(key,node.key) ===  COmpare.less){
            if(node.left === null){
              node.left = new Node(key);
            }else{
              this.indertNode(node.left, key);
            }
          }else{
            if(node.right === null){
              node.right = new Node(key);
            }else{
              this.insertNode(node.right, key);
            }
          }
        }

        compareFn(a,b){
          if(a === b){
            return Compare.equal
          }else{
            return a < b ? Compare.less : Compare.bigger
          }
        }

        // 中序遍历
        inOrderMap(callback){
          this.inOrderMapNode(this.root)
        }

        inOrderMapNode(node,callback){
          if(node !== null){
            this.inOrderMapNode(node.left,callback)
            callback(node.key)
            this.inOrderMapNode(node.right,callback)
          }
        }

        // 先序遍历
        preOrderMap(callback){
          this.preOrderMapNode(this.root)
        }

        preOrderMapNode(node,callback){
          if(node !== null){
            callback(node.key)
            this.preOrderMapNode(node.left,callback)
            this.preOrderMapNode(node.right,callback)
          }
        }

        // 后序遍历
        postOrderMap(callback){
          this.postOrderMapNode(this.root)
        }

        postOrderMapNode(node,callback){
          if(node !== null){
            this.postOrderMapNode(node.left,callback)
            this.postOrderMapNode(node.right,callback)
            callback(node.key)
          }
        }
      }
      ```
2. 算法
  算法Algorithm是解决方案的准确而完整的描述，是一系列解决问题的清晰指令，代表着用系统的方法描述解决问题的策略机制。也就是说能够对一定规范的输入，在有限时间内获得所要求的输出。不同的算法可能需要消耗不同的时间、空间来完成同样的任务，所以一个算法的优劣可以用空间复杂度与时间复杂度来衡量。
  [算法动画演示](https://visualgo.net/zh)
  - 排序算法：
    1. 冒泡排序Bubble Sort： 比较所有相邻的两个项，如果第一个比第二个大，则交换他们。元素项向上移动至正确的位置，就好像气泡升至水平面一样。
      ···js
       function bubbleSort(array){
          const {length} = array
          for(let i = 0;i < length,i++){
            for(let j = 0;j < length - 1 - i;j++>){
              if(array[j] > array[i]){
                const temp = array[j];
                array[j] = array[i];
                array[i] = temp;
              }
            }
            if(i !== minIndex){
              const temp = array[i];
              array[i] = array[minIndex];
              array[minIndex] = temp;
            }
          }
       }
      ```

    2. 选择排序Selection Sort: 找到数据结构中的最小值并将其防止在第一位，接着找到第二小的值放在第二位，以此类推。
      ```js
        function selectionSort(array){
          const {length} = array;
          let minIndex;
          for(let i = 0;i < length - 1;i++){
            minIndex = i;
            for(let j = i;j < length;j++){
              if(array[j] < array[minIndex]){
                minIndex = j;
              }
            }
          }
        }
      ```

    3. 插入排序Insertion Sort:
      ```js
        function insertionSort(array){
          const {length} = array;
          let temp;
          for(let i = 0;i < length;i++){
            temp = array[i];
            let j = i;
            while(j > 0 && arr[j - 1] > temp){
              arr[j] = arr[j -1]
              j--;

            }

            arr[j] = temp;
          }
        }
      ```

      4. 归并排序Merge Sort: 是一种分而治之算法，其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并称较大的数组，直到最后只有一个排序完毕的大数组。
      ToDo -> 理解
        ```js
        ```

      5. 快速排序Quick Sort: 选取一个基准值,。
        ```js
          function quickSort(array){
            const {length} = array;

            if(length < 2){
              return array
            }

            let base = array[0];
            let minArr = array.slice(1).filter(item => item <= base);
            let maxArr = array.slice(1).filter(item => item > base);

            return minArr.concat(base).concat(maxArr);
          }
        ```

      6. 计数排序Counting Sort: 使用一个用来存储每个元素在原始数组中出现次数的临时数组。在所有元素都计数完成后，临时数组已排好序并可迭代以构建排序后的结果数组。

        ```js
          function countingSort(array){
            if(array.length < 2){
              return array
            }

            const maxValue = Math.max(...array);
            const counts = new Array(maxValue + 1);

            arr.forEach(item => {
              if(!counts[item]){
                counts[item] = 0;
              }
              counts[item]++;
            });

            let newArray = [];
            let sortIndex = 0;
            counts.forEach((item,index) => {
              while(item > 0){
                newArray[sortIndex++] = i;
                item --;
              }
            });

            return newArray;
          }
        ```

      7. 桶排序Bucket Sort: 属于分布式排序算法，它将元素分为不同的桶（较小的数组），再使用一个简单的排序算法，例如插入排序（用来排序小数组的较高效率算法），对每个桶进行排序。最后它将所有的桶合并成结果数组。
        ```js
          function bucketSort(array,bucketSize = 3){
            if(array.length < 2){
              return array;
            }

            const buckets = createBucket(array,bucketSize);

            return sortBuckets(buckets);
          }

          function createBucket(array,bucketSize){
            let minValue = Math.min(...array);
            let maxValue = Math.max(...array);

            const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
            const buckets = [];

            for(let i = 0;i < bucketCount;i++){
              const index = Math.floor((array[i] - minnValue) / bucketSize);
              buckets[index].push(array[i]);
            }

            return buckets;
          }

          function sortBuckets(array){
            const sortArray = [];

            for(let i = 0;i < array.lenght;i++){
              if(arr[i]){
                insertionSort(arr[i]);
                sortArr.push(...array[i]);
              }
            }
          }
        ```

      8. 基数排序Radix Sort:

        ```js
          function radixSort(array){
            const base = 10;
            let divider = 1;
            const maxVal = Math.max(...array);

            while(divider <= maxVal>){
              const buckets = [...Array(10)].map(() => {});
              for(let val of array){
                buckets[Math.floor(val / divider) % base].push(val);
              }
              array = [...buckets];
              divider*=base;
            }

            return array
          }
        ```
