# jQuery.spModal

A Modal Window System plugin for jQuery.

## Install

Install using [bower](https://github.com/bower/bower) package manager:
```bash
bower install jquery.sp-uri
```
Or copy copy the [dist](/soloproyectos-js/jquery.modal/tree/master/dist) files in your preferred location.

## Modal Messages

A `Modal Message` consist of a modal dialog box with a title, text and some buttons. For example:
```JavaScript
var message = $.spModal('message', 'Please Confirm', 'Do you want to destroy the world?');
message.addButton('Yes', function () {
    // destroying the world and closing the dialog box
    message.close();
});
message.addButton('No', function () {
    console.log('That\'s good');
    message.close();
});
```
See the `src/jquery.sp-modal-message.js` file for available methods.

### Creating a Modal Dialog Box from scratch



**Opens an alert message window**
```JavaScript
$.spModal('alert', 'Message', 'This is a message');
```
![Alert Message Window](https://cloud.githubusercontent.com/assets/5312427/8512819/1851d5f2-2355-11e5-84c3-20f22be2463e.png)

**Opens a confirm message window**
```JavaScript
$.spModal('confirm', 'Please Confirm', 'Do you want to delete the item?', function () {
    // deleting item
});
```
![Confirm Message Window](https://cloud.githubusercontent.com/assets/5312427/8512978/b25b751e-2359-11e5-8acc-04cc5dd5968e.png)

**Opens an error message window**
```JavaScript
$.spModal('error', 'Error', 'An error has occurred');

// or...
$.spModal('error', 'Error', 'An error has occurred', function () {
    // do something just before throwing the error
});
```
![Error Message Window](https://cloud.githubusercontent.com/assets/5312427/8512899/3a000c30-2357-11e5-9593-c62380339f99.png)

**Opens a loading message window**
```JavaScript
var loading = $.spModal('loading', 'This process may take several years\nPlease be patient...');
loading.addButton('Cancel', function() {
    loading.close();
});
```
![Loading Message Window](https://cloud.githubusercontent.com/assets/5312427/8512945/796c42de-2358-11e5-9e36-4cab304fab24.png)
