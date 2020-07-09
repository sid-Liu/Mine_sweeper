<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/7/6
  Time: 18:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Mine sweeper</title>
    <link type = "text/css" rel = "stylesheet" href="mine_sweeper.css">
    <script type="text/javascript" src="mine_sweeper.js"></script>
  </head>
  <body cz-short-listen="true">
  <div>
    <div id = "option">
      x:<input type = "text" size = "12" value="15"><br/>
      y:<input type = "text" size = "12" value="15"><br/>
      n:<input type = "text" size = "12" value="24"><br/>
      <div id="explain">(x is length and y is width)<br/>(n is the number of mines)</div>
      <div id="startbutton"><a href="javascript:start();" onmouseover="this.style = &#39;background-color: #40abcf; color: #fff;&#39;" onmouseout="this.style = &#39;background-color: #f64; color: #eee;&#39;">
        Start Game!!!
        </a>
      <input type="button" id = "egg" onclick="alert('essage');">
    </div>
  </div>
  </div>
  </div id = "minefield>"></div>
  </body>
</html>
