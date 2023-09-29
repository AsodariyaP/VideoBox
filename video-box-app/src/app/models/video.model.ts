import { DecimalPipe } from "@angular/common";

export class Video {
    id?: string;
    title?: string;
    createdDate?: string;
    previewUrl?: string;
    author?: { id?: string, name?: string, pictureUrl?: string };
}

export class VideoDetails {
    id?: string;
    title?: string;
    createdDate?: string;
    previewUrl?: string;
    author?: { id?: string, name?: string, pictureUrl?: string };
    url?: string;
    description?: string;
}

export class Reactions {
    id?: string;
    title?: string;
    postedDate?: Date;
    createdDate?: Date;
    previewUrl?: string;
    author?: { id?: string, name?: string, pictureUrl?: string };
    timeframe?: Number;
    type?: string;

}


export class StarReaction {
    videoId?: string | null;
    type?: 'star';
    timeframe?: number; // video player current time in seconds
}

export enum View {
    grid = 'grid',
    list = 'list'
}
