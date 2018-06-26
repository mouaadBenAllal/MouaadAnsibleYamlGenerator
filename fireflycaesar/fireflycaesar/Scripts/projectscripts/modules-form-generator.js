//$('#moduleform').on('click',
//    function () {
//        console.log($('#a').attr('name'));
//        $('#yaml').append($('#a').attr('name'));
//    });


var i = 0;

//$(document).ready(function () {
//    var options = $.getJSON('/Scripts/projectscripts/modules.json', function (data) {
//        $.each(data, function (key, val) {
//            $("#selectbox" + i + "").append($("<option></option>").attr("value", key).text(key));
//        });

//    });
//});


//function generateform(select) {
//    var selected = $(select).val();
//    var obj = $.getJSON('/Scripts/projectscripts/modules.json', function (data) {
//        $.each(data, function (datakey, dataval) {
//            if (selected == datakey) {
//                var form = '<form class="form-control" id="form' + i + '"><div class="form-group"><h1>' + selected + '</h1><br>';


//                $.each(dataval, function (modulenames, moduleparams) {

//                    form += '<label name="' + modulenames + '" for="' + modulenames + i + '">' + modulenames + '</label><br>';
//                    var req = false;
//                    $.each(moduleparams, function (paramattr, attrvalue) {
//                        if (paramattr == 'required' && attrvalue == true) {
//                            req = true;
//                        }

//                        if (paramattr == 'options' && attrvalue != false) {
//                            form += '<select class="form-control" required=' + req + ' id="' + modulenames + i + '" name="' + modulenames + '">';
//                            $.each(attrvalue, function (index, optionsval) {
//                                form += '<option>' + optionsval + '</option>';
//                            });
//                            form += '</select>';
//                        } else if (paramattr == 'options') {
//                            form += '<input class="form-control required=' + req + ' id="' + modulenames + i + '" name="' + modulenames + '">';
//                        }
//                    });
//                });
//                form += '<br><button type="button" onclick="GenerateYamlTextField()" class="btn btn-primary">Generate</button>';
//                form += '</div></form><br><i class="fa fa-plus text-success" id="plusicon' + i + '" aria-hidden="true" style="font-size:36px;" onclick="generateselect()"></i>';
//                $('#moduleform').append(form);
//                $('#selectbox' + i + '').remove();

//                i++;
//            }
//        });
//    });
//}



//function generateselect() {
//    var a = i - 1;
//    $('#plusicon' + a).remove();


//    $.getJSON('/Scripts/projectscripts/modules.json', function (optiondata) {
//        console.log('active');
//        var select = '<select  class="custom-select" style="width:100%;" id="selectbox' + i + '" onchange="generateform(this)">' +
//            '<option selected = "selected" disabled = "disabled" > Choose a module...</option>';
//        $.each(optiondata, function (keys, values) {
//            select += '<option value="' + keys + '">' + keys + '</option>';
//        });
//        select += '</select>';
//        console.log(select);

//        $('#selectarea').append(select);
//    });
//}