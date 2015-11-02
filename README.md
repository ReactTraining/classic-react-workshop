## Welcome to React.js Training!

This repo contains the course material for the React Fundamentals course from [React.js Training](https://reactjs-training.com/).

Before the training make sure you can run this repository.

Install [git](http://git-scm.com/downloads) and [node.js](https://nodejs.org/), then:

```sh
$ git clone https://github.com/ReactTraining/react-fundamentals.git
$ cd react-fundamentals
$ npm install
$ npm start
```

Then open your browser to `http://localhost:8080`, you should see a list of subjects.

### Troubleshooting

A few common problems:

- You're having problems cloning the repository. Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

- You're having trouble installing node. We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install node version 4 with the following command:

```sh
$ nvm use default 4
```

- You don't have permissions to install stuff. You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed node with nvm (suggested):
$ sudo rm -rf ~/.npm 

# If you installed node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

# Then (look ma, no sudo!):
$ npm install
```
