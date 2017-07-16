# PH Image Crop in Modal Box 
This plug-in need jQuery, Bootstrap and Cropper


### Usage

Include script file.
```html
<script src="/ph-image-crop/js/ph-image-crop.min.js"></script>
```

Use modal box name as "ph-image-crop-modal"
and use image id as "crop-image"

```html
<div class="image-crop"><div>

<div class="modal fade" id="ph-image-crop-modal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div>
                    <img style="max-width: 100%" id="crop-image">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Okay</button>
                </div>
            </div>
        </div>
    </div>
</div>
```
##
If you want to use canvas, don't forget to set fileName.

Initialize with phImageCrop method.

If you want to use with base64
```js
$('.image-crop').phImageCrop({
    defaultImage: '',
    type: 'base64',
    name: 'my_abc_image[]',
    cropper: {
        aspectRatio: 300/100,
        minCropBoxWidth: 300,
        minCropBoxHeight: 100
    }
})
```

If you want to use it with canvas
```js
$('.image-crop').phImageCrop({
    defaultImage: '',
    type: 'canvas',
    name: 'my_abc_image',
    fileName: 'my_abc', //File name is only need in type = canvas
    cropper: {
        aspectRatio: 300/300,
        minCropBoxWidth: 300,
        minCropBoxHeight: 300
    }
})
```


## License

PH Image Crop is release under the MIT license. You are free to use, modify and distribute this software, as long as you give me credit.


## Credit
jQuery, Bootstrap, Cropper