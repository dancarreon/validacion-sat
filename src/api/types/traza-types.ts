import {StatusType} from "./status-type.ts";

export interface TrazaType {
    id: string;
    tadDireccionId?: string;
    claveConcentradoraId?: string;
    razonSocialComercialId?: string;
    productoId?: string;
    capAutotanque1?: number | null;
    capAutotanque2?: number | null;
    capAutotanque3?: number | null;
    litrosTotales?: number | null;
    precioLitro?: number | null;
    destino?: string | null;
    sello1Autotanque1?: string | null;
    sello2Autotanque1?: string | null;
    sello1Autotanque2?: string | null;
    sello2Autotanque2?: string | null;
    nombreTransportista?: string | null;
    nombreOperador?: string | null;
    fechaHoraPemex?: Date | null;
    fechaHoraTrasvase?: Date | null;
    folioPemex1?: string | null;
    folioPemex2?: string | null;
    folioPemex3?: string | null;
    folioFiscalPemex1?: string | null;
    folioFiscalPemex2?: string | null;
    folioFiscalPemex3?: string | null;
    folioRemisionNacional?: string | null;
    folioFiscalRemisionNacional?: string | null;
    folioTrasvase?: string | null;
    numeroTractor?: string | null;
    placasTractor?: string | null;
    autotanque1?: string | null;
    placasAutotanque1?: string | null;
    autotanque2?: string | null;
    placasAutotanque2?: string | null;
    autotanque3?: string | null;
    folio?: string | null;
    cfi?: string | null;
    destinoCorto?: string | null;
    numeroLicencia?: string | null;
    marcaUnidad1?: string | null;
    folioCartaPorte?: string | null;
    folioFiscalCartaPorte?: string | null;
    status?: StatusType;
    createdAt?: Date;
    updatedAt?: Date;
    razonSocialComercial: RazonType | null;
    claveConcentradora: ClaveType | null;
}

export interface RazonType {
    id: string;
    name: string;
    status: StatusType;
    createdAt: Date;
    updatedAt: Date;
}

export interface ClaveType {
    id: string;
    clave: string;
    name: string;
    status: StatusType;
    createdAt: Date;
    updatedAt: Date;
}

export class Traza implements Omit<TrazaType, 'id' | 'createdAt' | 'updatedAt'> {
    constructor(partial: Partial<TrazaType>) {
        Object.assign(this, partial);
    }

    status!: StatusType;
    tadDireccionId!: string;
    claveConcentradoraId!: string;
    razonSocialComercialId!: string;
    productoId!: string;
    capAutotanque1!: number | null;
    capAutotanque2!: number | null;
    capAutotanque3!: number | null;
    litrosTotales!: number | null;
    precioLitro!: number | null;
    destino!: string | null;
    sello1Autotanque1!: string | null;
    sello2Autotanque1!: string | null;
    sello1Autotanque2!: string | null;
    sello2Autotanque2!: string | null;
    nombreTransportista!: string | null;
    nombreOperador!: string | null;
    fechaHoraPemex!: Date | null;
    fechaHoraTrasvase!: Date | null;
    folioPemex1!: string | null;
    folioPemex2!: string | null;
    folioPemex3!: string | null;
    folioFiscalPemex1!: string | null;
    folioFiscalPemex2!: string | null;
    folioFiscalPemex3!: string | null;
    folioRemisionNacional!: string | null;
    folioFiscalRemisionNacional!: string | null;
    folioTrasvase!: string | null;
    numeroTractor!: string | null;
    placasTractor!: string | null;
    autotanque1!: string | null;
    placasAutotanque1!: string | null;
    autotanque2!: string | null;
    placasAutotanque2!: string | null;
    autotanque3!: string | null;
    folio!: string | null;
    cfi!: string | null;
    destinoCorto!: string | null;
    numeroLicencia!: string | null;
    marcaUnidad1!: string | null;
    folioCartaPorte!: string | null;
    folioFiscalCartaPorte!: string | null;
    razonSocialComercial!: RazonType | null;
    claveConcentradora!: ClaveType | null;
}
