var fs = require('fs');

module.exports = {
  fetchTypeList : function(request, response) {
    console.log('====> Fetch Type List');
    console.log(JSON.stringify(staticTypeList()));
    response.writeHead(200, {
      'Content-Type' : 'application/json; charset=utf-8'
    });
    response.end(
      JSON.stringify({'typeList' : staticTypeList()})
    );
  },

  fetchArticleList : function(request, response) {
    console.log('====> Fetch Article List');
    var typeId = request.params.typeId;
    console.log('request article type:[' + typeId + ']');
    if (typeId) {
      fs.readFile('./articles/type_' + typeId + '.json', 'utf8', function(err, data) {
        if (err) {
          console.log('===> ERROR!! ' + err);
        }
      	//console.log('==== ARTICLE DATA ====');
      	//console.log(data);
        var jsonData = [];
        if (data) {
          data = data.replace(/\n/g, '<br>');
          var tmpArray = JSON.parse(data);
          tmpArray.forEach(function(tmpObj) {
            var newObj = {};
            for (var key in tmpObj) {
              newObj[key] = tmpObj[key];
            }
            jsonData.push(newObj);
          });
        }

        response.writeHead(200, {
          'Content-Type' : 'application/json; charset=utf-8'
      	});
      	response.end(
          JSON.stringify({'contentList' : jsonData})
      	);
      });
    }
  }
};

function staticTypeList() {
  return [
    {'id' : 1, 'name' : '阿榮的話'},
    {'id' : 2, 'name' : '中國時報專欄'},
    {'id' : 3, 'name' : '經濟日報專欄'},
    {'id' : 4, 'name' : '專業分析'},
    {'id' : 5, 'name' : '小草'},
    {'id' : 6, 'name' : '媒體報導'},
    {'id' : 7, 'name' : '電子報'}
  ];
}
