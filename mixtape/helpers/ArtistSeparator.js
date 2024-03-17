function GetArtistSeparator(artists) {
    // Map each artist to their name
    const artistNames = artists.map(artist => artist.name);
    console.log("GetArtistSeparator", artistNames) 
    // Concatenate the names with a delimiter
    return artistNames.join(', ');    
}

function GetQueryArtistSeparator(artist) {
    const artistName = artist.replace(' ', '%20');
    return artistName
}

export {GetArtistSeparator, GetQueryArtistSeparator};