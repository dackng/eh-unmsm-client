export class Catalog {

    public primaryId: number;
    public secondaryId: number;
    public name: string;
    public description: string;
    public state: string; 

    public constructor ( secondaryId: number, name : string) {
        this.secondaryId = secondaryId;
        this.name = name;
    }
}
