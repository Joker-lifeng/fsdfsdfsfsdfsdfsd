//获得地图元素
var map = document.getElementById("map");
var btn = document.getElementById("btn");


//食物的部分
(
    function () {
      //保存食物的数组  用来遍历删除
      var foods = [];

      //定义食物的构造函数
      function Food(width, height, color,snake) {
        //食物的各种属性
        this.width = width || 40;
        this.height = height || 40;
        this.color = color || "green";
        this.x = 0;
        this.y = 0;
        //实体化食物位div元素出现在map中
        this.div = document.createElement("div");
      }

      //食物的原型方法
      Food.prototype.init = function (snake) {
   console.log("food init");
   
        //食物的初始化必定要删除之前的食物
        this.remove();


        //食物要给样式再出现在map中
        //把div添加到map中
        map.appendChild(this.div);
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        this.div.style.backgroundImage = "url(images/timg.jpg)";
        this.div.style.backgroundSize = "cover";
        this.div.style.position = "absolute";
        //随机化出现位置  调用获得随机数的函数
        //最小值是0，最大值是地图的宽/自己的宽，一个比列自己能沾多少格数
        //改变x 和 y  接来下可以用来判断食物是否被吃
     
        
        this.x = randomer.getRd(0, map.offsetWidth / this.div.offsetWidth);
        this.y = randomer.getRd(0, map.offsetHeight / this.div.offsetHeight);
        this.div.style.left = this.x * this.width + "px";
        this.div.style.top = this.y * this.height + "px";
        //foods数组中push新创建的食物
        console.log(this.x);
        
        foods.push(this.div);
        for(var i = 0 ; i < snake.body.length - 1; i ++){
          if (this.x === snake.body[i].x && this.y === snake.body[i].y) {
           console.log("食物和蛇重合了");
         
            this.init(snake);
          }
        }
        // console.log(snake);
      };
      //给食物添加移除方法
      Food.prototype.remove = function () {
        //想要移除food再map中，先遍历foods数组，再找到食物的父元素删除子元素 再从食物数组中删除
        for (var i = 0; i < foods.length; i++) {
          //遍历从foods数组的索引0开始，小于foods的lenght，也就是索引到最后一位索引值
          foods[i].parentNode.removeChild(foods[i]);   //找到这个i位的div的父亲把他删除
          foods.splice(i, 1);

        }
      };

      window.Food = Food;  //将构IIFF中的造函数暴露在全局window
    }
)();
//蛇部分
(
    function () {
      //定义一个保存蛇的数组，用来删除地图中的蛇
      var snakess = [];

      //定义蛇的构造函数
      function Snake(width, height) {
        //定义蛇的一些属性
        this.width = width || 40;
        this.height = height || 40;
        this.direction = "right";
        //蛇的坐标 很重要，用来判定是否和食物重合，每次init都要改变x   y

        //定义方向
        //定义一个蛇的身体body数组，保存初始状态，吃了食物不断变化
        this.body = [   //蛇头和身体x 坐标一样初始
          {x: 2, y: 2, color: "red", img: "url(images/123.jpg)"},  //蛇头
          {x: 1, y: 2, color: "orange"},
          {x: 0, y: 2, color: "orange"}
    
        ];
        this.x = 0;
        this.y = 0;
      }

      //定义蛇的初始化
      Snake.prototype.init = function () {
        //蛇的出现必然删除之前的蛇
        this.remove();

        //for 循环蛇body数组，创建div添加到map，div的样式对应body数组中的每一位
        for (var j = 0; j < this.body.length; j++) {
          var div = document.createElement("div");
          map.appendChild(div);

          //从0 开始循环，每个循环到的div添加样式
          div.style.width = this.width + "px";
          div.style.height = this.height + "px";
          div.style.position = "absolute";
          div.style.backgroundColor = this.body[j].color;
          div.style.left = this.body[j].x * this.width + "px";
          div.style.top = this.body[j].y * this.height + "px";
          div.style.backgroundImage = this.body[j].img;
          div.style.backgroundSize = "cover";
          //把divpush到 snakess数组中，下次初始化可以通过数组去找map中的蛇删除
          snakess.push(div);


        }
  

      };
      //蛇的删除方法
      Snake.prototype.remove = function () {

        //小蛇的删除遍历sankess数组，找删除map中对应的
        for (var i = snakess.length - 1; i >= 0; i--) {
          //蛇snakes数组删除 地图中的蛇
          snakess[i].parentNode.removeChild(snakess[i]);
          //再删除蛇数组中i蛇
          snakess.splice(i, 1)
        }
      };
//蛇的移动
      Snake.prototype.move = function () {
   
        //得先修改蛇身体部分的坐标，如果先改蛇头的话，蛇身体会用蛇头新的坐标
        //蛇的身体部分的坐标 从最后一个遍历，下一个的坐标是前一个的坐标
        for (var i = this.body.length - 1; i > 0; i--) {
          this.body[i].x = this.body[i - 1].x;
          this.body[i].y = this.body[i - 1].y;

        }
        //蛇的移动就是判断direction
        //蛇头的判断 direction
        switch (this.direction) {  //判断snake对象的direction
          case "right" :
            this.body[0].x += 1;
            break; //如果direction是往右，蛇头的x 坐标+1往右
          case "left" :
            this.body[0].x -= 1;
            break;
          case "top" :
            this.body[0].y -= 1;
            break;
          case "bottom" :
            this.body[0].y += 1;
            break;
        }
        this.x = this.body[0].x;
        this.y = this.body[0].y;

        //蛇头的坐标重新定义，再执行蛇的init
        this.init();
      };
      //把Snake暴露到全局
      window.Snake = Snake;
    }
)();
//游戏对象部分
(
    function () {
      //定义个定时器，为空，等下是给定时器赋值，不断的去让小蛇移动init
      var timer;

      //游戏对象
      function Game() {
        //定义
        // this.snake = new snake;
        this.food = new Food(40, 40, "blue",this.snake);
        this.snake = new Snake(40, 40)
      }


//游戏对象的初始化
      Game.prototype.init = function () {
        var that = this;
        //游戏的初始化执行食物的初始化
        this.food.init(this.snake);
        //snake 初始化
        this.snake.init();
        //设置一个定时器定时执行 sanke。move
        timer = setInterval(function () {
          //进行蛇初始化和移动
          this.snake.move();
          //定时器执行小蛇移动完验证
          this.eat();


        }.bind(that), 150)
      };
      //给Game构造对象添加一个判断 食物是否被吃的方法  判断是否越界
      Game.prototype.eat = function () {
           
        //如果 game对象的 food 和  snake的蛇头坐标重合表示被吃掉
        if (this.food.x == this.snake.x && this.food.y == this.snake.y) {
          this.food.init(this.snake);  //执行食物的初始化
          // 定义一个last是小蛇body的最后一个，吃掉食物就把这个复制 push到小蛇body数组中，定时器执行snake.init会重新刷新小蛇
          var last = this.snake.body[this.snake.body.length - 1];
          this.snake.body.push({
            x: last.x,
            y: last.y,
            color: last.color
          });

        }
        //判断边界

        if (this.snake.body[0].x < 0 || this.snake.body[0].x >= map.offsetWidth / this.snake.width) {
          clearInterval(timer);
        }
        if (this.snake.body[0].y < 0 || this.snake.body[0].y >= map.offsetHeight / this.snake.height) {
          clearInterval(timer);
        }
        
      };
      //给按钮添加点击事件 开始游戏 实例化游戏对象初始化init
      btn.onclick = function () {
        //实例化游戏对象
        var game = new Game();
        game.init();
        //给全局添加键盘按下监听事件 改变direction
        document.onkeydown = function (e) {
          var e = e || window.event;
          switch (e.key) {
            case "ArrowDown" :
              game.snake.direction = "bottom";
              break;  //向下
            case "ArrowUp" :
              game.snake.direction = "top";
              break;   //向上
            case "ArrowLeft" :
              game.snake.direction = "left";
              break;   //向左
            case "ArrowRight" :
              game.snake.direction = "right";
              break;   //向右
          }
        }
      }


    }
)();
