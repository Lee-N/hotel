$(function () {
    let name=decodeURI(getQueryVariable("name"));
    $("#name").text(name);




    //获取时间
    function getTime() {
        let date=new Date();
        let word="";
        let hour=date.getHours();
        if(hour>4&&hour<11)
            word="早上好,";
        else if(hour<14)
            word="中午好,";
        else if(hour<18)
            word="下午好,";
        else
            word="晚上好,";
        $(".top").children().first().text(date.toLocaleString());
        $(".top").children().last().text(word+name);
    }
    setInterval(getTime,1000);



    //左侧导航栏点击打开子页面
    $(".left li").click(function () {
        //获取a的src作为判断子页面是否打开的依据
        let src=$(this).children().first().attr("data-src");
        //判断子页面是否已经被打开
        //未打开
        if($(".right .middle ul").find("a[data-src='"+src+"']").length==0){
            // 克隆li元素添加到打开导航栏
            let dom=$(this).clone();
            dom.children().first().append(` <i class="fa fa-close"></i>`);
            $(".right .middle ul").each(function () {
                $(this).children().find("a").removeClass("active");
            })
            $(".right .middle ul").append(dom);
            dom.children().first().addClass("active");
            //将其他frame设为不可见
            $(".bottom").children().each(function () {
                $(this).css("display","none");
            })
            //将新的子页面添加上
            $(".bottom").append(`<iframe src="${src}" "></iframe>`)
        }
        // 打开
        else{
            // 将该子页面设为可见其他子页面设为不可见
            $(".bottom").children().each(function () {
                $(this).css("display","none");
            })
            $(".bottom").find("iframe[src='"+src+"']").css("display","inline");
            //设置active
            $(".right .middle ul").each(function () {
                $(this).children().find("a").removeClass("active");
            })
            $(".right .middle ul").find("a[data-src='"+src+"']").addClass("active");
        }
    })


    //为右侧子页面导航栏添加点击事件
    $(".right .middle ul").on("click","span",function () {
        $(".right .middle ul").each(function () {
            $(this).children().find("a").removeClass("active");
        })
        $(this).parent().addClass("active");
        $(".bottom").children().each(function () {
            $(this).css("display","none");
        })
        let src=$(this).parent().attr("data-src");
        $(".bottom").find("iframe[src='"+src+"']").css("display","inline");
    })

    //子页面关闭按钮点击事件 移除li 移除iframe
    $(".right .middle ul").on("click","i",function () {
        let src=$(this).parent().attr("data-src");
        $(".bottom").find("iframe[src='"+src+"']").remove();
        $(this).parents("li").remove();
    })



})
//获取url中的参数
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}