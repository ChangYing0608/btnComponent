/**
	 * 搜索模态框组件
	 * @param searchModalContainer    [自定义的容器标签对象]
	 * @param injectObj [传入的参数对象]
	 * injectObj 参数示例
	 * {
	 * 		singleSelect ：true/false, 是否允许单选
	 * 		pageSize : 10,             页面显示的条数
	 * 		multiSort ：true/false,    是否允许多选
	 * 		keyFieldName ：主键名,     以主键为依据显示数据
	 * 		dbDealData ：function(){}, 自定义双击事件
	 * 		color ：red,               semantic按钮对应的颜色class名
	 * 		name ：'物料',　　　　　　 按钮名称
	 * 		title ：'公司搜索',        弹出页的title
	 * 		searchName : '物料编码',   搜索框内的提示名
	 * 		url : 'http://...'         数据接口
	 * 		baseDataTableStructure ：[[{}]]           列表项显示的样式
	 * }
	 * baseDataTableStructure 示例
	 * [
	 * 		{field: 'Id', title: 'id', hidden: true},
	        {field: 'Num', title: '物料类别编码', width: "30%"},
	        {field: 'Name', title: '物料类别名称', width: "70%"}
	 * ]
	 * @return searchModalContainer   [已经完成模板插入的容器元素对象]
	 * @组件调用方法 init(injectObj);showSearchPage();
	 */
	// ;(function(){
		function BtnSearchComponent(injectObj){
			this.injectObj = injectObj;
			this.id = Math.floor(Math.random()*10000);
			this.dataOptions = 'width:\'100%\',height:\'280px\','+
		                'rownumbers:true,'+
		                'singleSelect:'+this.injectObj.singleSelect+','+
		                'pagination:true,'+
		                'pageSize:'+this.injectObj.pageSize+','+
		                'remoteSort:false,'+
		                'multiSort:'+this.injectObj.multiSort+','+
		                'idField:\''+this.injectObj.keyFieldName+'\'';

			this.template='<button id="btnShowSearchPage'+this.id+'" class="ui '+this.injectObj.color+' button">'+injectObj.name+'</button>'+
						  '<div id="modal_search_page'+this.id+'" class="ui long firstMD coupled modal scrolling transition">'+
							'<div class="ui icon header">'+this.injectObj.title+'</div>'+
							'<div class="content ui" style="width: 100%;height:470px">'+
							 '<div id="searchPageTabs'+this.id+'" style="visibility: hidden;">'+
							  '<div title="基本" style="padding:20px 30px">'+
							   '<form class="ui form loading">'+
							    '<input id="hidItemLimitCount'+this.id+'" type="hidden" value="20">'+
							    '<div class="fields">'+
							     '<div class="seven wide field">'+
							      '<div class="ui action input">'+
							       '<input id="tbxSearchNumber'+this.id+'" type="text" placeholder="请输入要查询的'+injectObj.searchName+'" autocomplete="off">'+
							       '<div id="btnSearchAction'+this.id+'" class="ui grey icon button" tabindex="0"><i '+
	                                    'class="search icon"></i></div>'+
	                              '</div>'+
	                             '</div>'+
	                             '<div class="four wide field">'+
	                              '<div class="two fields">'+
	                               '<div class="field">'+
	                                '<div id="btnOtherSearchOption'+this.id+'" class="ui medium grey button" tabindex="0" >选项</div>'+
	                               '</div>'+
	                              '</div>'+
	                             '</div>'+
	                             '<div class="three wide field"></div>'+
	                            '</div>'+
	                            '<h4 class="ui dividing header">10项搜索结果</h4>'+
	                           '</form>'+
	                           '<div class="field">'+
	                            '<table id="baseShowSearchList'+this.id+'" data-options="'+this.dataOptions+'">'+
	                            '</table>'+
	                           '</div>'+
	                          '</div>'+
	                          '<div title="高级" style="padding:10px"></div>'+
	                         '</div>'+
	                        '</div>'+
	                        '<div class="actions">'+
	                         '<div class="ui buttons">'+
	                          '<button id="btnSearchActionDone'+this.id+'" class="ui ok primary button">'+
	                           '<i class="checkmark icon"></i>确定'+
	                          '</button>'+
	                          '<button id="btnSearchActionCancel'+this.id+'" class="ui cancel button">'+
	                           '<i class="remove icon"></i>取消'+
	                          '</button>'+
	                         '</div>'+
	                        '</div>'+
	                       '</div>'+
	                       '<div class="ui mini secondMD coupled modal transition hidden">'+
						   	'<div class="ui icon header">搜索选项</div>'+
						   	'<div class="content">'+
						   	 '<div class="ui form" style="padding:20px 30px;background-color: #f1f1f1;">'+
						      '<div class="ui grid">'+
						       '<div class="six wide column ui right aligned"><label>返回全部行</label></div>'+
						       '<div class="ten wide column">'+
						        '<div class="ui toggle checkbox">'+
						         '<input id="returnAllItems'+this.id+'" type="checkbox">'+
						         '<label>&nbsp;</label>'+
						        '</div>'+
						       '</div>'+
						       '<div class="six wide column right aligned"><label>显示最大行数</label></div>'+
						       '<div class="ten wide column">'+
						        '<div class="ui small icon input">'+
						         '<input id="maxLimitCount'+this.id+'" type="text" value="20">'+
						        '</div>'+
						       '</div>'+
						      '</div>'+
						     '</div>'+
						    '</div>'+
						    '<div class="actions">'+
						     '<div class="ui approve button">'+
						      '<i class="checkmark icon"></i>确定'+
						     '</div>'+
						    '</div>'+
						   '</div>';

			// searchModalContainer.html(template);
			// return searchModalContainer;
			this.init = function(injectObj){
				var com= this;
				function showSearchPage(){debugger
					$('#modal_search_page'+com.id).modal('show');
				}
				function SearchMaterial() {
			        $("#tbxSearchNumber"+com.id).addClass("loading");
			        $('#baseShowSearchList'+com.id).datagrid({
			            url: com.injectObj.url,
			            idField: com.injectObj.keyFieldName,
			            columns: com.injectObj.baseDataTableStructure
			        });
			    }

			    function searchDoneCallback(data){
					var row;
					for(var i=0;i<data.length;i++){
						row = data[i];
						com.injectObj.aim.dropdown('set selected',row.Num);
						$('input[disabled]').val(row.Name);
					}
				}
debugger
				$('#btnShowSearchPage'+com.id).on('click',showSearchPage);

				// initialize all modals
		        $('.coupled.modal').modal({allowMultiple: true});
		        // open second modal on firstMD modal buttons
		        $('#modal_search_page'+com.id).next().modal('attach events', '#btnOtherSearchOption'+this.id);

		        $('#modal_search_page'+com.id).modal({
		            onVisible: function () {
		                $.parser.parse();
		                var searchPageTabs = $('#searchPageTabs'+com.id);
		                searchPageTabs.tabs({
		                	width: "100%",
		                	fit: true
		                });
		                searchPageTabs.tabs('select', 0).css("visibility", "visible");
		                searchPageTabs.find("form").removeClass("loading");
		            },
		            onHidden: function () {
	                	$(window).resize();
	            	}
		        });
		        // data search
		        $("#tbxSearchNumber"+com.id).keydown(function () {
		            if (event.keyCode == 13) {
		                SearchMaterial();
		                return false;
		            }
		        });
		        $("#btnSearchAction"+com.id).on("click",function(){
		            SearchMaterial();
		        });

		        $("#btnSearchActionDone"+com.id).on("click", function () {
		            var dg=$("#baseShowSearchList"+com.id);
		            var rows = dg.datagrid("getSelections");

		            if (rows.length > 0) {
		               	searchDoneCallback(rows);
		                $('#tbxSearchNumber'+com.id).val('');
		                dg.datagrid('clearSelections');
		                dg.datagrid('loadData',{total:0,rows:[]});
		            }
		            $('#modal_search_page'+com.id).modal('hide all');
		        });

		        $("#btnSearchActionCancel"+com.id).on("click", function() {
		            $('#modal_search_page'+com.id).modal('hide all');
		        });

		        //list limit
		        $("#returnAllItems"+com.id).on("change", function () {
		            var maxLimitCount = $("#maxLimitCount"+com.id);
		            var hidItemLimitCount = $("#hidItemLimitCount"+com.id);
		            if (this.checked) {
		                maxLimitCount.attr("disabled", "disabled");
		                hidItemLimitCount.val("-1");
		            } else {
		                maxLimitCount.removeAttr("disabled");
		                hidItemLimitCount.val(maxLimitCount.val());
		            }
		        });

		        $("#maxLimitCount"+com.id).on("change", function () {
		            var hidItemLimitCount = $("#hidItemLimitCount"+com.id);
		            hidItemLimitCount.val(this.value);
		        });
			}
		}
	// })();