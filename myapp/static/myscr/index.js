document.addEventListener('DOMContentLoaded', function () {
    //получим все scrollbox



    
    const scrollingWrapper = document.querySelectorAll('.scrollingBlock');
    scrollingWrapper.forEach(scrollingBlock => {
        //активация первой ссылки сразу при создании 
         document.querySelectorAll(scrollingBlock.getAttribute('scrl') +' .index-link')[0].classList.add('active');
        scrollingBlock.addEventListener('scroll', function () {
            //кружочек который надо
            let currentIndex = -1;
            let elcount = this.children.length;
          
            //элемемент относительно видимой области
            currentIndex = ((this.scrollLeft+10) / parseFloat(getComputedStyle(this.querySelector(".item")).width));
            if (currentIndex> (elcount-1.5)) { currentIndex = elcount-1;}
            else {currentIndex = Math.floor(currentIndex)}

            if (currentIndex !== -1) {
                document.querySelectorAll(scrollingBlock.getAttribute('scrl') +' .index-link').forEach(link => link.classList.remove('active'));
                document.querySelectorAll(scrollingBlock.getAttribute('scrl') +' .index-link')[currentIndex].classList.add('active');

                }
            });
        });



     const navlinck = document.querySelectorAll('#nvb-menu a');
    navlinck.forEach(link => {
        link.addEventListener("click",

        function(){
            document.querySelector('.nav-btn').click();
        });


        }
        )


           
        }

    
);
