# FaD Character Tracker

a [Sails](http://sailsjs.org) application

### Project to do:

 - set up z-index heirarchy

### DevOps to do:

 - Set up symlink script and store pre-commit hook in the repo: http://stackoverflow.com/questions/3462955/putting-git-hooks-into-repository/3464399#3464399
 - Set up a scaffold for components

### Custom Tasks

#### Component Scaffold

```
grunt component --name=myComponent --parent=common
```

This command will create a new Vue.js component in /assets/js/lib/components/common with all the necessary files for a component to work, including a testing spec scaffold.

The parent attribute is optional, and tells the generator where in the components folder to place the new component.
