# switch-button

iOS和Android风格的切换按钮

### 仅使用样式

仅仅使用样式，意味着你只需要将CSS文件引入，并编写相应的HTML代码。

```html

<!--引入css样式文件-->
<link rel="stylesheet" href="switch-button.css">

```

```html

<div class="switch-btn">
    <input type="checkbox" name="switch">
    <label></label>
</div>

```

***

### 使用JavaScript

使用JavaScript，你可以在按钮状态将要切换或状态切换完成后做一些事情。

```html

<!--引入css文件-->
<link rel="stylesheet" href="switch-button.css">
<!--引入JS文件-->
<script src="switch-button.js"></script>

<!--建立HTML结构-->
<div class="switch-btn">
    <input type="checkbox" name="switch" disabled>
    <label></label>
</div>

<!--JS-->
<script>
    // 获取元素
    var switchBtns = document.querySelectorAll('.switch-btn');
    // 调用
    switchBtn({
        // 需要监听状态的switch button
        elements: switchBtns,
        // 按钮即将被打开时需要执行的操作
        // this已绑定至CheckBox
        // 返回true将允许按钮被打开，changed动作将被执行
        // 返回false将禁止按钮被打开，且changed动作不会被执行
        on: function () {
            console.log(this, 'on');
            return true;
        },
        // 按钮即将被关闭时需要执行的操作
        // this已绑定至CheckBox
        // 返回true将允许按钮被关闭，changed动作将被执行
        // 返回false将禁止按钮被关闭，且changed动作不会被执行
        off: function () {
            console.log(this, 'off');
            return true;
        },
        // 按钮状态发生更改后需要执行的操作
        // this已绑定至CheckBox
        // 返回true将允许此次更改
        // 返回false会将按钮状态切换为更改之前的状态
        // 返回false时请注意：按钮状态是在切换后被还原为原状态，
        // 而不是阻止了按钮的切换操作，
        // 实质上按钮已经完成了一次切换动作
        changed: function () {
            console.log(this, 'changed');
            return true;
        }
    });
</script>

```

***

### 使用jQuery

待完成

***

### 更多样式

##### switch-btn (默认)

```html

<div class="switch-btn">
    <input type="checkbox" name="switch">
    <label></label>
</div>

```

##### slide

```html

<div class="switch-btn slide">
    <input type="checkbox" name="switch">
    <label></label>
</div>

```

#### inside

```html

<div class="switch-btn inside">
    <input type="checkbox" name="switch">
    <label></label>
</div>

```

#### dynamic

```html

<div class="switch-btn dynamic">
    <input type="checkbox" name="switch">
    <label></label>
</div>

```
