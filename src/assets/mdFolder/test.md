<h1>基本写法</h1>

```
uniCloud.callFunction({
					name:"login",
					data:{
						name:"liming"
					}
					success(res) {
						console.log(res);
					}
				})
```

```
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// content包含了调用信息和运行状态,获取每次调用的上下文
	console.log('event : ', event)
	// 获取数据库中的表
	const collection = db.collection('user')
	//返回数据给客户端
	return {
		code: 200,
		msg: event.name + event.age,
		context
	}
};
console.log("数据插入");
console.log("这里如果是空的,请注意顶部的async,记得加await", JSON.stringify(res));
```

<h1>获取表的数据并过滤</h1>

```
'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	// 获取label表的数据
	// field为过滤返回的字段false表该字段不返回,true表示只返回该字段
	let list = await db.collection("article").field({
		content: false
	}).get()
	return {
		code: 200,
		msg: "获取数据成功",
		data: list.data,
	}
};
```

<h1>Add</h1>

```
let res = collection.add({
		name: 'uni-app'
	})
	// 批量增加
	let res = await collection.add([
		{
			name: 'Vue'
		},
		{
			name: 'React',
			type: "前端"
		}
	])
```

<h1>Delete</h1>

```
let res = await collection.doc('c4747cd45f87f5720012637a66969682').remove()
```

<h1>update</h1>

```
let res = await collection.doc('c4747cd45f87f5720012637b7903d90f').update({
		name: "html"
})
let res = await collection.doc('c4747cd45f87f5720012637b7903d90f').set({
		name: "vue",
		type:"前端"
})
```

```
updata 更新数组，使用command运算符
	const dbcmd = db.command
	await db.collection("user").doc(user_id).update({(增加)
		article_likes_ids: dbcmd.addToSet(article_id)
	})
	await db.collection("user").doc(user_id).update({(删除)
		article_likes_ids: dbcmd.pull(article_id)
	})
```

<strong>Q:update和set的区别</strong>

<strong>A:update只能更新存在的记录,set如果记录存在就更新,反之添加</strong>

<h1>Retrieve</h1>

```
let res = await collection.doc('d9ea4cfd5f87a1dd0014b97f2209c05e').get()
let res = await collection.where({
		name: 'vue'
	}).get()
let res = await collection.where({
		name:event.name
	}).get()
```

<h1>上传图片</h1>

```
uni.chooseImage({
					count:1,
					success(res) {
						const tempFilePath = res.tempFilePaths[0]
						uniCloud.uploadFile({
							filePath:tempFilePath,
							success(res) {
								console.log(res);
							},
							fail(err) {
								console.log(err);
							}
						})
						console.log(tempFilePath);
					},
					fail(err) {
						console.log(err);
					}
				})
```

<h1>显示上传的图片</h1>

```
open() {
				let self = this
				uni.chooseImage({
					count: 1,
					success: res => {
						const tempFilePath = res.tempFilePaths[0]
						const tempFileName = res.tempFiles[0].name
						uniCloud.uploadFile({
							filePath: tempFilePath,
							cloudPath: tempFileName,
							success(res) {
								uniCloud.getTempFileURL({
									fileList: [res.fileID],
									success(res) {
										self.src = res.fileList[0].tempFileURL
										console.log("src:",self.src);
									},
									fail(err) {
										console.log(err);
									},
								})// getTempFileURL
							},// uploadFile success
							fail(err) {
								console.log(err);
							}
						})// uploadFile
					},// chooseImage success
					fail(err) {
						console.log(err);
					}
				})// chooseImage
			} //open
```

<h1>删除上传的图片</h1>

```
uniCloud.deleteFile({
					fileList:[要删除的文件 ID 组成的数组],
					success(res) {
						console.log("删除成功",res);
					},fail(err) {
						console.log(err);
					}
				})
```

<h1>聚合</h1>

```
// 聚合 : 更精细化的去处理数据 求和,分组,指定哪些字段
	// match表示筛选符合条件的字段,project和field功能一致
	const list = await db.collection('article').aggregate().match({
		classify: name
	}).project({
		content: 0
	}).end()
```

<h1>命令列表</h1>

<table border="1">
	<tr style="background-color:rgb(64, 158, 255);">
    	<th>命令</th>
        <th>作用</th>
    </tr>
    <tr>
    	<td>const db = uniCloud.database()</td>
        <td><strong>database()</strong>取得数据库的对象</td>
    </tr>
    <tr>
    	<td>db.collection("label").get()</td>
        <td><strong>collection("label").get()</strong>取得指定表的数据</td>
    </tr>
    <tr>
    	<td>db.collection("user").doc(user_id).get()</td>
        <td><strong>.doc(user_id)</strong>选择获取表中指定字段的数据</td>
    </tr>
     <tr>
    	<td>db.collection('article').aggregate()</td>
        <td><strong>aggregate()</strong>聚合操作</td>
    </tr>
    <tr>
    	<td>const dbcmd = db.command</td>
        <td><strong>command</strong>操作符</td>
    </tr>
    <tr>
    	<td>dbcmd.pull(article_id) && dbcmd.addToSet(article_id)</td>
        <td><strong>pull addToSet</strong>删除数据 和 增加数据</td>
    </tr>
    <tr>
    	<td>db.collection("user").doc(user_id).update({
		article_likes_ids: dbcmd.pull(article_id) || dbcmd.addToSet(article_id)
	})</td>
        <td><strong>update()</strong>对指定数据进行更新</td>
    </tr>
     <tr>
    	<td>.match({classify: name})</td>
        <td><strong>match()</strong>筛选符合条件的字段</td>
    </tr>
     <tr>
    	<td>.match({
            classify: name
           })</td>
        <td><strong>match()</strong>筛选符合条件的字段</td>
    </tr>
     <tr>
    	<td>project({
			content: 0
		}</td>
        <td><strong>project()</strong>过滤返回的字段0为不返回</td>
    </tr>
    <tr>
    	<td>field({
	 	content: false
	 })</td>
        <td><strong>field()</strong>过滤返回的字段false表该字段不返回,true表示只返回该字段</td>
    </tr>
    <tr>
    	<td>.skip(pageSize * (page - 1))</td>
        <td><strong>skip()</strong>要跳过多少数据</td>
    </tr>
    <tr>
    	<td>limit()</td>
        <td><strong>limit()</strong>为限制返回的数据量</td>
    </tr>
</table>

