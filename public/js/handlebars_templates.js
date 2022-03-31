(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['daily_stats_calendar_and_table'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "         <span class=\"section_subtitle\">("
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":4,"column":41},"end":{"line":4,"column":56}}}) : helper)))
    + ")</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "               <td class=\"header_cell\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</td>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":30,"column":26},"end":{"line":30,"column":54}}}),{"name":"with","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":30,"column":18},"end":{"line":32,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"level0Perc") : depth0),"*",100,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":31,"column":21},"end":{"line":31,"column":48}}}))
    + "\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":41,"column":26},"end":{"line":41,"column":54}}}),{"name":"with","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":41,"column":18},"end":{"line":43,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"level1Perc") : depth0),"*",100,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":42,"column":21},"end":{"line":42,"column":48}}}))
    + "\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":52,"column":26},"end":{"line":52,"column":54}}}),{"name":"with","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":52,"column":18},"end":{"line":54,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"level2Perc") : depth0),"*",100,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":53,"column":21},"end":{"line":53,"column":48}}}))
    + "\n";
},"14":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":63,"column":26},"end":{"line":63,"column":54}}}),{"name":"with","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":63,"column":18},"end":{"line":65,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"level3Perc") : depth0),"*",100,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":64,"column":21},"end":{"line":64,"column":48}}}))
    + "\n";
},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":74,"column":26},"end":{"line":74,"column":54}}}),{"name":"with","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":74,"column":18},"end":{"line":76,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"level4Perc") : depth0),"*",100,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":75,"column":21},"end":{"line":75,"column":48}}}))
    + "\n";
},"20":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":85,"column":26},"end":{"line":85,"column":54}}}),{"name":"with","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":85,"column":18},"end":{"line":87,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"level5Perc") : depth0),"*",100,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":86,"column":21},"end":{"line":86,"column":48}}}))
    + "\n";
},"23":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"bar_graph_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":96,"column":26},"end":{"line":96,"column":54}}}),{"name":"with","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":96,"column":18},"end":{"line":105,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     <div class=\"bar_graph\">\n                        <div class=\"bar_graph_item bar_graph_item0 level0\" style=\"height:"
    + alias3((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"level0Perc") : depth0),"*",30,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":98,"column":89},"end":{"line":98,"column":115}}}))
    + "px;\"></div>\n                        <div class=\"bar_graph_item bar_graph_item1 level1\" style=\"height:"
    + alias3((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"level1Perc") : depth0),"*",30,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":99,"column":89},"end":{"line":99,"column":115}}}))
    + "px;\"></div>\n                        <div class=\"bar_graph_item bar_graph_item2 level2\" style=\"height:"
    + alias3((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"level2Perc") : depth0),"*",30,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":100,"column":89},"end":{"line":100,"column":115}}}))
    + "px;\"></div>\n                        <div class=\"bar_graph_item bar_graph_item3 level3\" style=\"height:"
    + alias3((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"level3Perc") : depth0),"*",30,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":101,"column":89},"end":{"line":101,"column":115}}}))
    + "px;\"></div>\n                        <div class=\"bar_graph_item bar_graph_item4 level4\" style=\"height:"
    + alias3((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"level4Perc") : depth0),"*",30,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":102,"column":89},"end":{"line":102,"column":115}}}))
    + "px;\"></div>\n                        <div class=\"bar_graph_item bar_graph_item5 level5\" style=\"height:"
    + alias3((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"level5Perc") : depth0),"*",30,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":103,"column":89},"end":{"line":103,"column":115}}}))
    + "px;\"></div>\n                     </div>\n";
},"26":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":135,"column":26},"end":{"line":135,"column":54}}}),{"name":"with","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":135,"column":18},"end":{"line":137,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"level0") || (depth0 != null ? lookupProperty(depth0,"level0") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"level0","hash":{},"data":data,"loc":{"start":{"line":136,"column":21},"end":{"line":136,"column":31}}}) : helper)))
    + "\n";
},"29":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":146,"column":26},"end":{"line":146,"column":54}}}),{"name":"with","hash":{},"fn":container.program(30, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":146,"column":18},"end":{"line":148,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"30":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"level1") || (depth0 != null ? lookupProperty(depth0,"level1") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"level1","hash":{},"data":data,"loc":{"start":{"line":147,"column":21},"end":{"line":147,"column":31}}}) : helper)))
    + "\n";
},"32":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":157,"column":26},"end":{"line":157,"column":54}}}),{"name":"with","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":157,"column":18},"end":{"line":159,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"level2") || (depth0 != null ? lookupProperty(depth0,"level2") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"level2","hash":{},"data":data,"loc":{"start":{"line":158,"column":21},"end":{"line":158,"column":31}}}) : helper)))
    + "\n";
},"35":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":168,"column":26},"end":{"line":168,"column":54}}}),{"name":"with","hash":{},"fn":container.program(36, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":168,"column":18},"end":{"line":170,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"36":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"level3") || (depth0 != null ? lookupProperty(depth0,"level3") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"level3","hash":{},"data":data,"loc":{"start":{"line":169,"column":21},"end":{"line":169,"column":31}}}) : helper)))
    + "\n";
},"38":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":179,"column":26},"end":{"line":179,"column":54}}}),{"name":"with","hash":{},"fn":container.program(39, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":179,"column":18},"end":{"line":181,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"39":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"level4") || (depth0 != null ? lookupProperty(depth0,"level4") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"level4","hash":{},"data":data,"loc":{"start":{"line":180,"column":21},"end":{"line":180,"column":31}}}) : helper)))
    + "\n";
},"41":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <td class=\"value_cell\">\n"
    + ((stack1 = lookupProperty(helpers,"with").call(alias1,lookupProperty(helpers,"lookup").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"statsByYear") : depths[1]),blockParams[0][0],{"name":"lookup","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":190,"column":26},"end":{"line":190,"column":54}}}),{"name":"with","hash":{},"fn":container.program(42, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":190,"column":18},"end":{"line":192,"column":27}}})) != null ? stack1 : "")
    + "               </td>\n";
},"42":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                     "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"level5") || (depth0 != null ? lookupProperty(depth0,"level5") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"level5","hash":{},"data":data,"loc":{"start":{"line":191,"column":21},"end":{"line":191,"column":31}}}) : helper)))
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"daily_stats_calendar_and_table\">\n   <div class=\"section_title\">PM<sub>2.5</sub> Daily Maxima\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasMultipleChannels") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":3,"column":6},"end":{"line":5,"column":13}}})) != null ? stack1 : "")
    + "   </div>\n\n   <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"centered_table\">\n      <tr>\n         <td>\n            <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"calendarElementId") || (depth0 != null ? lookupProperty(depth0,"calendarElementId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"calendarElementId","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":11,"column":21},"end":{"line":11,"column":42}}}) : helper)))
    + "\" class=\"daily_stats_calendar\"></div>\n         </td>\n      </tr>\n   </table>\n\n   <div class=\"daily_stats_table perc_table pm_2_5_scale\">\n      <div class=\"section_title\">Dirty Days: Percentages</div>\n      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"centered_table\">\n         <tr>\n            <td>&nbsp;</td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":21,"column":12},"end":{"line":23,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"header_cell\">All</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level0\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":28,"column":12},"end":{"line":34,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level0Perc") : stack1),"*",100,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":35,"column":35},"end":{"line":35,"column":78}}}))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level1\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":39,"column":12},"end":{"line":45,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level1Perc") : stack1),"*",100,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":46,"column":35},"end":{"line":46,"column":78}}}))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level2\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":50,"column":12},"end":{"line":56,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level2Perc") : stack1),"*",100,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":57,"column":35},"end":{"line":57,"column":78}}}))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level3\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":61,"column":12},"end":{"line":67,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level3Perc") : stack1),"*",100,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":68,"column":35},"end":{"line":68,"column":78}}}))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level4\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":72,"column":12},"end":{"line":78,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level4Perc") : stack1),"*",100,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":79,"column":35},"end":{"line":79,"column":78}}}))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level5\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":83,"column":12},"end":{"line":89,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level5Perc") : stack1),"*",100,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":90,"column":35},"end":{"line":90,"column":78}}}))
    + "</td>\n         </tr>\n         <tr>\n            <td>&nbsp;</td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":94,"column":12},"end":{"line":107,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"bar_graph_cell\">\n               <div class=\"bar_graph\">\n                  <div class=\"bar_graph_item bar_graph_item0 level0\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level0Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":110,"column":83},"end":{"line":110,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item1 level1\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level1Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":111,"column":83},"end":{"line":111,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item2 level2\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level2Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":112,"column":83},"end":{"line":112,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item3 level3\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level3Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":113,"column":83},"end":{"line":113,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item4 level4\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level4Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":114,"column":83},"end":{"line":114,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item5 level5\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level5Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":115,"column":83},"end":{"line":115,"column":125}}}))
    + "px;\"></div>\n               </div>\n            </td>\n         </tr>\n      </table>\n   </div>\n   <div class=\"daily_stats_table days_table pm_2_5_scale\">\n      <div class=\"section_title\">Dirty Days: Counts</div>\n      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"centered_table\">\n         <tr>\n            <td>&nbsp;</td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":126,"column":12},"end":{"line":128,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"header_cell\">Total</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level0\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(26, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":133,"column":12},"end":{"line":139,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level0") : stack1), depth0))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level1\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(29, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":144,"column":12},"end":{"line":150,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level1") : stack1), depth0))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level2\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(32, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":155,"column":12},"end":{"line":161,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level2") : stack1), depth0))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level3\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(35, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":166,"column":12},"end":{"line":172,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level3") : stack1), depth0))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level4\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(38, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":177,"column":12},"end":{"line":183,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level4") : stack1), depth0))
    + "</td>\n         </tr>\n         <tr>\n            <td><div class=\"pm_2_5_scale_color level5\"></div></td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(41, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":188,"column":12},"end":{"line":194,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"value_cell\">"
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level5") : stack1), depth0))
    + "</td>\n         </tr>\n         <tr>\n            <td>&nbsp;</td>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"years") : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":199,"column":12},"end":{"line":212,"column":21}}})) != null ? stack1 : "")
    + "            <td class=\"bar_graph_cell\">\n               <div class=\"bar_graph\">\n                  <div class=\"bar_graph_item bar_graph_item0 level0\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level0Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":215,"column":83},"end":{"line":215,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item1 level1\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level1Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":216,"column":83},"end":{"line":216,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item2 level2\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level2Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":217,"column":83},"end":{"line":217,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item3 level3\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level3Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":218,"column":83},"end":{"line":218,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item4 level4\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level4Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":219,"column":83},"end":{"line":219,"column":125}}}))
    + "px;\"></div>\n                  <div class=\"bar_graph_item bar_graph_item5 level5\" style=\"height:"
    + alias4((lookupProperty(helpers,"math")||(depth0 && lookupProperty(depth0,"math"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"statsByYear") : depth0)) != null ? lookupProperty(stack1,"all") : stack1)) != null ? lookupProperty(stack1,"level5Perc") : stack1),"*",30,{"name":"math","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":220,"column":83},"end":{"line":220,"column":125}}}))
    + "px;\"></div>\n               </div>\n            </td>\n         </tr>\n      </table>\n   </div>\n   <div class=\"daily_stats_toggle\">\n      <input id=\"percentages_toggle_"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":227,"column":36},"end":{"line":227,"column":51}}}) : helper)))
    + "\" name=\"counts_percentages_toggle_"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":227,"column":85},"end":{"line":227,"column":100}}}) : helper)))
    + "\" type=\"radio\" checked=\"checked\">\n      <label for=\"percentages_toggle_"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":228,"column":37},"end":{"line":228,"column":52}}}) : helper)))
    + "\">Percentages</label>\n      <input id=\"counts_toggle_"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":229,"column":31},"end":{"line":229,"column":46}}}) : helper)))
    + "\" name=\"counts_percentages_toggle_"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":229,"column":80},"end":{"line":229,"column":95}}}) : helper)))
    + "\" type=\"radio\">\n      <label for=\"counts_toggle_"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":230,"column":32},"end":{"line":230,"column":47}}}) : helper)))
    + "\">Counts</label>\n   </div>\n</div>\n";
},"useData":true,"useDepths":true,"useBlockParams":true});
templates['dashboard_device_and_feeds_dropdown_menu_item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "   <li class=\"feed\" id=\"feed_menu_item_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":39},"end":{"line":3,"column":45}}}) : helper)))
    + "\" feedId=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":55},"end":{"line":3,"column":61}}}) : helper)))
    + "\" role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"#\" onclick=\"return false;\"><i class=\"feed-icon fa placeholder\"></i> "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":190},"end":{"line":3,"column":198}}}) : helper)))
    + "</a></li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"dropdown-header device\" role=\"presentation\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":55},"end":{"line":1,"column":63}}}) : helper)))
    + "</li>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"feeds") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":4,"column":9}}})) != null ? stack1 : "")
    + "\n";
},"useData":true});
templates['dashboard_device_and_feeds_sidebar_menu_item'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "         <div class=\"feed\">\n            <input type=\"radio\" id=\"feed_radio_button_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":54},"end":{"line":6,"column":60}}}) : helper)))
    + "\" name=\"feed_radio_button\" class=\"feed_radio_button\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":120},"end":{"line":6,"column":126}}}) : helper)))
    + "\"><label for=\"feed_radio_button_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":6,"column":158},"end":{"line":6,"column":164}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":6,"column":166},"end":{"line":6,"column":174}}}) : helper)))
    + "</label>\n         </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"device_and_feeds\">\n   <div class=\"device\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":23},"end":{"line":2,"column":31}}}) : helper)))
    + "</div>\n   <div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"feeds") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":6},"end":{"line":8,"column":15}}})) != null ? stack1 : "")
    + "   </div>\n</div>";
},"useData":true});
templates['delete_device_confirmation_dialog'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"dynamic_dialog modal fade\" tabindex=\"-1\" role=\"dialog\">\n   <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n         <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n               <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">Delete Confirmation</h4>\n         </div>\n         <div class=\"modal-body\">\n            <div class=\"alert alert-warning\" role=\"alert\">\n               Warning: Are you sure you want to delete this Speck device?\n            </div>\n            <p>\n               If you choose to delete, the <b>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"deviceName") || (depth0 != null ? lookupProperty(depth0,"deviceName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"deviceName","hash":{},"data":data,"loc":{"start":{"line":15,"column":47},"end":{"line":15,"column":61}}}) : helper)))
    + "</b> device will be removed from your account immediately.\n            </p>\n         </div>\n         <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n            <button id=\"delete_device_button\" type=\"button\" class=\"btn btn-danger\">Delete</button>\n         </div>\n      </div>\n   </div>\n</div>\n";
},"useData":true});
templates['delete_feed_confirmation_dialog'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"dynamic_dialog modal fade\" tabindex=\"-1\" role=\"dialog\">\n   <div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n         <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n               <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <h4 class=\"modal-title\">Delete Confirmation</h4>\n         </div>\n         <div class=\"modal-body\">\n            <div class=\"alert alert-warning\" role=\"alert\">\n               Warning: Are you <b>ABSOLUTELY</b> sure you want to delete this installation location?\n            </div>\n            <p>\n               This <b>cannot</b> be undone. This will immediately and permanently delete the\n               <b>"
    + alias4(((helper = (helper = lookupProperty(helpers,"feedName") || (depth0 != null ? lookupProperty(depth0,"feedName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"feedName","hash":{},"data":data,"loc":{"start":{"line":16,"column":18},"end":{"line":16,"column":30}}}) : helper)))
    + "</b> installation location and all of its data.\n            </p>\n            <p>\n               Please type the installation location name ("
    + alias4(((helper = (helper = lookupProperty(helpers,"feedName") || (depth0 != null ? lookupProperty(depth0,"feedName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"feedName","hash":{},"data":data,"loc":{"start":{"line":19,"column":59},"end":{"line":19,"column":71}}}) : helper)))
    + ") below to confirm.\n            </p>\n            <form onsubmit=\"return false;\">\n               <div class=\"form-group\">\n                  <input type=\"text\" id=\"deletion_confirmation_feed_name\" class=\"form-control\" style=\"width:100%\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"feedName") || (depth0 != null ? lookupProperty(depth0,"feedName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"feedName","hash":{},"data":data,"loc":{"start":{"line":23,"column":127},"end":{"line":23,"column":139}}}) : helper)))
    + "\">\n               </div>\n            </form>\n         </div>\n         <div class=\"modal-footer\">\n            <button id=\"delete_feed_button\" type=\"button\" class=\"btn btn-danger\" disabled=\"disabled\">Delete</button>\n         </div>\n      </div>\n   </div>\n</div>\n";
},"useData":true});
templates['device_and_feeds'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "         <div class=\"feeds_container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"feeds") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":12},"end":{"line":107,"column":21}}})) != null ? stack1 : "")
    + "         </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <div id=\"feed_panel_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":18,"column":35},"end":{"line":18,"column":41}}}) : helper)))
    + "\" class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                     <div class=\"pull-right feed_controls\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasData") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":24},"end":{"line":23,"column":31}}})) != null ? stack1 : "")
    + "                        <div class=\"control_button\" onclick=\"confirmDeleteFeed("
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":24,"column":79},"end":{"line":24,"column":85}}}) : helper)))
    + ");\"><i class=\"fa fa-trash-o\"></i>\n                        </div>\n                     </div>\n                     <h3 class=\"panel-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":27,"column":45},"end":{"line":27,"column":53}}}) : helper)))
    + "</h3>\n                  </div>\n                  <div class=\"panel-body\">\n                     <div class=\"feed_table\">\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              Visibility:\n                           </div>\n                           <div class=\"table_cell_value capitalize\">\n                              "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isPublic") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":36,"column":30},"end":{"line":36,"column":74}}})) != null ? stack1 : "")
    + "\n                           </div>\n                        </div>\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              Exposure:\n                           </div>\n                           <div class=\"table_cell_value capitalize\">\n                              "
    + alias4(((helper = (helper = lookupProperty(helpers,"exposure") || (depth0 != null ? lookupProperty(depth0,"exposure") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"exposure","hash":{},"data":data,"loc":{"start":{"line":44,"column":30},"end":{"line":44,"column":42}}}) : helper)))
    + "\n                           </div>\n                        </div>\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              Time Range:\n                           </div>\n                           <div class=\"table_cell_value\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasData") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":52,"column":30},"end":{"line":56,"column":37}}})) != null ? stack1 : "")
    + "                           </div>\n                        </div>\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              Last Upload:\n                           </div>\n                           <div class=\"table_cell_value\">\n                              "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastUploadFormatted") || (depth0 != null ? lookupProperty(depth0,"lastUploadFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastUploadFormatted","hash":{},"data":data,"loc":{"start":{"line":64,"column":30},"end":{"line":64,"column":53}}}) : helper)))
    + "\n                           </div>\n                        </div>\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              Created:\n                           </div>\n                           <div class=\"table_cell_value\">\n                              "
    + alias4(((helper = (helper = lookupProperty(helpers,"createdFormatted") || (depth0 != null ? lookupProperty(depth0,"createdFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"createdFormatted","hash":{},"data":data,"loc":{"start":{"line":72,"column":30},"end":{"line":72,"column":50}}}) : helper)))
    + "\n                           </div>\n                        </div>\n                     </div>\n\n                  </div>\n                  <div class=\"panel-footer feed_api_info\">\n                     <div class=\"feed_table\" style=\"font-size: smaller\">\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              ID:\n                           </div>\n                           <div class=\"table_cell_value api_key\">\n                              "
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":85,"column":30},"end":{"line":85,"column":36}}}) : helper)))
    + "\n                           </div>\n                        </div>\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              API Key (read-only):\n                           </div>\n                           <div class=\"table_cell_value api_key\">\n                              "
    + alias4(((helper = (helper = lookupProperty(helpers,"apiKeyReadOnly") || (depth0 != null ? lookupProperty(depth0,"apiKeyReadOnly") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"apiKeyReadOnly","hash":{},"data":data,"loc":{"start":{"line":93,"column":30},"end":{"line":93,"column":48}}}) : helper)))
    + "\n                           </div>\n                        </div>\n                        <div class=\"table_row\">\n                           <div class=\"table_cell_label\">\n                              API Key (read-write):\n                           </div>\n                           <div class=\"table_cell_value api_key\">\n                              "
    + alias4(((helper = (helper = lookupProperty(helpers,"apiKey") || (depth0 != null ? lookupProperty(depth0,"apiKey") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"apiKey","hash":{},"data":data,"loc":{"start":{"line":101,"column":30},"end":{"line":101,"column":40}}}) : helper)))
    + "\n                           </div>\n                        </div>\n                     </div>\n                  </div>\n               </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                           <div class=\"control_button\"><a href=\""
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"downloadUrl") || (depth0 != null ? lookupProperty(depth0,"downloadUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"downloadUrl","hash":{},"data":data,"loc":{"start":{"line":22,"column":64},"end":{"line":22,"column":81}}}) : helper))) != null ? stack1 : "")
    + "\"><i class=\"fa fa-download\"></i></a></div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "public";
},"7":function(container,depth0,helpers,partials,data) {
    return "private";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                 "
    + alias4(((helper = (helper = lookupProperty(helpers,"minTimeSecsFormatted") || (depth0 != null ? lookupProperty(depth0,"minTimeSecsFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minTimeSecsFormatted","hash":{},"data":data,"loc":{"start":{"line":53,"column":33},"end":{"line":53,"column":57}}}) : helper)))
    + " - "
    + alias4(((helper = (helper = lookupProperty(helpers,"maxTimeSecsFormatted") || (depth0 != null ? lookupProperty(depth0,"maxTimeSecsFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maxTimeSecsFormatted","hash":{},"data":data,"loc":{"start":{"line":53,"column":60},"end":{"line":53,"column":84}}}) : helper)))
    + "\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "                                 n/a\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"device_list_item_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":26},"end":{"line":1,"column":32}}}) : helper)))
    + "\" class=\"panel panel-primary device_list_item\">\n   <div class=\"panel-heading\">\n      <div class=\"pull-right device_controls\">\n         <div class=\"control_button\" onclick=\"confirmDeleteDevice("
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":4,"column":66},"end":{"line":4,"column":72}}}) : helper)))
    + ");\"><i class=\"fa fa-trash-o\"></i></div>\n      </div>\n      <div class=\"pull-right\">\n         <div class=\"serial_number serial_number_header\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"serialNumberFormatted") || (depth0 != null ? lookupProperty(depth0,"serialNumberFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serialNumberFormatted","hash":{},"data":data,"loc":{"start":{"line":7,"column":57},"end":{"line":7,"column":82}}}) : helper)))
    + "</div>\n      </div>\n      <div>\n         <h3 class=\"panel-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":10,"column":33},"end":{"line":10,"column":41}}}) : helper)))
    + "</h3>\n         <div class=\"serial_number serial_number_header_alt\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"serialNumberFormatted") || (depth0 != null ? lookupProperty(depth0,"serialNumberFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serialNumberFormatted","hash":{},"data":data,"loc":{"start":{"line":11,"column":61},"end":{"line":11,"column":86}}}) : helper)))
    + "</div>\n      </div>\n   </div>\n   <div class=\"feeds_outer_container\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"feeds") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":6},"end":{"line":109,"column":13}}})) != null ? stack1 : "")
    + "   </div>\n</div>\n\n";
},"useData":true});
templates['feed_list_item'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"feed_list_item_"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":30}}}) : helper)))
    + "\" class=\"feed_list_item noselect\">\n   <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n      <tr valign=\"middle\">\n         <td>\n            <div>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":17},"end":{"line":5,"column":25}}}) : helper)))
    + "</div>\n            <div>Last upload: "
    + alias4(((helper = (helper = lookupProperty(helpers,"lastUploadFormatted") || (depth0 != null ? lookupProperty(depth0,"lastUploadFormatted") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastUploadFormatted","hash":{},"data":data,"loc":{"start":{"line":6,"column":30},"end":{"line":6,"column":53}}}) : helper)))
    + "</div>\n         </td>\n         <td align=\"right\">\n            <div class=\"checkmark_icon_container\" style=\"display:none;margin-left:10px\"></div>\n         </td>\n      </tr>\n   </table>\n</div>";
},"useData":true});
templates['grapher'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<table id=\"grapher\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\">\n   <tr>\n      <td>\n         <div id=\"date_axis_container\">\n            <div id=\"date_axis\" class=\"date_axis\"></div>\n            <div id=\"value_label\"></div>\n         </div>\n      </td>\n      <td>&nbsp;</td>\n   </tr>\n   <tr>\n      <td>\n         <div id=\"plot\" class=\"plot\" style=\"height:"
    + alias4(((helper = (helper = lookupProperty(helpers,"plotHeight") || (depth0 != null ? lookupProperty(depth0,"plotHeight") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plotHeight","hash":{},"data":data,"loc":{"start":{"line":13,"column":51},"end":{"line":13,"column":65}}}) : helper)))
    + "px; border: 1px solid black;\"></div>\n      </td>\n      <td>\n         <div id=\"y_axis\" class=\"y_axis\" style=\"position:relative;height:"
    + alias4(((helper = (helper = lookupProperty(helpers,"plotHeight") || (depth0 != null ? lookupProperty(depth0,"plotHeight") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"plotHeight","hash":{},"data":data,"loc":{"start":{"line":16,"column":73},"end":{"line":16,"column":87}}}) : helper)))
    + "px\">\n            <div id=\"y_axis_label\" class=\"rotate_90 y_axis_label\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"yAxisLabel") || (depth0 != null ? lookupProperty(depth0,"yAxisLabel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"yAxisLabel","hash":{},"data":data,"loc":{"start":{"line":17,"column":66},"end":{"line":17,"column":82}}}) : helper))) != null ? stack1 : "")
    + "</div>\n         </div>\n      </td>\n   </tr>\n</table>\n";
},"useData":true});
templates['grapher_channel_menu_item'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"menu_item\"><a href=\"#\" onclick=\"return false;\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"cssClass") || (depth0 != null ? lookupProperty(depth0,"cssClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cssClass","hash":{},"data":data,"loc":{"start":{"line":1,"column":65},"end":{"line":1,"column":77}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":1,"column":79},"end":{"line":1,"column":94}}}) : helper)))
    + "</a></li>";
},"useData":true});
templates['grapher_time_range_menu_item'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li id=\"time_range_menu_item_"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":1,"column":29},"end":{"line":1,"column":38}}}) : helper)))
    + "\" class=\"menu_item\"><a href=\"#\" onclick=\"return false;\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"cssClass") || (depth0 != null ? lookupProperty(depth0,"cssClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cssClass","hash":{},"data":data,"loc":{"start":{"line":1,"column":101},"end":{"line":1,"column":113}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":1,"column":115},"end":{"line":1,"column":124}}}) : helper)))
    + "</a></li>";
},"useData":true});
templates['grapher_value_range_color_box'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"level_"
    + alias4(((helper = (helper = lookupProperty(helpers,"level") || (depth0 != null ? lookupProperty(depth0,"level") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"level","hash":{},"data":data,"loc":{"start":{"line":1,"column":15},"end":{"line":1,"column":24}}}) : helper)))
    + "\" class=\"color_box\" style=\"background-color:"
    + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":1,"column":68},"end":{"line":1,"column":77}}}) : helper)))
    + "; z-index:"
    + alias4(((helper = (helper = lookupProperty(helpers,"zIndex") || (depth0 != null ? lookupProperty(depth0,"zIndex") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"zIndex","hash":{},"data":data,"loc":{"start":{"line":1,"column":87},"end":{"line":1,"column":97}}}) : helper)))
    + ";\"></div>";
},"useData":true});
templates['home_page_banner'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"home_page_banner\" class=\"site_banner\">\n   <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n      <tr valign=\"middle\">\n         <td><img src=\"/images/banners/stack_of_books.png\" style=\"max-height:40px\"></td>\n         <td>\n            In partnership with CMU's CREATE Lab, we launched a National Library Program, offering 3 free Specks and training to\n            public libraries that make Specks available to their patrons.\n         </td>\n         <td>\n            <a href=\"/learn/libraries-and-advocates\" class=\"btn btn-default\">Learn More</a>\n         </td>\n      </tr>\n   </table>\n</div>\n";
},"useData":true});
templates['no_feeds_for_device'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel-body\">\n   There are no installation locations defined for this Speck. Please use\n   the <a href=\"/support/software\">Speck app</a> to and use the Upload Configuration\n   tab to specify where you have installed this Speck. If you need help, please\n   see our <a href=\"/support/software#upload-configuration\">Upload Configuration video tutorial</a>.\n</div>\n";
},"useData":true});
templates['public_data_geocode_failed'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-danger\">Sorry, that doesn't appear to be a valid location or address.</div>\n";
},"useData":true});
templates['public_data_geocode_found_one'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      It recorded a PM<sub>2.5</sub> value of "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"dataSample") : depth0)) != null ? lookupProperty(stack1,"value") : stack1), depth0))
    + " &mu;g/m<sup>3</sup> at "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"dataSample") : depth0)) != null ? lookupProperty(stack1,"timeStr") : stack1), depth0))
    + ".\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"alert alert-success\">\n   The closest regulated station with recent PM<sub>2.5</sub> data is <a href=\"javascript:setFeedSelected("
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"nearest") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + ");\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"nearest") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</a>.\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"dataSample") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":3},"end":{"line":5,"column":10}}})) != null ? stack1 : "")
    + "   A plot of its historical data is shown below.\n</div>";
},"useData":true});
templates['public_data_geocode_found_two'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      It recorded a PM<sub>2.5</sub> value of "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"nearestDataSample") : depth0)) != null ? lookupProperty(stack1,"value") : stack1), depth0))
    + " &mu;g/m<sup>3</sup> at "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"nearestDataSample") : depth0)) != null ? lookupProperty(stack1,"timeStr") : stack1), depth0))
    + ".\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      ("
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"mostRecentDataSample") : depth0)) != null ? lookupProperty(stack1,"value") : stack1), depth0))
    + " &mu;g/m<sup>3</sup>)\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"alert alert-success\">\n   The closest regulated sensor with recent PM<sub>2.5</sub> data is\n   <a href=\"javascript:setFeedSelected("
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"nearest") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + ");\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"nearest") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</a>.\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"nearestDataSample") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":3},"end":{"line":6,"column":10}}})) != null ? stack1 : "")
    + "   A plot of its historical data is shown below.\n   Alternatively, the <a href=\"javascript:setFeedSelected("
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"mostRecent") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + ");\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"mostRecent") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</a>\n   station is "
    + alias2(((helper = (helper = lookupProperty(helpers,"distanceDiffKm") || (depth0 != null ? lookupProperty(depth0,"distanceDiffKm") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"distanceDiffKm","hash":{},"data":data,"loc":{"start":{"line":9,"column":14},"end":{"line":9,"column":32}}}) : helper)))
    + " km ("
    + alias2(((helper = (helper = lookupProperty(helpers,"distanceDiffMi") || (depth0 != null ? lookupProperty(depth0,"distanceDiffMi") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"distanceDiffMi","hash":{},"data":data,"loc":{"start":{"line":9,"column":37},"end":{"line":9,"column":55}}}) : helper)))
    + " mi) further away, but has data\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"mostRecentDataSample") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":3},"end":{"line":12,"column":10}}})) != null ? stack1 : "")
    + "   which is more recent by\n   "
    + alias2(((helper = (helper = lookupProperty(helpers,"timeDiff") || (depth0 != null ? lookupProperty(depth0,"timeDiff") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"timeDiff","hash":{},"data":data,"loc":{"start":{"line":14,"column":3},"end":{"line":14,"column":15}}}) : helper)))
    + " hour"
    + alias2(((helper = (helper = lookupProperty(helpers,"hourPlurality") || (depth0 != null ? lookupProperty(depth0,"hourPlurality") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"hourPlurality","hash":{},"data":data,"loc":{"start":{"line":14,"column":20},"end":{"line":14,"column":37}}}) : helper)))
    + ".\n</div>";
},"useData":true});
templates['public_data_no_nearby_stations'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"alert alert-warning\">\n   Sorry, there are no regulated stations with recent PM<sub>2.5</sub> data near the specified location, or no such\n   stations exist in our database.\n</div>";
},"useData":true});
})();
