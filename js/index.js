var toDoList={};
toDoList.name="toDoList";
toDoList.time="2018/7/24";
//代辦清單的清單裡面是個陣列，塞代辦物件們
toDoList.list=[
  {name: "吃早餐",nHour: '7',nMinutes:'30',done: true},
  {name: "加油",nHour: '10',nMinutes:'40',done: true},
  {name: "買午餐",nHour: '12',nMinutes:'20',done: false},
  {name: "喝咖啡",nHour: '15',nMinutes:'53',done: false},
  {name: "讀書",nHour: '17',nMinutes:'11',done: false}
];

//定義元素用的html模板，{{名稱}}代表要套入的地方
var task_html=" <div id={{id}} data-done = {{isDone}} class='task'>{{task}} <div class='time'>{{nHour}}:{{nMinutes}}</div><div id={{del_id}} data-del-id='{{delid}}' class='btn'></div></div>";

//刪除並重新產生清單中所有項目
function showlist(){
  $("#doList").html("");
  //把每個項目做出來
  for(var i=0;i<toDoList.list.length;i++){
    var task=toDoList.list[i];
    var task_id="task_"+i;
    var del_task_id="del_task_"+i;
    var isDone = toDoList.list[i].done;
       
    //取代模板位置成資料replace(要取代的,取代成...)
    var current_item_html=
        task_html.replace("{{task}}",task.name)
                 .replace("{{id}}",task_id)
                 .replace("{{del_id}}",del_task_id)
                 .replace("{{nHour}}",task.nHour)
                 .replace("{{nMinutes}}",task.nMinutes)
                 .replace("{{isDone}}",isDone)
                 .replace("{{delid}}",i);
    
    
    //加入元素後才能夠用jquery操作
    $("#doList").append(current_item_html);
    
    $("#"+del_task_id).click(
      function(){
        remove_item($(this).attr("data-del-id"));
      }
    );// end click 點擊 X 刪除
    $('#'+task_id).click(function(){
      var order = $(this).attr('id').replace("task_","");
      console.log(order);
      changeType(order);      
      });//end click 點擊項目打勾    
  };//end for
  
  for(var i=0;i<toDoList.list.length;i++){
    var done_now = $("#task_"+i).attr("data-done") ; 
      if(done_now == "true" ){
        $("#task_"+i).addClass('complete');
      }else{
        $("#task_"+i).removeClass('complete');
      };//end if else
  };// end for 
  
};// end showlist
//先顯示一次，因為前面只定義好function 還沒有執行
showlist();

// 新增資料流程: 動態push一筆資料->呼叫showlist重新渲染清單
$(".addbtn").click(
  function(){
    //使用val()存取輸入的值，val("..") 有給參數是設定
    var dh = new Date();
    var dm = new Date();        
    toDoList.list.push(
      {
        name:$("#input_name").val(),
        nHour:dh.getHours() ,
        nMinutes:dm.getMinutes(),
        done:false
      }
    );
    $("#input_name").val("");
    showlist();
  }  
);

//刪除項目 陣列.splice(位置,長度) 
//刪除資料->重新根據資料渲染清單
function remove_item(id){
  toDoList.list.splice(id,1);
  showlist();
};

// 任務完成流程: 一筆資料新增.complete
function changeType(id){
  // $(this).addClass('complete');
  if(toDoList.list[id].done == true){
  toDoList.list[id].done = false;
  }else{
  toDoList.list[id].done = true;};
  showlist();
};