window.onload = function () {
    var input1 = document.getElementById("option").getElementsByTagName("input")[0];
    var input2 = document.getElementById("option").getElementsByTagName(("input"))[1];
    var input3 = document.getElementById("option").getElementsByTagName("input")[2];


    function fill() {
        if(parseInt(input1.value) >= parseInt(input2.value)){

        }


    }
}

function Mine(_isMine) {
    this.isMine = _isMine;
    Mine.prototype.getHTML = function (i, j) {
        return document.getElementById("minefield").getElementsByTagName("div")[i]..getElementsByName("input")[j];
    }

}

var mine = new Array();
var x = 0;
var y = 0;
var n = 0;
var win = 0;

const dir = [[-1, 1, 0, 0],
    [0, 0, -1, 1]];
const origin_color = "blackground-color:rgb(1, 0, 0)";
const click_color = "blackgrund-color:rgb(0, 1, 0)";
const mine_color = "blackground-color:rgb(0, 0, 1)";

function egg()  //彩蛋开关
{
    alert("少吃点吧！多胖了！可长点心吧！" + "\n"+ "快点击左边的开始游戏！(*′☉.̫☉)");
    //alert("点心？"+"哪儿有点心");
}

function start() {
    x = document.getElementById("option").getElementsByTagName("input")[0].value;
    y = document.getElementById("option").getElementsByTagName("input")[1].value;
    n = document.getElementById("option").getElementsByTagName("input")[2].value;
    for(var i = 0; i < x; ++i){
        mine[i] = new Array();
        for(var j = 0; j < y; ++j){
            mine[i][j] = new Mine(false);
        }
    }

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
                    if (!(c+i<0 || c+i>=x || r+j<0 || r+j>=y))  //防止越界
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
