## Welcome to React Training!

This repo contains the course material for [React Training](https://reacttraining.com/). Before attending the training, please make sure you can run this repository.

First, install [git](http://git-scm.com/downloads) and the latest stable version of [node](https://nodejs.org/). Then:

```sh
$ git clone https://github.com/ReactTraining/react-workshop.git
$ cd react-workshop
$ npm install
$ npm start
```

Your web browser should open to [http://localhost:8080](http://localhost:8080)where you'll see a list of subjects.

**IMPORTANT:** Please read the [JavaScript Primer](https://github.com/ReactTraining/react-workshop/blob/master/JavaScriptPrimer.md) before attending the workshop. It's a refresher on some of the newer bits of JavaScript you'll want to be familiar with in order to get the most out of the experience.

### Troubleshooting

A few common problems:

* **You're having problems cloning the repository.** Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

* **You're having trouble installing node.** We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install the latest stable version of node with the following command:

```sh
$ nvm use default stable
```

* **You don't have permissions to install stuff.** You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed node with nvm (suggested):
$ sudo rm -rf ~/.npm

# If you installed node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

# Then (look ma, no sudo!):
$ npm install
```

### License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact us at [hello@reacttraining.com](mailto:hello@reacttraining.com).
