(function ($) {
    $.fn.phImageCrop = function (options) {

        var settings = $.extend({
            defaultImage: '',
            name: 'ph_images[]',
            fileName: '',
            type: 'base64',
            cropper: {
                aspectRatio: 1,
                minCropBoxWidth: 1,
                minCropBoxHeight: 1
            }
        }, options)

        return this.each(function () {

            // Increase index for multiple instance. We can't use each's index because multiple calling can be happen.
            if(typeof window.phImageIndex !== 'undefined') {
                window.phImageIndex = window.phImageIndex + 1
            } else {
                window.phImageIndex = 0
            }
            var index = window.phImageIndex

            var phHtml = '<div class="ph-img-thumbnail" style="padding-bottom: 10px">' +
                '<img style="padding: 4px; border: 1px solid #ddd; border-radius: 4px;" class="old-thumbnail" id="ph-old-' + index + '" src="' + settings.defaultImage + '">' +
                '<img style="padding: 4px; border: 1px solid #ddd; border-radius: 4px; display: none" class="ph-thumbnail" id="ph-thumb-' + index + '">' +
                '<img style="display: none" class="base-thumbnail" id="ph-base-' + index + '">' +
                '<input class="ph-image" id="ph-image-' + index + '" type="hidden" name="' + settings.name + '">' +
                '</div>' +
                '<div>' +
                '<label class="btn btn-default">' +
                '<span class="select-image" id="select-image-' + index + '">Select an image</span>' +
                '<span style="display: none" class="change-image" id="change-image-' + index + '">Change</span>' +
                '<input style="display: none" class="image-file" id="ph-image-file-' + index + '" ' + ((settings.fileName !== '') ? 'name="' + settings.fileName + '" ' : '') + 'type="file" accept="image/*">' +
                '</label>' +
                '<button style="display: none" id="crop-button-' + index + '" class="btn btn-default crop-button">Crop</button>' +
                '<button style="display: none" id="remove-button-' + index + '" class="btn btn-default remove-button">Remove</button>' +
                '</div>'

            $(this).addClass('ph-image-crop')
                .attr('id', 'ph-image-crop-' + index)
                .attr('data-ratio', settings.cropper.aspectRatio)
                .attr('data-width', settings.cropper.minCropBoxWidth)
                .attr('data-height', settings.cropper.minCropBoxHeight)
                .attr('data-type', settings.type);
            $(this).html(phHtml)

            //Remove button click for each item
            $("#remove-button-" + index).on("click", function() {
                $("#ph-image-file-" + index).val("")
                $("#ph-thumb-" + index).attr("src", "")
                $("#ph-thumb-" + index).hide()
                $(this).hide()
                $(this).parent().removeClass("btn-group")
                $("#ph-old-" + index).show()
                $("#select-image-" + index).show()
                $("#change-image-" + index).hide()
                $("#crop-button-" + index).hide()
            })

            //Hide default image when we browse image
            $("#ph-thumb-" + index).on("load", function() {
                $("#ph-old-" + index).hide()
                $(this).show()
            })

            //Set Crop Index for placing cropped image
            $("#crop-button-" + index).on("click", function() {
                $("#crop-image").attr("src", $("#ph-base-" + index).attr("src"))
                window.phImageCropIndex = index
                $("#ph-image-crop-modal").modal("show")
            })

            //When we detect image browse read base64, put it to cropper modal
            $("#ph-image-file-" + index).on("change", function() {
                var that = $(this);
                that.parent().parent().addClass("btn-group")
                $("#change-image-" + index).show()
                $("#select-image-" + index).hide()
                $("#crop-button-" + index).show()
                $("#remove-button-" + index).show();
                var file = that[0].files[0]
                var reader = new FileReader;
                reader.addEventListener("load", function() {
                    $("#crop-image").attr("src", reader.result)
                    $("#ph-base-" + index).attr("src", reader.result)
                }, false)

                if (file) {
                    reader.readAsDataURL(file);
                }
                window.phImageCropIndex = index
                $("#ph-image-crop-modal").modal("show")
            })

            //We only need to run once it, because we use same modal for all images.
            if(window.phImageIndex === 0) {
                $("#ph-image-crop-modal").on("shown.bs.modal", function() {
                    var tempCrop = $("#ph-image-crop-" + window.phImageCropIndex)
                    $("#crop-image").cropper({
                        aspectRatio: tempCrop.attr('data-ratio'),
                        minCropBoxWidth: tempCrop.attr('data-width'),
                        minCropBoxHeight: tempCrop.attr('data-height')
                    })
                }).on("hidden.bs.modal", function() {
                    var dataURL = $("#crop-image").cropper("getCroppedCanvas", {
                        fillColor: '#fff'
                    }).toDataURL("image/jpeg");
                    $("#ph-thumb-" + window.phImageCropIndex).attr("src", dataURL)
                    if(settings.type === 'canvas') {
                        $("#ph-image-" + window.phImageCropIndex).val($("#crop-image").cropper("getCropBoxData "))
                    } else if(settings.type === 'base64') {
                        $("#ph-image-" + window.phImageCropIndex).val(dataURL)
                        $("#ph-image-file-" + window.phImageCropIndex).val('')
                    }
                    $("#crop-image").cropper("destroy")
                })
            }

        })

    }
}(jQuery))