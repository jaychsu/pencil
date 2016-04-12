function MainMenu (menu) {
    Menu.call(this);
    this.setup();
    this.itemRecentFile;
}

__extend(Menu, MainMenu);

MainMenu.prototype.getTemplatePath = function () {
    return this.getTemplatePrefix() + "Menu.xhtml";
};

MainMenu.prototype.setup = function () {
    UICommandManager.register({
        key: "aboutDialogCommand",
        label: "About...",
        isValid: function () { return true; },
        run: function () {
            var dialog = new AboutDialog();
            dialog.open();
        },
        shortcut: "Ctrl+A"
    });

    UICommandManager.register({
        key: "settingAllCommand",
        label: "Setting",
        isValid: function () { return true; },
        run: function () {
        }
    });

    var thiz = this;
    var createRecentSubMenuElement = function(fileName) {
        var index = fileName.indexOf("/");
        var name = fileName.substring(index);
        var key = "open" + name + "Document" ;
        var element = UICommandManager.register({
            key: key,
            label: name,
            run: function () {
                Pencil.controller.loadDocument(name);
                thiz.hideMenu();
            }
        });
        var setElement = UICommandManager.getCommand(key);
        return setElement;
    }

    var files = Config.get("recent-documents");
    if (files) {
        var elements = [];
        for (var i = 0; i < files.length; i++) {
            elements.push(createRecentSubMenuElement(files[i]));
        }
        this.itemRecentFile = elements;
    }
    // Register button
    this.register(UICommandManager.getCommand("openDocumentCommand"));
    this.register(UICommandManager.getCommand("saveDocumentCommand"));
    this.register(UICommandManager.getCommand("saveAsDocumentCommand"));
    this.register(UICommandManager.getCommand("exportPageAsPNGButton"));
    this.register(UICommandManager.getCommand("exportSelectionAsPNGButton"));
    var check = false;
    if(thiz.itemRecentFile) {
        checkRecentButton = true;
    }
    thiz.register({
        label: "Recent files " ,
        isEnabled: function() { return checkRecentButton },
        run: function () {
         },
        type: "SubMenu",
        subItems:  thiz.itemRecentFile
    });
    this.register(UICommandManager.getCommand("settingAllCommand"));
    this.register(UICommandManager.getCommand("aboutDialogCommand"));

}