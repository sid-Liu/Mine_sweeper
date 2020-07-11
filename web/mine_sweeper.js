
window.onload = function()
{
    /*获取开头三个输入框*/
    var input1 = document.getElementById("option").getElementsByTagName("input")[0];
    var input2 = document.getElementById("option").getElementsByTagName("input")[1];
    var input3 = document.getElementById("option").getElementsByTagName("input")[2];

    /*focus时输入框颜色改变*/
    input1.onfocus = function(evt) {this.style = "background-color: rgb(250, 255, 189)";};
    input2.onfocus = function(evt) {this.style = "background-color: rgb(250, 255, 189)";};
    input3.onfocus = function(evt) {this.style = "background-color: rgb(250, 255, 189)";};
    input1.onblur = function(evt) {fill(); check(); this.style = "background-color: rgb(255, 255, 255)";};
    input2.onblur = function(evt) {fill(); check(); this.style = "background-color: rgb(255, 255, 255)";};
    input3.onblur = function(evt) {check(); this.style = "background-color: rgb(255, 255, 255)";};

    function fill() {  /*自动填充地雷数*/
        if (parseInt(input1.value) >= parseInt(input2.value))
        {
            if (parseInt(input2.value) < 4)  input3.value = Math.floor(input2.value * 1.5);
            else if (parseInt(input2.value) <= 13)  input3.value = Math.floor(input2.value * 1.8);
            else if (parseInt(input2.value) <= 20)  input3.value = Math.floor(input2.value * 2.2);
            else if (parseInt(input2.value) <= 25)  input3.value = Math.floor(input2.value * 3.4);
            else if (parseInt(input2.value) <= 30)  input3.value = Math.floor(input2.value * 4.5);
        }
        else
        {
            if (parseInt(input1.value) < 4)  input3.value = Math.floor(input1.value * 1.5);
            else if (parseInt(input1.value) <= 13)  input3.value = Math.floor(input1.value * 1.8);
            else if (parseInt(input1.value) <= 20)  input3.value = Math.floor(input1.value * 2.2);
            else if (parseInt(input1.value) <= 25)  input3.value = Math.floor(input1.value * 3.4);
            else if (parseInt(input1.value) <= 30)  input3.value = Math.floor(input1.value * 4.5);
        }
    }

    function check() {  /*检测是否数量过大*/
        if (parseInt(input1.value) > 30)
        {
            alert("确定这么大？屏幕要爆炸的");
            input1.value = 30;
        }
        if (parseInt(input2.value) > 30)
        {
            alert("确定这么大？屏幕要爆炸的");
            input2.value = 30;
        }
        if (parseInt(input3.value) > parseInt(input1.value) * parseInt(input2.value))
        {
            input3.value = parseInt(input1.value) * parseInt(input2.value) - 1;
            alert("傻逼。。太多了");
        }
    }
}

function Mine (isMine, num, idx)
{
    this.isMine = isMine;
    this.num = num;
    this.idx = idx;  //用于深搜时走过痕迹设置

    Mine.prototype.getHTML = function(i, j)  //获得对应按钮在HTML中的节点
    {
        return document.getElementById("minefield").getElementsByTagName("div")[i].getElementsByTagName("input")[j];
    }

    Mine.prototype.alreadyClick = function(r, c)  //点开状态的处理
    {
        this.getHTML(r,c).style = clickcolor + "cursor: default";
        this.getHTML(r,c).onmouseover = "";
        this.getHTML(r,c).onmouseout = "";
        this.getHTML(r,c).onclick = "";
    }
}

var mine = new Array();
var x = 0;  //行数
var y = 0;  //列数
var n = 0;  //雷数
var win = 0;  //用于记录是否胜利

var dir = [[-1, 1, 0, 0],  //用于上下左右方向控制
    [0, 0, -1, 1]];
var originalcolor = "background-color: rgb(195, 218, 178);";  //原区域颜色
var clickcolor = "background-color: rgb(157, 208, 121);";  //鼠标点击后颜色
var minecolor = "background-color: rgb(244, 85, 85);";  //踩中雷颜色

function egg()  //菜单开关
{
    alert("还吃？可长点心吧！快点击左边的开始游戏！");
    //alert("(*′☉.̫☉)");
}

function start()
{
    x = document.getElementById("option").getElementsByTagName("input")[0].value;
    y = document.getElementById("option").getElementsByTagName("input")[1].value;
    n = document.getElementById("option").getElementsByTagName("input")[2].value;
    for (var i=0; i<x; i++)
    {
        mine[i] = new Array();
        for (var j=0; j<y; j++)
            mine[i][j] = new Mine(false, 0, 0);
    }
    creatMine();
    show();
    win = 0;
}

function creatMine()  //随机造雷
{
    var mine_x, mine_y;
    for (var i=0; i<n; i++)
    {
        mine_x = Math.floor(Math.random()*x);
        mine_y = Math.floor(Math.random()*y);
        if (! mine[mine_x][mine_y].isMine)  //此位置无雷
        {
            mine[mine_x][mine_y].isMine = true;
            changeNum (mine_x, mine_y);
        }
        else i--;
    }

    function changeNum (c, r)  //改变雷的周边位置数字
    {
        for (var i=-1; i<=1; i++)
            for (var j=-1; j<=1; j++)
                if (i!=0 || j!=0)
                    if (!(c+i<0 || c+i>=x || r+j<0 || r+j>=y))  //不越界
                        mine[c+i][r+j].num ++;
    }
}

function show()  //显示游戏区域
{
    var innerhtml = "";

    for (var i=0; i<x; i++)
    {
        innerhtml += "<div>";
        for (var j=0; j<y-1; j++)
        {
            innerhtml += "<input type='button' class='button0' value=' ' ";
            innerhtml += "onmouseover='changeColor(" + i + ", " + j + ")' onmouseout='changeColorBack(" + i + ", " + j + ")' ";
            innerhtml += "onclick='onclickChangeValue(" + i + ", " + j + ")' />";
        }
        innerhtml += "<input type='button' class='button0' value=' ' ";
        innerhtml += "onmouseover='changeColor(" + i + ", " + j + ")' onmouseout='changeColorBack(" + i + ", " + j + ")' ";
        innerhtml += "onclick='onclickChangeValue(" + i + ", " + j + ")' /></div>";
    }

    document.getElementById("minefield").innerHTML = innerhtml;
}

function changeColor(i, j)  //鼠标移过
{
    mine[i][j].getHTML(i,j).style = clickcolor;
}

function changeColorBack(i, j)  //鼠标移出
{
    mine[i][j].getHTML(i,j).style = originalcolor;
}

function onclickChangeValue(i, j)  //点击后方块改变
{
    if (mine[i][j].isMine)  //踩雷
    {
        showAllMines(false);
        alert("Game Over.. (´；ω；`)");
    }
    else if (mine[i][j].num != 0)  //点到数字
    {
        mine[i][j].alreadyClick(i, j);
        mine[i][j].getHTML(i,j).value = mine[i][j].num;
        mine[i][j].idx = 1;
        win++;
    }
    else
        DepthSearch(i, j);  //点开一大片无数字区

    /*判断是否胜出*/
    if (win == (x*y - n) && win != 0)
    {
        showAllMines(true);
        alert("Win! ヽ(●´ε｀●)ノ");
    }
}

function DepthSearch(r, c)  //深搜，点开一大片无数字区
{
    if (r<0 || r>=x || c<0 || c>=y)
        return ;

    var i, j;
    if (mine[r][c].num==0 && mine[r][c].idx==0)
    {
        mine[r][c].alreadyClick(r, c);
        mine[r][c].idx = 1;
        win++;
        for (i=0; i<4; i++)
            DepthSearch(r+dir[0][i], c+dir[1][i]);
    }
    else if (mine[r][c].num!=0 && mine[r][c].idx==0)
    {
        mine[r][c].alreadyClick(r, c);
        mine[r][c].getHTML(r,c).value = mine[r][c].num;
        mine[r][c].idx = 1;
        win++;
    }
    return ;
}

function showAllMines(win)  //显示所有区域
{
    var color = minecolor;
    if (win)  //赢了就不要用红色标记地雷
        color = originalcolor;
    for (var i=0; i<x; i++)
        for (var j=0; j<y; j++)
        {
            if (mine[i][j].isMine)
            {
                mine[i][j].getHTML(i,j).style = color + "cursor: default";
                mine[i][j].getHTML(i,j).value = "X";
                mine[i][j].getHTML(i,j).onclick = "";
                mine[i][j].getHTML(i,j).onmouseover = "";
                mine[i][j].getHTML(i,j).onmouseout = "";
            }
            else if (mine[i][j].num == 0)
                mine[i][j].alreadyClick(i, j);
            else
            {
                mine[i][j].alreadyClick(i, j);
                mine[i][j].getHTML(i,j).value = mine[i][j].num;
            }
        }
}
