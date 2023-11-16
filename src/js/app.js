/**
 * WEB222 – Assignment 04
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
 *      Date:       Nov 2nd,2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
document.addEventListener('DOMContentLoaded', ()=>{
    const menuNav= document.getElementById('menu');
    const selectedArtist=document.getElementById('selected-artist');
    artists.forEach(artist => {
        const menuBtn= document.createElement('button');
        menuBtn.textContent=artist.name;
        menuBtn.classList.add('artist-button');
        menuBtn.addEventListener('click',()=>{
            selectedArtist.textContent=artist.name;
            showDetails(artist);
            showSongList(artist);
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
    
    function showSongList(artist) {
        const tbodyElement = document.querySelector('tbody');    
    
        tbodyElement.innerHTML = '';
    
        const songsForArtist = songs.filter(song => song.artistId === artist.artistId && !song.explicit);
    
        songsForArtist.forEach(song => {
            const trElement = document.createElement('tr');
    
            trElement.addEventListener('click', function() {
                console.log(`Clicked on song: ${song.title}`);
            });
    
            const tdTitle = document.createElement('td');
            tdTitle.textContent = song.title;
    
            const tdYear = document.createElement('td');
            tdYear.textContent = song.year;
    
            const tdDuration = document.createElement('td');
            const minutes = Math.floor(song.duration / 60);
            const seconds = song.duration % 60;
            tdDuration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
            const songLink = document.createElement('a');
            songLink.href = song.url;
            songLink.textContent = song.title;
            songLink.target = '_blank';
            tdTitle.innerHTML = '';
            tdTitle.appendChild(songLink);
    
            trElement.appendChild(tdTitle);
            trElement.appendChild(tdYear);
            trElement.appendChild(tdDuration);
    
            tbodyElement.appendChild(trElement);
        });
    }
    
})
// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
