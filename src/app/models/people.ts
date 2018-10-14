import { Character } from './character';

    export interface People {
        count: number;
        next: string;
        previous: string;
        results: Character[];
    }
