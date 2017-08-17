// ========================
// helper functions

function getOpt(arrObj, key){
  var arr = [];
  arrObj.forEach(function(ele){
	  arr.push(ele[key]);
  });
  return arr;
}

function getNum(arrObj, optName){
  var arr = [];
  var opt = optName || '';

  arrObj.forEach(function(ele){
    var add = 0;
    if(ele['opt'] === opt){
      add = 1;
    }
	  arr.push(ele['num']+add);
  });
  return arr;
}

function genVote(str){
	var arr = str.split(',');
	var arrObj = [];
	for(var i=0; i<arr.length; i++){
		var obj = {
			opt: arr[i].trim(),
			num: 0
		};
		arrObj.push(obj);
	}
	return arrObj;
}

var helpers = {
    getOpt: getOpt,
    getNum: getNum,
    genVote: genVote
}

export default helpers;