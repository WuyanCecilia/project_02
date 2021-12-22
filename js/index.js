$(function() {
	// 预先学习内容
	// var todolist = [{
	// 	title: '我今天吃了八个馒头',
	// 	done: false,
	// 	}, {
	// 		title: '我今天学习jQuery',
	// 		done: false,
	// 	}];
	// 向本地存储内存入数据
	// 本地存储里面只能存储字符串的数据格式 把我们的数组对象转换为字符串格式 JSON.stringify()
	// localStorage.setItem("todo", todolist);		该方法无法正确存入
	// localStorage.setItem("todo", JSON.stringify(todolist));		 string格式
	// var data = localStorage.getItem("todo");
	// console.log(typeof data);
	// console.log(data[0].title);		字符串没有title属性
	// 获取本地存储的数据 我们需要把里面的字符串数据转换为对象格式 JSON.parse()
	// data = JSON.parse(data);
	// console.log(data);
	// console.log(data[0].title);
	
	load();
	// 1. 按下回车 把完整数据存储到本地存储里面
	// 存储的数据格式 var todolist = [{title: "xxx", done: false}]
	$("#title").on("keydown", function(event) {
		if(event.keyCode === 13) {
			if($(this).val() === "") {
				alert("请输入您要的操作");
			} else {
				// 先读取本地存储原来的数据
				var local = getDate();
				console.log(local);
				// 把local数组进行更新数据 把最新的数据追加给local数组
				local.push({title: $(this).val(), done: false});
				// 把这个数组local存储给本地存储
				saveData(local);
				// 2. toDoList本地存储数据渲染加载到页面
				load();
				// 当按下回车键后 输入框里面的内容清空
				$(this).val("");
			}
		}
	});
	// 3. toDoList删除操作 事件委托
	$("ol, ul").on("click", "a", function() {
		// 先获取本地存储
		var data = getDate();
		console.log(data);
		// 修改数据	attr()获取自定义的属性
		var index = $(this).attr("id");
		console.log(index);
		data.splice(index, 1);
		// 保存到本地存储
		saveData(data);
		// 重新渲染页面
		load();
	})
	// 4. toDoList正在进行和已完成选项操作
	$("ol, ul").on("click", "input", function() {
		// 先获取本地存储的数据
		var data = getDate();
		// 修改数据	拿到我当前的兄弟 a 的索引号
		var index = $(this).siblings("a").attr("id");
		console.log(index);
		// data[?].done = ?
		data[index].done = $(this).prop("checked");
		console.log(data);
		// 保存到本地存储
		saveData(data);
		// 重新渲染页面
		load();
	})
	// 读取本地存储的数据函数
	function getDate() {
		var data = localStorage.getItem("todolist");
		if(data !== null) {
			// 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
			return JSON.parse(data);
		} else return [];
	}
	// 更新保存本地存储的数据函数
	function saveData(data) {
		localStorage.setItem("todolist", JSON.stringify(data));
	}
	// 渲染加载数据函数
	function load() {
		// 读取本地存储的数据
		var data = getDate();
		console.log(data);
		// 遍历之前先要清空ol里面的元素内容
		$("ol, ul").empty();
		// 正在进行的个数
		var todoCount = 0;
		// 已经完成的个数
		var doneCount = 0;
		// 遍历这个数据
		$.each(data, function(i, n) {
			console.log(n);
			if(n.done) {
				$("ul").prepend(
				"<li><input type='checkbox' checked='checked' /> <p>"+  n.title +"</p> <a href='javascript:;' id="+ i +">●</a></li>");
				doneCount++;
			} else {
				$("ol").prepend(
				"<li><input type='checkbox' /> <p>"+  n.title +"</p> <a href='javascript:;' id="+ i +">⚪</a></li>");
				todoCount++;
			}
		});
		$("#todocount").text(todoCount);
		$("#donecount").text(doneCount);
	}
})