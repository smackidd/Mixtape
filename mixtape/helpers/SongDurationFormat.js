function formatDuration(duration) {
    console.log("duration", duration)
    const totalSeconds = duration / 1000; // Convert milliseconds to seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Add leading zero if seconds < 10
};

export {formatDuration};