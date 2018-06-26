
var moduleName = "";

var i = 0;
$("#select-modules")
    .change(function () {
        $("#select-modules option:selected").each(function () {
            moduleName = $(this).text();

        });

        $.ajax({
            type: "POST",
            data: { "mymodule": moduleName },
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: "postWebScrape",
            success: function (text, textStatus) {

                $('.description').empty();


                $("#moduleoptions").html(text);

                form += "<form class='form-control'>";
                var description = $('div#moduleoptions').children('li');
                $.each(description, function (key, value) {

                    $(".description").append(value);
                });

                var form = "<div data-role='panel' data-title-caption='" + moduleName + "' data-collapsible='true' class='panel-content' id='formpanel"+i+"'>";

                var jsontable = $('.documentation-table').tableToJSON();
                //console.log(jsontable);
                $.each(jsontable, function (key, value) {

                    form += '<label>' + value.Parameter.split(" ")[0].trim();

                    if (value["Choices/Defaults"].indexOf("Choices:") > -1) {
                        var optioncomments;
                        optioncomments = value["Comments"];
                        form += '<select>';
                        var arrayOfChoices = value["Choices/Defaults"].match(/[^ ]+/g);
                        //console.log(arrayOfChoices);
                        $(arrayOfChoices).each(function (index, value) {
                            if (index > 0 && index < 10) {
                                form += `<option>${value}</option>`;
                            }
                        });
                        form += `</select></label><small class='text-muted'>${optioncomments}</small><br><br>`;
                    }

                    else {
                        var comments;
                        comments = value["Comments"];
                        if (value.Parameter.indexOf("required") > -1) {
                            var requiredarray = value.Parameter.match(/[^ ]+/g);
                            $(requiredarray).each(function (index, value) {
                                if (index == 1) {
                                    form += `<input type="text" class="mt-1"  data-validate="${value}" value=""/></label><small class="text-muted">${comments}</small><br><br>`;
                                }
                            });
                        } else {
                            form += `<input type="text" class="mt-1" value=""/></label><small class='text-muted'>${comments}</small><br><br>`;
                        }

                    }

                });
                if (moduleName != "Select a module..") {
                    form += `<button id='generateBtn${i}' class="button info outline" onclick="GenerateYaml(this.id)"><span class="mif-cogs"></span> Generate</button>`;

                    form += "</form>";

                    form += "</div><br>";
                    $(".cell #formgenerated").append(form);
                    i++;

                }
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest + "---" + textStatus + "---" + errorThrown);
            }

        });

        $('#moduleoptions').css('visibility', 'hidden');

    }).change();




function GenerateYaml(btn) {
    var arr = [];
    $('#generatedYamlTextField').removeAttr("hidden");

    var id = btn.replace("generateBtn", "");
    var moduleName = $("#formpanel" + id).attr("data-title-caption");

    jsonobj = { name: "hier komt text van blabla" };

    jsonobj[moduleName] = {};

    $("#formpanel" + id).each(function () {

        $('label').each(function (index, value) {
            jsonobj[moduleName][value.innerText] = "valuehiero";

        });
        arr.push(jsonobj);
        

        $("#yamltextfield").append(json2yaml(arr) + "\n\n");
        
    });
    console.log(arr);
}
