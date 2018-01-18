$(document).ready(apply_click_handlers);
function apply_click_handlers(){
    $('.project-item').click(function(){
        $(this).find('.overlay-mask').toggleClass('show_overlay');
        $(this).find('.project-title').toggleClass('show_project_title');
    })
    $('.media').click(function(){
        $(this).find('.icon-1').toggleClass('.icon_1_click');
        $(this).find('.icon-2').toggleClass('.icon_2_click');
    })
    $('.scrollto').click(function(){$('body').scrollTo($(this).attr('href'),{duration:500,offset:-300});});
}