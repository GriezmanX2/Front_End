## 前端文件操作与文件上传
### 前端上传文件方法
1. 二进制blob传输(formData)
2. base64传输(转为base64传输)

### 相关对象
1. files: 通过input标签获取的文件对象。
2. blob: 不可变的二进制内容，包含很多文件操作方法。
3. formData: 用于向后端传输的对象（blob后端无法识别，不能用于后端传输）。
4. fileReader: 多用于把文件读取为某种形式，如base64、text文本。
