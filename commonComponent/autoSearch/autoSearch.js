/**
 * 联想搜索组件
 * @param injectObj [自定义容器标签对象]
 * injectObj 示例
 * <select id="associateSearchContainer" name="num" class="ui selection dropdown"></select>
 * id、name 自定义 , class 固定写法
 * 
 * @useExplain 
 * var example = new associateSearchContainer(injectObj);
 * example.init(data,str1,str2); 需要传入3个参数
 * data : 联想参考的数据集,
 * str1,str2 : 数据field名称
 * oInput.drop(); 数据初始化后实现下拉显示
 *
 * @Demo示例
 * var numData;
	$.ajax({
		url:'http://localhost:3000/num',
		type:'get',
		success:function(data){
			numData=data;
			var oInput = new associateSearchContainer($('#associateSearchContainer'));
			oInput.init(numData,"Num","Name");
			oInput.drop();
			$('#associateSearchContainer').dropdown('get value');
		},
		error:function(err){
			console.log(err);
		}
	});
 */
// ;(function(){
	function associateSearchContainer(injectObj){
		this.id = injectObj.attr('id');
		this.class = 'ui search selection dropdown';
		this.name = injectObj.attr('name');
		this.init = function(data,val,txt,name){
			let template = '<option value="">Select '+this.name+'</option>';
			for(let i = 0;i<data.length;i++){
				for(let key in data[i]){
					if(key == val){
						var value = data[i][key];
					}else if(key==txt){
						var text = data[i][key];
					}else if(key==name){
						var dataName=data[i][key]
					}
				}
				template = template+'<option value="'+value+'" data-name="'+dataName+'">'+text+'</option>';
			}
			injectObj.html(template);
			injectObj.attr('class',this.class);
			return injectObj;
		};
		this.drop = function(){
			let str = '#'+this.id+'.ui.dropdown';
			$(str)
			  .dropdown({
			    onChange:function(val,txt,$choice){
			    	var arr = $('option');
			    	for(var i =0;i<arr.length;i++){
			    		if(txt==arr[i].text){
			    			$('input[disabled]').val(arr[i].dataset.name);
			    		}
			    	}
			    }
			  })
			;
		};
	}
// })();

