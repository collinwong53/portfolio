$(document).ready(apply_click_handlers);
function apply_click_handlers(){
    $('.project-item').click(function(){
        $(this).find('.overlay-mask').toggleClass('show_overlay');
        $(this).find('.project-title').toggleClass('show_project_title');
    })
}