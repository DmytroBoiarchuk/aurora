export function formatTime(timeToFormat): string {
    const hours: number = Math.floor(timeToFormat);
    const minutes: number = (timeToFormat - hours) * 60;
    return `${hours}:${minutes === 0? '00' : minutes }`;
}

export function formatDuration(timeToFormat): string {
    const hours: number = Math.floor(timeToFormat);
    const minutes: number = (timeToFormat - hours) * 60;
    return `${hours? `${hours} ${hours>1? 'hours' : 'hour'}`:''} ${minutes === 0? '' : `${minutes} minutes` } `;
}

