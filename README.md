JS-Import-Sort  ![Travis-CI](https://travis-ci.org/Amwam/js-import-sort.svg?branch=master) [![npm version](https://badge.fury.io/js/js-import-sort.svg)](https://badge.fury.io/js/js-import-sort)
---

A JS codemod to sort imports

##Intro
Built on top of [facebook/jscodeshift](https://github.com/facebook/jscodeshift)

This will transform a JS file, sorting and organising its imports (ES2015/ES6).

Example:

```
    import Main from 'aaaa';
    import {ZMain}  from 'aaaa';
       

    import First from 'zzz';
    import {Third} from 'zzz';
    

    import {Second} from 'zzz';
    

    import * as someDefault from 'bbb';
    

    import {a as b} from 'packageModule';
    

    import SomeClass from './MyModule';
    import AnotherClass from '../../Module1';
    

    import * as util from 'util';
```

Becomes:
 
```
   import * as util from 'util';
   
   import Main, {ZMain} from 'aaaa';
   import * as someDefault from 'bbb';
   import First, {Second, Third} from 'zzz';
   
   import {a as b} from 'packageModule';
   
   import AnotherClass from '../../Module1';
   import SomeClass from './MyModule';
```

Imports are separated by node, dependencies in `package.json`, other, and relative imports.
 
##Running
To run, just run:

    js-import-sort --path ./*
