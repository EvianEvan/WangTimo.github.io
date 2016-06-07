// 搜索框输入效果
$(function(){
    $('#inputSearch').focus(function(){
        $(this).addClass('focus');
        if($(this).val() ==this.defaultValue){
            $(this).val('');
        }
    }).blur(function(){
        $(this).removeClass('focus');
        if($(this).val() == ''){
            $(this).val(this.defaultValue);
        }
    }).keyup(function(tt){
        if(tt.which == 13){
            alert('回车提交订单！');
        }
    })
})
// 网页换肤（cookies插件）
$(function(){
    var $li=$('#skin li');
    $li.click(function(){
        switchSkin(this.id);
    });
    var cookie_skin = $.cookie('MyCssSkin');
    if(cookie_skin) {
        switchSkin(cookie_skin);
    }
});
function switchSkin(skinName){
    $('#'+skinName).addClass('selected')
    .siblings().removeClass('selected');
    $('#cssfile').attr('href','css/'+skinName+'.css');
    $.cookie('MyCssSkin',skinName,{path:'/',expires:10});
}
// 浮动导航效果
$(function(){
    $('#nav li').hover(function(){
        $(this).find('.jnNav').show();
    },function(){
        $(this).find('.jnNav').hide();
    })
})

// 左侧商品分类显示hot效果
$(function(){
    $('.jnCatainfo .promoted').append('<span class="hot"></span>');
})

// 大屏广告图滚动效果
// part1.主体部分
$(function(){
    var $imgrolls = $('#jnImageroll div a');
    $imgrolls.css('opacity','0.7');
    var len = $imgrolls.length;
    var index = 0;
    var adTimer = null;
    $imgrolls.mouseover(function(){
        index=$imgrolls.index(this);
        showImg(index);
    }).eq(0).mouseover();
    $('#jnImageroll').hover(function(){
        if(adTimer){
            clearInterval(adTimer);
        }
    },function(){
        adTimer = setInterval(function(){
            showImg(index);
            index++;
            if(index==len){index=0;}
        },2000);
    }).trigger('mouseleave');
})
// part2.显示不同幻灯片部分
function showImg(index){
    var $rollobj = $('#jnImageroll');
    var $rolllist = $rollobj.find('div a');
    var newhref = $rolllist.eq(index).attr('href');
    $('#JS_imgWrap').attr('href',newhref)
                    .find('img').eq(index).stop(true,true).fadeIn('fast')
                    .siblings().fadeOut('fast');
    $rolllist.removeClass('chos').css('opacity','0.7')
             .eq(index).addClass('chos').css('opacity','1');
}

// 为最新动态部分添加超链接提示
$(function(){
    var x=10;
    var y=20;
    $('a.tooltip').mouseover(function(e){
        this.myTitle = this.title;
        this.title = '';
        $('body').append('<div id="tooltip">'+this.myTitle+'</div>');
        $('#tooltip')
        .css({
            'top':(e.pageY+y)+'px',
            'left':(e.pageX+x)+'px'
        }).show('fast');
    }).mouseout(function(){
        this.title=this.myTitle;
        $('#tooltip').remove();
    }).mousemove(function(e){
        $('#tooltip')
        .css({
            'top':(e.pageY+y)+'px',
            'left':(e.pageX+x)+'px'
        });
    });
})
// 右下部品牌活动横向滚动效果
// part1
$(function(){
    $('#jnBrandTab li a').click(function(){
        $(this).parent().addClass('chos')
        .siblings().removeClass('chos');
        var idx = $('#jnBrandTab li a').index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();
});
// part2 显示不同的模块
function showBrandList(index){
    var $rollobj = $('#jnBrandList');
    var rollWidth = $rollobj.find('li').outerWidth();
    rollWidth = rollWidth*4;//一个版面的宽度
    $rollobj.stop(true,false).animate({left:-rollWidth*index},1000);
}

//  滑过图片出现放大镜效果 
$(function(){
    $('#jnBrandList li').each(function(index){
        var $img = $(this).find('img');
        var img_w = $img.width();
        var img_h = $img.height();
        var spanHtml = '<span style="position:absolute;top:0;left:5px;width:'+img_w+'px;height:'
        +img_h+'px;"class="imageMask"></span>';
        $(spanHtml).appendTo(this);
    });
    $('#jnBrandList').delegate('.imageMask','hover',function(){
    $(this).toggleClass('imageOver');
    });
})
