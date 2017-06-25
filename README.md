## Quick Start

You can run this project both as a native desktop application (using Electron) and as a standard web application.  For the web application, assuming you have Python installed, you can simply do

```
python -m SimpleHTTPServer
```
and then visit ```http://localhost:8000``` in your browser.

For the desktop version, assuming you have NPM installed, you should follow these steps:

```
npm install
./node_modules/.bin/electron .
```

**Note: the remainder of this document is the original README from the project I forked.**


## Three.js for native application thanks to electron

This post is a example of three.js game as native application.
The idea came from [@Nazariglez](https://twitter.com/Nazariglez) in this [tweet](https://twitter.com/Nazariglez/status/591915046151815169),
a nice guy, be sure to check it out!
I loved the idea and tried to reproduce it.
You can use that to easily write 3d games with ease of three.js coding and still have the same controls you can get with a native application.

So first what is *electron* ?
This is the new name of *atom-shell*.
It is the 'platform' under which [atom editor](https://atom.io/) is running.
It is has been introduced [in this post on atom blog](http://blog.atom.io/2015/04/23/electron.html).
It is a very new way to build native application.
Under the hood, electron is running chromium and node.js.
To get more information, checkout [electron's homepage](http://electron.atom.io/).
It short, it is an easy way to write desktop apps with web technology.

Now Let's see how we can mix with three.js :)

## How To Code It
Before having a three.js native apps, we need first to install [electron](http://electron.atom.io/), checkout the [repository README.md](https://github.com/atom/electron).
It is straightforward, just a plain npm command. 


```
npm install electron-prebuilt -g
```



just follow [electron's quick start](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md) and you will get something running in 10min at the most.

Then to add three.js, just replace their ```index.html``` by a webpage doing 3d with webgl. As electron running chromium, it supports WebGL, WebAudio or WebRTC without issue. You got a lot of freedom. In our case, i simply took an example from three.js ```examples/``` called [webgl_buffergeometry_uint](http://threejs.org/examples/#webgl_buffergeometry_uint)

## How To Make This Page Transparent
To make our demo appears nicer, we can try to make the window background transparent and not display the window frame.
This will give a nice floating effect to the 3d.

TODO include a screenshot

To do the same, first modify electron main.js like this.

```javascript
//mainWindow = new BrowserWindow({width: 800, height: 600});
mainWindow = new BrowserWindow({width: 800, height: 600, transparent: true, frame: false});
```

Second, be sure to make the body background transparent with css.

```css
body {
  background-color: rgba(0,0,0,0);
}
```

Then tell three.js to stay transparent too.
Just set ```alpha``` and the clear color.

```javascript
renderer = new THREE.WebGLRenderer( { antialias: false, alpha : true } );
renderer.setClearColor(0x000000, 0);
```

Now everything is transparent and you can see the 3d floating on top :)
