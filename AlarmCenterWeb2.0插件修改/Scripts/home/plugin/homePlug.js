; (function ($, window, document, undefined) {
    //tab页插件
    $.fn.tabAndTable = function (opt) {
        this.defaults = {
            tab: [],//{href:'#xxx',name:''}
            table: [],//{id:'#xxx',th:['',''],tableID:''}
            callBack: null
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var option = this.options;
        var tabs = '';
        for (var i = 0; i < option.tab.length; i++) {
            tabs += '<li data-action="tabList" href="' + option.tab[i].href + '"><span>' + option.tab[i].name + '</span></li>';
        }
        var tables = '';
        for (var i = 0; i < option.table.length; i++) {
            tables += '<article id="' + option.table[i].id + '" class="tab-pane animated">';
            tables += '<div class="tableAuto alarmReal"><table id="' + option.table[i].tableID + '"><thead><tr>';
            for (var j = 0; j < option.table[i].th.length; j++) {
                tables += '<th>' + option.table[i].th[j] + '</th>';
            }
            tables += '</tr></thead><tbody></tbody></table></div></article>';
        }
        var tabHTMLs = '<ul class="nav-tabList">' +
                        tabs +
                        '</ul>' +
                        '<div class="tab-content">' +
                        tables +
                        '</div>';
        var tabHTML = $(tabHTMLs);
        tabHTML.children('li:first').addClass('active');
        tabHTML.children('article:first').addClass('active');
        $(this).append(tabHTML).ready(function () {
            if (option.callBack != null) {
                option.callBack();
            }
        });
        tabHTML = null;
        return this;
    };
})(jQuery, window, document);