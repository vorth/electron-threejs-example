## Try vZome-Web

You can try the vZome-Web application here:
[https://vorth.github.io/vzome-web/](https://vorth.github.io/vzome-web/).
That site is simply this Github repository published using [Github Pages](https://pages.github.com/).

You should see a single Zome-ball shape.  Use your scroll wheel to zoom in.  For now, there is not much you can do except zoom, rotate, and pan the view.


## vZome Reimagined with Web Technologies

[vZome](http://vzome.com) is a desktop application for designing [Zometool](http://zometool.com) models, and generally playing with rich 3D geometries.  Unfortunately, the cost of maintaining vZome as a Java desktop application has been steadily increasing, as Java becomes less and less supported for desktop use, particularly due to security issues.  It has become increasingly difficult to provide a seamless and robust install experience for vZome, so I am exploring alternatives.

If Java was the obvious choice for cross-platform development 15 years ago, the web (HTML5, CSS, and Javascript) is the obvious choice today.  Furthermore, 3D graphics in the web is a reality now; WebGL is standard in most browsers, and [Three.js](https://threejs.org/) makes it reasonably simple to use.  Before long, we'll see Virtual Reality similarly ubiquitous on the web.

For all of those reasons, I'm embarking on a journey to reimagine vZome as a web experience.  I'm not sure what shape it will take, but I'm getting started regardless.  I have a lot to learn, but that's the fun part.

Development of the desktop version of vZome ([source repository](https://github.com/vorth/vzome-desktop/)) won't cease, since it will be years, realistically, before vZome-Web approaches the same level of functionality.

## Technology Choices

New web technologies and tools appear often, and some don't survive very long.  Hopefully, my choices here will prove to be strategic.

### [Three.js](https://threejs.org/)

Three.js is the clear winner as a Javascript library wrapping [WebGL](https://get.webgl.org/).

### [Electron](http://electron.atom.io/)

Although I'm adopting web technologies, I don't want to abandon the idea of a desktop application.
Fortunately, there are several ways to package a web application for the desktop, including integration with the OS and file system.  Electron seems to be a leader (if not a winner) here, used by popular apps like [Slack](https://slack.com/), [WordPress](https://desktop.wordpress.com/), and [Atom](https://atom.io/).

If you have NPM installed, you can try out the desktop version.
Clone this repository, then follow these steps in the root directory:

```
npm install
./node_modules/.bin/electron .
```

### [React](https://facebook.github.io/react/)

As a highly interactive web application (eventually), vZome-Web requires a component framework
for managing the interaction.  Although [Angular](https://angular.io/) has a **lot** of mindshare
among web developers, it seems that [React](https://facebook.github.io/react/) is gaining rapidly, and there is evidence that it is somewhat easier to get started with.  Based on my own limited history building with Angular, and
[some experimentation](https://codepen.io/scottvorthmann/) with React, I'm planning to use the latter.



