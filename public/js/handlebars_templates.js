(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dashboard_device_and_feeds_dropdown_menu_item'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "   <li class=\"feed\" id=\"feed_menu_item_"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" feedId=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"#\"><i class=\"feed-icon fa placeholder\"></i> "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<li class=\"dropdown-header device\" role=\"presentation\">"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.feeds : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['dashboard_device_and_feeds_sidebar_menu_item'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "         <div class=\"feed\">\n            <input type=\"radio\" id=\"feed_radio_button_"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" name=\"feed_radio_button\" class=\"feed_radio_button\" value=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><label for=\"feed_radio_button_"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\n         </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"device_and_feeds\">\n   <div class=\"device\">"
    + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n   <div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.feeds : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "   </div>\n</div>";
},"useData":true});
templates['device_and_feeds'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "      <div class=\"feeds_container\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.feeds : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "            <div class=\"panel panel-default\">\n               <div class=\"panel-heading\"><h3 class=\"panel-title\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3></div>\n               <div class=\"panel-body\">\n                  <div class=\"feed_table\">\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Visibility:\n                        </div>\n                        <div class=\"table_cell_value capitalize\">\n                           "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isPublic : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Exposure:\n                        </div>\n                        <div class=\"table_cell_value capitalize\">\n                           "
    + alias3(((helper = (helper = helpers.exposure || (depth0 != null ? depth0.exposure : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"exposure","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Time Range:\n                        </div>\n                        <div class=\"table_cell_value\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.hasData : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Last Upload:\n                        </div>\n                        <div class=\"table_cell_value\">\n                           "
    + alias3(((helper = (helper = helpers.lastUploadFormatted || (depth0 != null ? depth0.lastUploadFormatted : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastUploadFormatted","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Created:\n                        </div>\n                        <div class=\"table_cell_value\">\n                           "
    + alias3(((helper = (helper = helpers.createdFormatted || (depth0 != null ? depth0.createdFormatted : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"createdFormatted","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                  </div>\n\n               </div>\n               <div class=\"panel-footer feed_api_info\">\n                  <div class=\"feed_table\" style=\"font-size: smaller\">\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           ID:\n                        </div>\n                        <div class=\"table_cell_value api_key\">\n                           "
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           API Key (read-only):\n                        </div>\n                        <div class=\"table_cell_value api_key\">\n                           "
    + alias3(((helper = (helper = helpers.apiKeyReadOnly || (depth0 != null ? depth0.apiKeyReadOnly : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"apiKeyReadOnly","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           API Key (read-write):\n                        </div>\n                        <div class=\"table_cell_value api_key\">\n                           "
    + alias3(((helper = (helper = helpers.apiKey || (depth0 != null ? depth0.apiKey : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"apiKey","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                  </div>\n\n               </div>\n            </div>\n";
},"3":function(depth0,helpers,partials,data) {
    return "public";
},"5":function(depth0,helpers,partials,data) {
    return "private";
},"7":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                              "
    + alias3(((helper = (helper = helpers.minTimeSecsFormatted || (depth0 != null ? depth0.minTimeSecsFormatted : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"minTimeSecsFormatted","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.maxTimeSecsFormatted || (depth0 != null ? depth0.maxTimeSecsFormatted : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"maxTimeSecsFormatted","hash":{},"data":data}) : helper)))
    + "\n";
},"9":function(depth0,helpers,partials,data) {
    return "                              n/a\n";
},"11":function(depth0,helpers,partials,data) {
    return "      <div class=\"panel-body feeds_container\">\n         You have not yet defined an installation location for this Speck. Please use\n         the <a href=\"/software\">Speck app</a> to finish the upload configuration\n         process and specify where you have installed this Speck.\n      </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\"device_list_item_"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"panel panel-primary device_list_item\">\n   <div class=\"panel-heading\">\n      <div class=\"pull-right serial_number\">"
    + alias3(((helper = (helper = helpers.serialNumberFormatted || (depth0 != null ? depth0.serialNumberFormatted : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"serialNumberFormatted","hash":{},"data":data}) : helper)))
    + "</div>\n      <h3 class=\"panel-title\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n   </div>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.feeds : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['feed_list_item'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\"feed_list_item_"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"feed_list_item noselect\">\n   <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n      <tr valign=\"middle\">\n         <td>\n            <div>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n            <div>Last upload: "
    + alias3(((helper = (helper = helpers.lastUploadFormatted || (depth0 != null ? depth0.lastUploadFormatted : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"lastUploadFormatted","hash":{},"data":data}) : helper)))
    + "</div>\n         </td>\n         <td align=\"right\">\n            <div class=\"checkmark_icon_container\" style=\"display:none;margin-left:10px\"></div>\n         </td>\n      </tr>\n   </table>\n</div>";
},"useData":true});
templates['grapher'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<table id=\"grapher\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\">\n   <tr>\n      <td>\n         <div id=\"date_axis_container\">\n            <div id=\"date_axis\" class=\"date_axis\"></div>\n            <div id=\"value_label\"></div>\n         </div>\n      </td>\n      <td>&nbsp;</td>\n   </tr>\n   <tr>\n      <td>\n         <div id=\"plot\" class=\"plot\" style=\"height:"
    + alias3(((helper = (helper = helpers.plotHeight || (depth0 != null ? depth0.plotHeight : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"plotHeight","hash":{},"data":data}) : helper)))
    + "px; border: 1px solid black;\"></div>\n      </td>\n      <td>\n         <div id=\"y_axis\" class=\"y_axis\" style=\"position:relative;height:"
    + alias3(((helper = (helper = helpers.plotHeight || (depth0 != null ? depth0.plotHeight : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"plotHeight","hash":{},"data":data}) : helper)))
    + "px\">\n            <div id=\"y_axis_label\" class=\"rotate_90 y_axis_label\">"
    + ((stack1 = ((helper = (helper = helpers.yAxisLabel || (depth0 != null ? depth0.yAxisLabel : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"yAxisLabel","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n         </div>\n      </td>\n   </tr>\n</table>\n";
},"useData":true});
templates['grapher_channel_menu_item'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li class=\"menu_item\"><a href=\"#\" class=\""
    + alias3(((helper = (helper = helpers.cssClass || (depth0 != null ? depth0.cssClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cssClass","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.channelName || (depth0 != null ? depth0.channelName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"channelName","hash":{},"data":data}) : helper)))
    + "</a></li>";
},"useData":true});
templates['grapher_time_range_menu_item'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li id=\"time_range_menu_item_"
    + alias3(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"menu_item\"><a href=\"#\" class=\""
    + alias3(((helper = (helper = helpers.cssClass || (depth0 != null ? depth0.cssClass : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cssClass","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a></li>";
},"useData":true});
templates['grapher_value_range_color_box'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\"level_"
    + alias3(((helper = (helper = helpers.level || (depth0 != null ? depth0.level : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"level","hash":{},"data":data}) : helper)))
    + "\" class=\"color_box\" style=\"background-color:"
    + alias3(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"color","hash":{},"data":data}) : helper)))
    + "; z-index:"
    + alias3(((helper = (helper = helpers.zIndex || (depth0 != null ? depth0.zIndex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"zIndex","hash":{},"data":data}) : helper)))
    + ";\"></div>";
},"useData":true});
})();