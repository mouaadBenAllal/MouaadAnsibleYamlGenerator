$(document).ready(function () {
    $("#firstoption").html("Loading...");
    $.get("http://docs.ansible.com/ansible/latest/modules/",
        function(response) {
            var table = $(response).find("tbody tr");
            var td = $(table).find("td");
            var a = $(td).find("a[href*='_module']");
            $.each(a,
                function(index,module) {
                    var href = $(module).attr("href");
                    var modules = href.replace(".html", "");
                    $("#selectbox0").append("<option>"+modules+"</option>");
                });
            $("#firstoption").html("Choose a module...");
        });
    
});
var i = 0;
function generateform(select) {
    var form = "<form id='generatedform" + i + "' class='form-control'><div class='form-group'><h1>" + $(select).val() + "</h1>";
    form += "<label>Name</label><input id='namemodule' type='text' class='form-control'>"
    $.get("http://docs.ansible.com/ansible/latest/modules/" + $(select).val() + ".html",
        function(response) {
            var paramtable = $(response).find(".documentation-table tbody");
            var tablerows = $(paramtable).find(".return-value-column");
            $.each(tablerows,
                function (index, tablerow) {
                    var firstrow = $(tablerow).find("td").eq(0);
                    var secondrow = $(tablerow).find("td").eq(1);
                    form += "<label>" + $(firstrow).find("b").html() + "</label>";
                    if ($(secondrow).find("b").html()) {
                        switch ($(secondrow).find("b").html()) {
                            case "Default:":
                                form += "<input type='text' class='form-control' value='" + $(this).find("div[style*='blue']").html() + "'>";
                                break;
                            case "Choices:":
                                form += "<select class='form-control'>"
                                $(secondrow).find("li").each(function(index, val) {
                                    if ($(val).find("b").html()) {;
                                        form += "<option>" + $(val).find("b").html() + "</option>";
                                    } else {
                                        form += "<option>" + $(val).html() + "</option>";
                                    }

                                });
                                form += "</select>"
                                break;
                        }
                    } else {
                        form += "<input class='form-control' type='text'>";
                    }
                });
            form += "</div></form><br>";
            $("#moduleform").append(form);
            $("#generatebtn").attr("hidden", false);
            i++;
        });
}

function generateYAML() {
    var YAML = "";
    var forms = $("#moduleform").find("form div");
    $(forms).each(function (index, val) {
        YAML += "- name: " + $(val).children().filter("#namemodule") + "\n";

        $(val).children().each(function (index, v) {
            switch (v.tagName) {
                case "H1":
                    YAML += "  "+$(v).html().replace('_module','')+": \n";
                    
                    break;
                case "LABEL":
                    if ($(v).html() != "Name") {
                        YAML += "    " + $(v).html() + ": "
                    }
                    break;
                case "INPUT":
                    if ($(v).attr("id") != "namemodule") {
                        YAML += $(v).val() + "\n"
                    }
                    break;
                case "SELECT":
                    YAML += $(v).val() + "\n"
                    break;
                default:
                    console.log("IDK WHAT TO DO!!!");
                    break;
            }
            
        });
        $('#generatedYamlTextField').removeAttr("hidden");
        $('#yamltextfield').val(YAML);
    });
}