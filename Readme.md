# PH Image Crop in Modal Box 
This plug-in need jQuery, Bootstrap and Cropper


### Usage

Include css and script file.
```html
<link rel="stylesheet" href="/ph-image-crop/css/ph-image-crop.min.css">

<script src="/ph-image-crop/js/ph-image-crop.min.js"></script>
```

Use modal box name as "ph-image-crop-modal"
and use image id as "crop-image"

```html
<div class="modal fade" id="ph-image-crop-modal" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div>
                    <img id="crop-image">
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
Use this code for preview image. If you want to set old image, set it in old-thumbnail's src.  

For image cropping and some settings  

ratio = data-ratio,  
maximum image width = data-width  
maximum image height = data-height  
using canvas or base64 = data-canvas (true - canvas, false - base64)

If you want to use canvas, don't forget to put name file in your file input. Or if you use base64, u don't need to do it.

```html
<div class="ph-image-crop" data-ratio="300/100" data-canvas="true" data-width="300" data-height="100" >
    <div class="ph-img-thumbnail" style="padding-bottom: 10px">
        <img class="old-thumbnail" src="">
        <img class="ph-thumbnail">
        <img class="base-thumbnail">
        <input class="ph-image"  type="hidden" name="ph_images[]">
    </div>
    <div>
        <label class="btn btn-default">
            <span class="select-image">Select an image</span>
            <span class="change-image">Change</span>
            <input class="image-file" name="ph_image_file" type="file" accept="image/*">
        </label>
        <button class="btn btn-default crop-button">Crop</button>
        <button class="btn btn-default remove-button">Remove</button>
    </div>
</div>
```


## License

PH Image Crop is release under the MIT license. You are free to use, modify and distribute this software, as long as you give me credit.


## Credit
jQuery, Bootstrap, Cropper