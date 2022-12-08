import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const timeItem = JSON.parse(localStorage.getItem(TIME_KEY));

function playerVimeo() {
   if (timeItem !== null) {
  player.setCurrentTime(timeItem);
  };
  player.on('timeupdate', throttle((timeData) => 
    localStorage.setItem(TIME_KEY, JSON.stringify(timeData.seconds)), 1000
  ));
};

playerVimeo();