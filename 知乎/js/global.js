// 登录和注册表单的切换
$(function(){
	$('.index-tab-navs a').click(function(){
		$(this).addClass('active')
		.siblings().removeClass('active');
		if($(this).attr('id') == 'signIn'){
			$('.signInForm').removeClass('displayNone');
			$('.signUpForm').addClass('displayNone');
		}
		if($(this).attr('id') == 'signUp'){
			$('.signUpForm').removeClass('displayNone');
			$('.signInForm').addClass('displayNone');
		}		
	})
})
// 显示APP下载浮动窗口
$(function(){
	$('.QRcode').hover(function(){
		$('.floatImg').toggleClass('displayNone')
	});
})