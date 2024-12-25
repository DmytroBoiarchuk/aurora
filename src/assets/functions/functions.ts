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

export function formatDate (dateString: string): string {
    const locale =  'en-UK';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

