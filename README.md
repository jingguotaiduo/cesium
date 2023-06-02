# 1、Introduction
<h>🌈🌈🌈🕺🕺🕺✌️✌️✌️</h>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As we can see, I have to admit that Cesium is powerful and full-function javascript library for who want to develop 2D/3D map、spatial analysis、data exhibition、visualization and so on！</p>
<p>For the detailed information, please visit <kbd>README-origin.md</kbd></p>

# 2、How to compile and build cesium

## 2.1 a series of commands to build

<pre>
<code class="bash">
npm install gulp --global
npm install
gulp --tasks
gulp clean
gulp build
gulp release
node server.js
</code>
</pre>

## 2.2 start cesium progranm to run and see the official examples
Open the Browser, visit the following websites(url):<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(1) [http://localhost:8080/](http://localhost:8080/);<br>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2) [Hello world](http://localhost:8080/Apps/HelloWorld.html);<br>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(3) [CesiumViewer](http://localhost:8080/Apps/CesiumViewer/index.html);<br>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(4) [Sandcastle](http://localhost:8080/Apps/Sandcastle/index.html)

## 2.3 learn API documentation
[Cesium Official Documentation](http://localhost:8080/Build/Documentation/index.html) is built by <kbd>JS Doc</kbd>.

## 2.4 Additional Token
<code>天地图key: 4a00a1dc5387b8ed8adba3374bd87e5e</code><br>
cesium\Build\CesiumUnminified\Cesium.js和cesium\Source\Core\Ion.js<br>
<code>Cesium Ion Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NTkyNGVkMi04YTg1LTQ4YzktYTI3MS05NTNiZWM3MTg2ZGEiLCJpZCI6MjU5LCJpYXQiOjE2NjQ4MTQyODl9.mGZTN2DeKa-mQnQr6BInj8GzOK6wq3dZMwcyU0iwInA</code>
来源于[Cesium官方沙盒](https://sandcastle.cesium.com/CesiumUnminified/Cesium.js)
 第48206行<br>

 [开发者分享的Token](https://blog.csdn.net/josiecici/article/details/120703086)
 <code>
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMTYyZjIxNC0xNDZiLTRkNmUtYTBmZS00MzZhOGQ4NzJmNzkiLCJpZCI6Njk5MjIsImlhdCI6MTYzMzkxNjU4OX0.NFaUoiLQvq8d6LeSEfCQLIjAEYcYH_dPbqSUFqfsflA';
</code>


<code>
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDJjMTcwNS04ZDVmLTQzNWQtYWUyZC0yMTJkMDkyMzkyMjMiLCJpZCI6MTQ4MiwiaWF0IjoxNjQ4NDQ2OTIwfQ.7e1QUkx_k-mZBxKz9tV8a5TFEorrlLlkfcVNNPzfTQY
</code>
