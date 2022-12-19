# 1、Introduction

<h>🔔🔔🔔🥪🥪🥪🍔🍔🍔</h>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This project is to help us to <kbd>use the source code of Cesium to load earth on HTML Pages Based on the self-define class library </kbd>! Therefore, we should be excited!</p>

# 2、How to use

## 2.1 build Cesium

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Open the terminal console in the folder (cesium-1.89)

<pre>
<code class="bash">npm install gulp --global
npm install
gulp --tasks
gulp clean
gulp build
gulp release
node server.js</code>
</pre>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get the built javascript code which can be seen from the source directory, include the following ten folders: Assets、Core、DataSources、Renderer、Scene、Shaders、ThirdParty、Widgets、Workers( can change before build and after build)、WorkersES6.

## 2.2 Start Vue Project

<pre>
<code class="bash">vue init webpack test-source-earth
cd test-source-earth
npm run dev</code>
</pre>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Copy the above ten folders to test-source-earth/static directory，then visit

[开发者分享的 Token，实测有效，位于 Ion.js](./test-source-earth//static/jjg-source-Earth/Core/Ion.js)

 <code>
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYTU1YjMzOS0wZTdjLTQyNjgtODU1NS05ZjIwMGEzYjIwNzgiLCJpZCI6OTk2ODQsImlhdCI6MTY1NjY1MTM0NX0.oFog3dJt9eNlxyFNJyqxGWmGb73lwnIZL7g3_7KKT0I';
</code>

Note: The core code is about earth-demo.html、package.json and JZ.js (By jing_zhong, 2022.12.19 ), hope it is helpful to you!
