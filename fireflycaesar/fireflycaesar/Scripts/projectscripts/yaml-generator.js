function GenerateYamlTextField() {
    var yaml = '';
    $("#moduleform *").filter(":input").each(function (i, child) {
        if (!$(child).is('button'))
            yaml += $(child).attr('name') + " " + $(child).val() + "\n";
    });
    $('#generatedYamlTextField').removeAttr("hidden");
    $('#yamltextfield').val(yaml);
}2