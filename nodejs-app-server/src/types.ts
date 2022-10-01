export interface Food {
    name: string;
    amount: number;
    unit: "gram" | "piece";
    expireDate?: string;
}