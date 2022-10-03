export interface Food {
  name: string;
  amount: number;
  unit: "gram" | "piece";
  expireDate?: string;
}

export interface RequestConfig {
  method: string;
  headers: Headers;
  mode: "cors";
  cache: "default";
  body?: string;
}
