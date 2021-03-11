// Work started


const app=()=>{
    const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline=document.querySelector('.trackMovingOutline circle');
    const video=document.querySelector('.video-container video');

    // sounds
    
    const videos =document.querySelectorAll('.soundPicker button');
    const timeSelect=document.querySelectorAll('.timeSelector button');
    // timeDisplay
    const timeDisplay=document.querySelector('.time-Display');
    const outlinelength=outline.getTotalLength();
    console.log(outlinelength);

        let fakeDuration=600;
        outline.style.strokeDasharray=outlinelength;
        outline.style.strokeDashoffset=outlinelength;



        videos.forEach(vid=>{
            vid.addEventListener('click',function(){
               // song.src=this.getAttribute('data-sound');
                video.src=this.getAttribute('data-video');
                checkPlaying(video);
            });
        });

        //Play song
        play.addEventListener('click',()=>{
           checkPlaying(video);
        });

        //Select sound
        
        timeSelect.forEach(Option =>{
            Option.addEventListener('click' , function(){
            fakeDuration=this.getAttribute('data-time');
            timeDisplay.textContent=`${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
                
        });
        });
        //function for play and pause

        const checkPlaying=video=>{
                if(video.paused){
                    video.play();
                    play.src='./svg/pause.svg';
                   
                }
                else{
                    
                    video.pause();
                    play.src='./svg/play.svg';
                }


        };
        video.ontimeupdate=()=>{
            let currentTime=video.currentTime;
            let elapsed=fakeDuration-currentTime;
            let seconds=Math.floor(elapsed % 60);
            let minutes=Math.floor(elapsed / 60);

            let progress=outlinelength-(currentTime/fakeDuration)*outlinelength;
            outline.style.strokeDashoffset=progress;

            //Animate Text
            timeDisplay.textContent=`${minutes}:${seconds}`;

            if(currentTime>=fakeDuration){
                video.pause();
                currentTime=0;
                play.src='./svg/play.svg';
                

            }
        }

        //animating the ring

}

app();