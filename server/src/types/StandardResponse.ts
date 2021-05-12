import * as JWT from "jsonwebtoken";

interface StandardResponse {
    success: boolean;
    message?: string;
    errors?: {[index:string]:Array<string>};
    data?: {[index:string]:any};
}

export type {StandardResponse};