   $(document).ready(function (){ 
                //public class iputarea
                
                
                var  textCollect = [];    // 留言內容匯集
                var  textObject = {};      // 留言
                var  textSelection = [];   // 留言選擇
                var  tcCount = 0,      //陣列計數器
                      mbnum = 0;       //留言計數器
                
                
               
                
                var text_clear = function () {   //清除文字方塊內容
                     $('#massageTitle').val(null);
                     $('#massageLeave').val(null);
                     $('#selectWho').val('路人');
                };
                
                var text_del = function () {   //刪除列印值
                    var delnum = $(this).parent().find('.num').html(),
                             n = parseInt(delnum,10);
                    delete textCollect[n];
                    
                    for(var i = n ; i < tcCount-1 ; i++){
                        textCollect[i] = textCollect[ i + 1 ] ;
                        textCollect[i].mN = i; 
                     }     
                    textCollect[tcCount-1] = null;
                    tcCount--;
                    mbnum--;
                    text_sel();
                    $(this).parent().remove();   
                } 
                
                var text_sel = function () {     //篩選器 
                    var selval = $('input[name=sel-all]:checked').val();
                    $('.msg-display').remove();
                       for(var i = 0 ; i < tcCount ; i++){
                          if(textCollect[i] !== null){
                            if(selval === textCollect[i].mS){    
                                textCollect[i].mF();
                              }
                            else if(selval === "ALL"){       
                                textCollect[i].mF();
                             }
                          }
                       }               
                };
                 
                var text_display = function () {        //印出值
                        var $cloneMsg = $('.msg-clone').clone();
                        $cloneMsg.removeClass('msg-clone').addClass('msg-display');
                        $cloneMsg.find('.msgti-content').html(this.mT);
                        $cloneMsg.find('.msgsl-content').html(this.mS);
                        $cloneMsg.find('.msgmg-content').html(this.mM);
                        $cloneMsg.find('.num').html(this.mN);
                        $('#show-box').prepend($cloneMsg);
                       ;
                }; 

                var text_Sub = function () {           //儲存數值
                     var mbTil = $('#massageTitle').val();
                     var mbSel = $('#selectWho').val();
                     var mbMsg = $('#massageLeave').val();
                     
                     if(mbTil !== "" && mbMsg !== ""){
                       
                        textObject = {
                            mT : mbTil,
                            mS : mbSel,
                            mM : mbMsg,
                            mN : mbnum,
                            mF : text_display
                        };                        
                        
                        text_clear();
                        textCollect[tcCount] = textObject;
                        tcCount++;
                        mbnum++;       
                        text_sel();
                     }
                     
                     else{
                        alert("請輸入完整資訊！！");
                     }
                };
                
                
           
                var event_toggle_happen = function () {   //觸發事件
                    var key;
                    var $document = $(document); 
                    var events = {
                         click_submit :['click','#TextSub'],
                         click_clear  :['click','#TextClear'],
                         click_select :['click','.inputText'], 
                         click_Delete : ['click','.msg-clear'],
       
                                                  
                    };

                    var eventsFunction = {
                        click_submit : text_Sub,
                        click_clear  : text_clear,
                        click_select : text_sel,
                        click_Delete : text_del    
                    };
                    for (key in events)
                        $document.on(events[key][0],events[key][1],eventsFunction[key]);
                };

                event_toggle_happen();
            });