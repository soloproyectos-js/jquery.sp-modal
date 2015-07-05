# jQuery.spModal

A Modal Window System plugin for jQuery.

## Install

Install using [bower](https://github.com/bower/bower) package manager:
```bash
bower install jquery.sp-uri
```
Or copy copy the [dist](/soloproyectos-js/jquery.modal/tree/master/dist) files in your preferred location.

## Modal Dialogs

### Modal Message

A `Modal Message` consist of a modal dialog box with a title, text and some buttons.
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
![Modal Message](https://cloud.githubusercontent.com/assets/5312427/8513109/4a06badc-235e-11e5-84d3-84f3a35d1570.png)

See the `src/jquery.sp-modal-message.js` file for available methods.

### Modal Loading

A `Modal Loading` consist of a modal dialog box with a loading image, text and some buttons.
```JavaScript
var loading = $.spModal('loading', 'This process may take several years\nPlease be patient...');
loading.addButton('Cancel', function() {
    loading.close();
});
```
![Modal Loading](https://cloud.githubusercontent.com/assets/5312427/8512945/796c42de-2358-11e5-9e36-4cab304fab24.png)

### Pre-Configured Modal Dialogs

Even though you can create a modal dialog from scratch, the library offers a set of pre-configured modal dialogs.

**Creates an modal alert message:**
```JavaScript
$.spModal('alert', 'Message', 'This is a message');
```
![Modal Alert Message](https://cloud.githubusercontent.com/assets/5312427/8512819/1851d5f2-2355-11e5-84c3-20f22be2463e.png)

**Creates a modal confirm message:**
```JavaScript
$.spModal('confirm', 'Please Confirm', 'Do you want to delete the item?', function () {
    // deleting item
});
```
![Modal Confirm Message](https://cloud.githubusercontent.com/assets/5312427/8512978/b25b751e-2359-11e5-8acc-04cc5dd5968e.png)

**Creates an modal error message:**
```JavaScript
// opens a modal dialog and throws an error
$.spModal('error', 'Error', 'An error has occurred');

// or...
$.spModal('error', 'Error', 'An error has occurred', function () {
    // do something just before throwing the error
});
```
![Modal Error Message](https://cloud.githubusercontent.com/assets/5312427/8512899/3a000c30-2357-11e5-9593-c62380339f99.png)

## Asynchronous calls

You can perform asynchronous HTTP requests. Each time you perform an HTTP request a modal loading appears and it is closed when the request is complete.

```JavaScript
$.spModal('get', 'test.php', {param1: 'one', param2: 'two'})
    .done(function () {
        console.log('Success!');
    })
    .fail(function () {
        console.log('An error has ocurred');
    })
    .always(function () {
        console.log('This function is always called');
    });
```

## Uploading files

You can also upload files. When uploading a file a modal loading appears and it is closed when the request is complete.

```JavaScript
// uploads a unique file
var inputFile = $('#file');
inputFile.change(function () {
    $.spModal('upload', inputFile, 'test.php').done(function (data) {
        showMessage(data);
    });
});
```

See `demos/modal-request` for complete examples.
