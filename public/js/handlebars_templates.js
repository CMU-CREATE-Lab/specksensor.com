(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dashboard_device_and_feeds_dropdown_menu_item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "   <li class=\"feed\" id=\"feed_menu_item_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" feedId=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"#\" onclick=\"return false;\"><i class=\"feed-icon fa placeholder\"></i> "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<li class=\"dropdown-header device\" role=\"presentation\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</li>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.feeds : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['dashboard_device_and_feeds_sidebar_menu_item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "         <div class=\"feed\">\n            <input type=\"radio\" id=\"feed_radio_button_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" name=\"feed_radio_button\" class=\"feed_radio_button\" value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><label for=\"feed_radio_button_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\n         </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"device_and_feeds\">\n   <div class=\"device\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n   <div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.feeds : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   </div>\n</div>";
},"useData":true});
templates['device_and_feeds'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      <div class=\"feeds_container\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.feeds : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"panel panel-default\">\n               <div class=\"panel-heading\"><h3 class=\"panel-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3></div>\n               <div class=\"panel-body\">\n                  <div class=\"feed_table\">\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Visibility:\n                        </div>\n                        <div class=\"table_cell_value capitalize\">\n                           "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isPublic : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Exposure:\n                        </div>\n                        <div class=\"table_cell_value capitalize\">\n                           "
    + alias4(((helper = (helper = helpers.exposure || (depth0 != null ? depth0.exposure : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"exposure","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Time Range:\n                        </div>\n                        <div class=\"table_cell_value\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasData : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Last Upload:\n                        </div>\n                        <div class=\"table_cell_value\">\n                           "
    + alias4(((helper = (helper = helpers.lastUploadFormatted || (depth0 != null ? depth0.lastUploadFormatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastUploadFormatted","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           Created:\n                        </div>\n                        <div class=\"table_cell_value\">\n                           "
    + alias4(((helper = (helper = helpers.createdFormatted || (depth0 != null ? depth0.createdFormatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"createdFormatted","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                  </div>\n\n               </div>\n               <div class=\"panel-footer feed_api_info\">\n                  <div class=\"feed_table\" style=\"font-size: smaller\">\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           ID:\n                        </div>\n                        <div class=\"table_cell_value api_key\">\n                           "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           API Key (read-only):\n                        </div>\n                        <div class=\"table_cell_value api_key\">\n                           "
    + alias4(((helper = (helper = helpers.apiKeyReadOnly || (depth0 != null ? depth0.apiKeyReadOnly : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"apiKeyReadOnly","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                     <div class=\"table_row\">\n                        <div class=\"table_cell_label\">\n                           API Key (read-write):\n                        </div>\n                        <div class=\"table_cell_value api_key\">\n                           "
    + alias4(((helper = (helper = helpers.apiKey || (depth0 != null ? depth0.apiKey : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"apiKey","hash":{},"data":data}) : helper)))
    + "\n                        </div>\n                     </div>\n                  </div>\n\n               </div>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "public";
},"5":function(container,depth0,helpers,partials,data) {
    return "private";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                              "
    + alias4(((helper = (helper = helpers.minTimeSecsFormatted || (depth0 != null ? depth0.minTimeSecsFormatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minTimeSecsFormatted","hash":{},"data":data}) : helper)))
    + " - "
    + alias4(((helper = (helper = helpers.maxTimeSecsFormatted || (depth0 != null ? depth0.maxTimeSecsFormatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maxTimeSecsFormatted","hash":{},"data":data}) : helper)))
    + "\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                              n/a\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "      <div class=\"panel-body feeds_container\">\n         You have not yet defined an installation location for this Speck. Please use\n         the <a href=\"/support/software\">Speck app</a> to finish the upload configuration\n         process and specify where you have installed this Speck.\n      </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"device_list_item_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"panel panel-primary device_list_item\">\n   <div class=\"panel-heading\">\n      <div class=\"pull-right serial_number\">"
    + alias4(((helper = (helper = helpers.serialNumberFormatted || (depth0 != null ? depth0.serialNumberFormatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serialNumberFormatted","hash":{},"data":data}) : helper)))
    + "</div>\n      <h3 class=\"panel-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n   </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.feeds : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['feed_list_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"feed_list_item_"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"feed_list_item noselect\">\n   <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n      <tr valign=\"middle\">\n         <td>\n            <div>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n            <div>Last upload: "
    + alias4(((helper = (helper = helpers.lastUploadFormatted || (depth0 != null ? depth0.lastUploadFormatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastUploadFormatted","hash":{},"data":data}) : helper)))
    + "</div>\n         </td>\n         <td align=\"right\">\n            <div class=\"checkmark_icon_container\" style=\"display:none;margin-left:10px\"></div>\n         </td>\n      </tr>\n   </table>\n</div>";
},"useData":true});
templates['grapher'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<table id=\"grapher\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\">\n   <tr>\n      <td>\n         <div id=\"date_axis_container\">\n            <div id=\"date_axis\" class=\"date_axis\"></div>\n            <div id=\"value_label\"></div>\n         </div>\n      </td>\n      <td>&nbsp;</td>\n   </tr>\n   <tr>\n      <td>\n         <div id=\"plot\" class=\"plot\" style=\"height:"
    + alias4(((helper = (helper = helpers.plotHeight || (depth0 != null ? depth0.plotHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plotHeight","hash":{},"data":data}) : helper)))
    + "px; border: 1px solid black;\"></div>\n      </td>\n      <td>\n         <div id=\"y_axis\" class=\"y_axis\" style=\"position:relative;height:"
    + alias4(((helper = (helper = helpers.plotHeight || (depth0 != null ? depth0.plotHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plotHeight","hash":{},"data":data}) : helper)))
    + "px\">\n            <div id=\"y_axis_label\" class=\"rotate_90 y_axis_label\">"
    + ((stack1 = ((helper = (helper = helpers.yAxisLabel || (depth0 != null ? depth0.yAxisLabel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"yAxisLabel","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n         </div>\n      </td>\n   </tr>\n</table>\n";
},"useData":true});
templates['grapher_channel_menu_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"menu_item\"><a href=\"#\" onclick=\"return false;\" class=\""
    + alias4(((helper = (helper = helpers.cssClass || (depth0 != null ? depth0.cssClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cssClass","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.channelName || (depth0 != null ? depth0.channelName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data}) : helper)))
    + "</a></li>";
},"useData":true});
templates['grapher_time_range_menu_item'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li id=\"time_range_menu_item_"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"menu_item\"><a href=\"#\" onclick=\"return false;\" class=\""
    + alias4(((helper = (helper = helpers.cssClass || (depth0 != null ? depth0.cssClass : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cssClass","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a></li>";
},"useData":true});
templates['grapher_value_range_color_box'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"level_"
    + alias4(((helper = (helper = helpers.level || (depth0 != null ? depth0.level : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"level","hash":{},"data":data}) : helper)))
    + "\" class=\"color_box\" style=\"background-color:"
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "; z-index:"
    + alias4(((helper = (helper = helpers.zIndex || (depth0 != null ? depth0.zIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"zIndex","hash":{},"data":data}) : helper)))
    + ";\"></div>";
},"useData":true});
templates['public_data_geocode_failed'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-danger\">Sorry, that doesn't appear to be a valid location or address.</div>\n";
},"useData":true});
templates['public_data_geocode_found_one'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "      It recorded a PM<sub>2.5</sub> value of "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.dataSample : depth0)) != null ? stack1.value : stack1), depth0))
    + " &mu;g/m<sup>3</sup> at "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.dataSample : depth0)) != null ? stack1.timeStr : stack1), depth0))
    + ".\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"alert alert-success\">\n   The closest government station with recent PM<sub>2.5</sub> data is <a href=\"javascript:setFeedSelected("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nearest : depth0)) != null ? stack1.id : stack1), depth0))
    + ");\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nearest : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>.\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.dataSample : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   A plot of its historical data is shown below.\n</div>";
},"useData":true});
templates['public_data_geocode_found_two'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "      It recorded a PM<sub>2.5</sub> value of "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nearestDataSample : depth0)) != null ? stack1.value : stack1), depth0))
    + " &mu;g/m<sup>3</sup> at "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nearestDataSample : depth0)) != null ? stack1.timeStr : stack1), depth0))
    + ".\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "      ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.mostRecentDataSample : depth0)) != null ? stack1.value : stack1), depth0))
    + " &mu;g/m<sup>3</sup>)\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing, alias5="function";

  return "<div class=\"alert alert-success\">\n   The closest government sensor with recent PM<sub>2.5</sub> data is\n   <a href=\"javascript:setFeedSelected("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nearest : depth0)) != null ? stack1.id : stack1), depth0))
    + ");\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.nearest : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>.\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.nearestDataSample : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   A plot of its historical data is shown below.\n   Alternatively, the <a href=\"javascript:setFeedSelected("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mostRecent : depth0)) != null ? stack1.id : stack1), depth0))
    + ");\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.mostRecent : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n   station is "
    + alias2(((helper = (helper = helpers.distanceDiffKm || (depth0 != null ? depth0.distanceDiffKm : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"distanceDiffKm","hash":{},"data":data}) : helper)))
    + " km ("
    + alias2(((helper = (helper = helpers.distanceDiffMi || (depth0 != null ? depth0.distanceDiffMi : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"distanceDiffMi","hash":{},"data":data}) : helper)))
    + " mi) further away, but has data\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.mostRecentDataSample : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   which is more recent by\n   "
    + alias2(((helper = (helper = helpers.timeDiff || (depth0 != null ? depth0.timeDiff : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"timeDiff","hash":{},"data":data}) : helper)))
    + " hour"
    + alias2(((helper = (helper = helpers.hourPlurality || (depth0 != null ? depth0.hourPlurality : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"hourPlurality","hash":{},"data":data}) : helper)))
    + ".\n</div>";
},"useData":true});
templates['public_data_no_nearby_stations'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-warning\">\n   Sorry, there are no government stations with recent PM<sub>2.5</sub> data near the specified location, or no such\n   stations exist in our database.\n</div>";
},"useData":true});
})();