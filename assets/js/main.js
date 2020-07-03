$(document).ready(function(){

    $(".overlay").click(function(e){
        e.preventDefault();
        var dt=$(this).data('img');
        var pr=$(this).data('project');
        var tags=$(this).data('tags');
        var name=$(this).data('name');

        var arr=dt.split(',');
        for(var i=0; i<arr.length;i++){
            $('.slider-of-work').append("<div class='carousel-cell'>" +
                "<img src="+'assets/content/'+pr+'/'+arr[i]+">" +
                "<div class='text'>" +
                "<span class='name'>"+name+"</span>"+
                "<span class='tags'>"+tags+"</span>"+
                "</div>" +
                "</div>");
        }
        $(".modal-window.pages").fadeToggle(300);
        $(".slider-of-work").flickity({
            cellSelector: '.carousel-cell',
            contain:true,
            imagesLoaded: true,
            prevNextButtons: true,
            adaptiveHeight:true,
        });
    });
    var init=function(){
        $('.tiles').directionalHover({
            overlay:'overlay',
            easing:'swing',
            speed:200
        });
    }
    init();
    $("#pages-wrapper").on('click','a',function(e){
        e.preventDefault();
        var dt=$(this).data('img');
        var pr=$(this).data('project');
        var tags=$(this).data('tags');
        var name=$(this).data('name');

        var arr=dt.split(',');
        for(var i=0; i<arr.length;i++){
            $('.slider-of-work').append("<div class='carousel-cell'>" +
                "<img src="+'assets/content/'+pr+'/'+arr[i]+">" +
                "<div class='text'>" +
                "<span class='name'>"+name+"</span>"+
                "<span class='tags'>"+tags+"</span>"+
                "</div>" +
                "</div>");
        }
        $(".modal-window.pages").fadeToggle(300);
        $(".slider-of-work").flickity({
            cellSelector: '.carousel-cell',
            contain:true,
            imagesLoaded: true,
            prevNextButtons: true,
            adaptiveHeight:true,
        });
    });


    tilesSlide=function(el){

        var getRand=function(n,x){
            var min = n, max = x;
            var rand = min - 0.5 + Math.random()*(max-min+1)
            rand = Math.round(rand);
            return rand;
        };

        var tile=$('.tiles',el);

        var iteration=function(index){
            var item=tile.eq(index);

            var interval=getRand(7000,11000);

            var size=$('img',item).length-1;
            var count=size;
            setInterval(function() {
                count--;
                if(count<0){
                    count=size
                }

                item.find('img').fadeOut(1000).eq(count).stop().fadeIn(1000)

            }, interval)
        };

        for(var i=0; i<tile.length;i++){
            iteration(i)
        }
    };

    tilesSlide($('#tiles-wrapper'));


    $('.menu-list').on('click','a',function(event){
        event.preventDefault();
        $(this).closest(".menu-list").find('a').removeClass("li-active");
        $(this).addClass("li-active");

        var data=$(this).data();

        if(data['submenu']!=undefined){
            var el=$(data['submenu'])
            el.toggle(300);
            $("#main-menu").one('click','a:not(.li-active)',function(){
                el.hide(300);
            });
            $("#main-menu").one('click',function(){
                el.find('a').removeClass("li-active");
            });
        };
        if($(this).data['toggle']!=undefined){
            var sh_el=$(data['toggle']);
            sh_el.slideToggle(600);
        };
        if(data['show']!=undefined){
            var els=$(data['show']);
            $('.tiles .img-wrapper').fadeOut(500);
            $(els).fadeIn(500);
            $("#main-menu").one('click',function(){
                $('.tiles .img-wrapper').fadeIn(500);
                $("#visualization").hide(500);
            })
        };
        if(data['load']!=undefined){
            var page="assets/pages/"+data['load'];
            var pgWrapper=$('#pages-wrapper');
            var tlWrapper=$('#tiles-wrapper');
            pgWrapper.load(page,function(){
                tlWrapper.hide();
                $(this).fadeIn(500);

                if($('.tiles',pgWrapper).length>0){
                tilesSlide(pgWrapper);
                }

                $("#main-menu").one('click',function(){
                    pgWrapper.hide().empty();
                    tlWrapper.fadeIn(500);
                });
                init();
            })
        };
        if(data['modal']!=undefined){
            var md_show=$(data['modal']);
            md_show.fadeToggle(300);
        };
    });


    $(".modal-content-close").click(function(e){
       e.preventDefault();
       $(this).closest('.modal-window').fadeToggle(300);
        $(".slider-of-work").flickity('destroy');
       $('.carousel-cell').remove();
    });

    $('.pages').click(function(e){
       var tgt=$('.slider-of-work');
       if(e.target!=tgt[0]&&!tgt.has(e.target).length){
           tgt.closest('.pages').fadeOut(600);
           $(".slider-of-work").flickity('destroy');
           $('.carousel-cell').remove();
       }
    });


    $('body').on('click','[data-toggle]',function(event){
        event.preventDefault();
        var data=$(this).data();
        var el=$(data['toggle']);
        el.toggle();
    });

})