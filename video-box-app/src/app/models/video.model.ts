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
    postedDate?: Date | undefined;
    createdDate?: Date | undefined;
    previewUrl?: string;
    author?: { id?: string, name?: string, pictureUrl?: string };
    timeframe?: number;
    type?: string;
}

export class StarReaction {
    videoId?: string | null;
    type?: ReactionType.star;
    timeframe?: number;
}
export class SnapshotReaction { 
    videoId?: string | null;
    type?: ReactionType.snapshot;
    timeframe?: number; // video player current time in seconds
    dataUri?: string | null; 
}

export enum View {
    grid = 'grid',
    list = 'list'
}

export enum ReactionType {
    snapshot = 'snapshot',
    star = 'star'
}