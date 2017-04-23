export class Catalog {

    public idPrimary: number;
    public idSecondary: number;
    public name: string;
    public description: string; 

    public constructor ( idSecondary: number, name : string) {
        this.idSecondary = idSecondary;
        this.name = name;
    }
}
