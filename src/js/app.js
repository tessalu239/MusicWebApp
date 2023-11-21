/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       MINH THU LU
 *      Student ID: 126144229
 *      Date:       Nov 16th,2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
document.addEventListener('DOMContentLoaded', ()=>{
    const menuNav= document.getElementById('menu');
    const selectedArtist=document.getElementById('selected-artist');
    const songCards=document.getElementById('cards');

    artists.forEach(artist => {
        const menuBtn= document.createElement('button');
        menuBtn.textContent=artist.name;
        menuBtn.classList.add('artist-button');
        menuBtn.addEventListener('click',()=>{
            selectedArtist.textContent=artist.name;
            showDetails(artist);
            //showSongList(artist);
            showSongCards(artist);
        });
        menuNav.appendChild(menuBtn);
    });
    
    function showDetails(artist) {
        const artistLinks = document.getElementById('artist-links');
        artistLinks.innerHTML = '';
    
        artist.urls.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.textContent = link.name;
            anchor.target = '_blank';
            anchor.classList.add('link');
    
            anchor.addEventListener('click', function(event) {
                event.preventDefault(); 
                window.open(link.url, '_blank');
            });
    
            const comma = document.createTextNode(', ');
            
            artistLinks.appendChild(anchor);
            artistLinks.appendChild(comma);
        });
    
        artistLinks.lastChild.remove();
    }
    
    function showSongCards(artist){
        songCards.innerHTML='';//clear previous cards
        const songsByArtist=songs.filter(song=>song.artistId===artist.artistId && !song.explicit);
        
        songsByArtist.forEach(song=>{
            const card=createCard(song);
            songCards.appendChild(card);
        });
    }

    function createCard(song) {
        const card = document.createElement("div");
        card.classList.add("song-card");
    
        const image = document.createElement("img");
        image.src = song.imgUrl;
        image.alt = song.title;
        image.addEventListener('click',function(){
            window.open(song.url,'_blank');
        });
        card.appendChild(image);
    
        const songInfo = document.createElement("div");
        songInfo.classList.add("song-info");
    
        const songName = document.createElement("h3");
        songName.textContent = song.title;
        songInfo.appendChild(songName);
    
        const yearRecorded = document.createElement("p");
        yearRecorded.textContent = `Year Recorded: ${song.year}`;
        songInfo.appendChild(yearRecorded);
    
        const duration = document.createElement("p");
        const minutes = Math.floor(song.duration / 60);
        const seconds = song.duration % 60;
        duration.textContent = `Duration: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        songInfo.appendChild(duration);
    
        card.appendChild(songInfo);
        return card;
    }
})
// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
