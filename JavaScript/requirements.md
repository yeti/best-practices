# Meeting the Requirements

## Node

Node uses a binary installer. Find the one for your OS at [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

## NPM

NPM comes with Node, so once you install Node on your machine, npm should be installed as well. You can upgrade your version of npm with 

```
$ sudo npm install npm -g
```

Yes… you install npm via npm.

## Yarn

The easiest way to install Yarn is using [Brew](http://brew.sh/) Install Brew from their website and then run

```
$ brew update
$ brew install yarn
```

You will need to set up the PATH environment variable in your terminal to have access to Yarn’s binaries globally.

Add `export PATH="$PATH:`yarn global bin`”` to your profile (this may be in your .profile, .bashrc, .zshrc, etc.)

Reload your shell (ex: `$ . .bash_profile`) test with 

```
$ yarn --version
0.17.10
```
