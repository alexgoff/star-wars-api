export class Film {
    title: string;
    episode_id: number;
    url: string;

    construction(title: string, episode_id: number, url: string) {
        this.title = title;
        this.episode_id = episode_id;
        this.url = url;
    }
}
