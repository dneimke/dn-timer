# dn-timer
A pausable Javascript timer

![Pausable Timer](./images/running_timer.png)

The timer is designed to survive hibernation mode and will resume when the device wakes up.

The project is built using Webpack to output a bundle that is consumed by the `index.html` page

```
> npm run build:webpack
```

To run the sample, I install and run the [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

```
> npm install webpack-dev-server -g
> webpack-dev-server
 ```