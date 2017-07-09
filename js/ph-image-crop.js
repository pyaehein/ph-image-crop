var cropButton = $(".crop-button")
var cropImage = $("#crop-image")
var removeButton = $(".remove-button")
var imageFile = $(".image-file")
var cropModal = $("#ph-image-crop-modal")
var imgThumbnail = $(".ph-thumbnail")
var currentImage, currentInput, currentSelectInput, currentRatio = 1, currentWidth = 1, currentHeight = 1, currentCanvas = 'false';

$(document).ready(function() {
    removeButton.on("click", function() {
        $(this).siblings("label").children(".image-file").val("")
        $(this).parent().siblings(".ph-img-thumbnail").children(".ph-thumbnail").attr("src", "")
        $(this).hide()
        $(this).parent().siblings(".ph-img-thumbnail").children(".old-thumbnail").show()
        $(this).siblings("label").children(".select-image").show()
        $(this).siblings("label").children(".change-image").hide()
        $(this).siblings(".crop-button").hide()
    })

    imgThumbnail.on("load", function() {
        $(this).siblings(".old-thumbnail").hide()
    })

    cropButton.on("click", function() {
        cropImage.attr("src", $(this).parent().siblings(".ph-img-thumbnail").children(".base-thumbnail").attr("src")),
        currentImage = $(this).parent().siblings(".ph-img-thumbnail").children(".ph-thumbnail")
        currentInput = $(this).parent().siblings(".ph-img-thumbnail").children(".ph-image")
        currentRatio = $(this).parent().parent().attr('data-ratio')
        currentWidth = $(this).parent().parent().attr('data-width')
        currentHeight = $(this).parent().parent().attr('data-height')
        currentCanvas = $(this).parent().parent().attr('data-canvas')
        cropModal.modal("show")
    })

    imageFile.on("change", function() {
        var that = $(this);
        that.siblings(".change-image").show()
        that.siblings(".select-image").hide()
        that.parent().siblings(".crop-button").show()
        that.parent().siblings(".remove-button").show();
        var file = that[0].files[0]
        var reader = new FileReader;
        reader.addEventListener("load", function() {
            cropImage.attr("src", reader.result)
            that.parent().parent().siblings(".ph-img-thumbnail").children(".base-thumbnail").attr("src", reader.result)
        }, false)

        if (file) {
            reader.readAsDataURL(file);
        }

        currentImage = $(this).parent().parent().siblings(".ph-img-thumbnail").children(".ph-thumbnail")
        currentInput = $(this).parent().parent().siblings(".ph-img-thumbnail").children(".ph-image")
        currentRatio = $(this).parent().parent().parent().attr('data-ratio')
        currentWidth = $(this).parent().parent().parent().attr('data-width')
        currentHeight = $(this).parent().parent().parent().attr('data-height')
        currentCanvas = $(this).parent().parent().parent().attr('data-canvas')
        currentSelectInput = $(this)
        cropModal.modal("show")
    })

    cropModal.on("shown.bs.modal", function() {
        cropImage.cropper({
            aspectRatio: eval(currentRatio),
            minCropBoxWidth: eval(currentWidth),
            minCropBoxHeight: eval(currentHeight)
        })
    }).on("hidden.bs.modal", function() {
        var dataURL = cropImage.cropper("getCroppedCanvas").toDataURL("image/jpeg");
        currentImage.attr("src", dataURL)
        if(currentCanvas === 'true') {
            currentInput.val(cropImage.cropper("getCropBoxData "))
        } else {
            currentInput.val(dataURL)
            currentSelectInput.val('')
        }
        cropImage.cropper("destroy")
    })

});