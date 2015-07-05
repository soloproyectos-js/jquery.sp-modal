# jQuery.spModal

A Modal Window System plugin for jQuery.

## Install

Install using [bower](https://github.com/bower/bower) package manager:
```bash
bower install jquery.sp-uri
```
Or copy copy the [dist](/soloproyectos-js/jquery.modal/tree/master/dist) files in your preferred location.

## Examples

**Opens an alert message window**
```JavaScript
$.spModal('alert', 'Message', 'This is a message');
```
![Alert Message Window](https://cloud.githubusercontent.com/assets/5312427/8512819/1851d5f2-2355-11e5-84c3-20f22be2463e.png)

**Opens a confirm message window**
```JavaScript
$.spModal('confirm', 'Please Confirm', 'Do you want delete the item?', function () {
    // deleting item
});
```
![Confirm Message Window](https://cloud.githubusercontent.com/assets/5312427/8512858/46e728c6-2356-11e5-90f4-1aab7d84663e.png)

**Opens an error message window**
```JavaScript
$.spModal('error', 'An error has occurred');

// or...
$.spModal('error', 'An error has occurred', function () {
    // do something just before throwing the error
});
```
