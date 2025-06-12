import React, {useEffect, useState} from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z, type ZodType} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useParams} from 'react-router';
import type {Traza} from "../api/types/traza-types.ts";
import {getTraza} from "../api/trazas-api.ts";

interface CFDIData {
    uuid: string;
    rfcEmisor: string;
    rfcReceptor: string;
    captchaNumbers: string;
}

const imagenes = [
    '/images/GeneraCaptcha.jpeg',
    '/images/GeneraCaptcha2.jpeg',
    '/images/GeneraCaptcha3.jpeg',
    '/images/GeneraCaptcha4.jpeg',
    '/images/GeneraCaptcha5.jpeg',
    '/images/GeneraCaptcha6.jpeg'
];

const CFDISchema: ZodType = z.object({
    uuid: z.string({
        required_error: "Este campo es obligatorio",
    }).min(36, "Este campo es obligatorio"),
    rfcEmisor: z.string({
        required_error: "Este campo es obligatorio",
    }).min(1, "Este campo es obligatorio").regex(/^([A-ZÑ&]{3,4})(\d{2})(\d{2})(\d{2})([A-Z\d]{3})?$/i),
    rfcReceptor: z.string({
        required_error: "Este campo es obligatorio",
    }).min(1, "Este campo es obligatorio").regex(/^([A-ZÑ&]{3,4})(\d{2})(\d{2})(\d{2})([A-Z\d]{3})?$/i),
    captchaNumbers: z.string({
        required_error: "Este campo es obligatorio",
    }).min(1, "ERROR: Los valores que aparecen en la imagen son dígitos, favor de ingresarlos nuevamente"),
})

const CFDIForm: React.FC = () => {

    const {cfdi} = useParams();
    const [captchaImage, setCaptchaImage] = useState<string>('');
    const [record, setRecord] = useState<Traza>({} as Traza);
    const [validRecord, setValidRecord] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm<CFDIData>({
        resolver: zodResolver(CFDISchema),
    });

    const onSubmit: SubmitHandler<CFDIData> = async () => {
        setValidRecord(true);
        //window.location.href = 'https://verificacfdi-facturaelectronica.com.mx/default.aspx/2--.html';
    };

    const mostrarImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        setCaptchaImage(imagenes[indiceAleatorio]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;

        if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Insert' || key === 'Tab' || key === 'Home') {
            return;
        }

        if (!/^[A-Fa-f0-9]$/.test(key)) {
            e.preventDefault();
        } else {
            if (e.currentTarget.value === '') {
                e.currentTarget.value = key + '_______-____-____-____-____________';
                e.currentTarget.setSelectionRange(0, 1);
            } else {
                const indexInput = e.currentTarget.selectionStart || 0;
                const newValue = replaceCharAt(e.currentTarget.value, indexInput, key);

                e.currentTarget.value = formatToGUID(newValue);
                if (indexInput === 8 || indexInput === 13 || indexInput === 18 || indexInput === 23) {
                    e.currentTarget.setSelectionRange(indexInput + 1, indexInput + 2);
                } else {
                    e.currentTarget.setSelectionRange(indexInput + 1, indexInput + 1);
                }
            }
        }
    }

    function replaceCharAt(str: string, index: number, newChar: string): string {
        if (index < 0 || index >= str.length) return str;
        return str.slice(0, index) + newChar + str.slice(index + 1);
    }

    function formatToGUID(value: string): string {
        // Remove dashes only if the value is not empty
        value = value.replace(/-/g, '');
        // Loop through the string and format it as a GUID
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                formattedValue += '-';
            }
            formattedValue += value[i].toUpperCase();
        }
        // If the formatted value is less than 36 characters, pad it with underscores
        if (formattedValue.length < 36) {
            return formattedValue.padEnd(36, '_');
        }
        // If the formatted value is more than 36 characters, truncate it
        if (formattedValue.length > 36) {
            return formattedValue.slice(0, 36);
        }
        return formattedValue;
    }

    useEffect(() => {
        mostrarImagenAleatoria();

        async function fetchRecord() {

            const record: Traza = await getTraza(String(cfdi));
            if (record) {
                setRecord(record);
                setValue('uuid', String(cfdi));
            }
        }

        if (String(cfdi)) {
            fetchRecord().catch(console.error);
        }
    }, [cfdi, setValue]);

    return (
        <div>
            <header>
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navbarMainCollapse">
                                <span className="sr-only">Interruptor de Navegación</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand pl-1.5" href="https://www.gov.mx/">
                                <img alt="Logo SHCP" src="/images/gobmxlogo.svg" width="75" height="23"/>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarMainCollapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a href="https://www.gov.mx/tramites">
                                        <div className="font-calibri text-[14pt] tracking-wider font-light">
                                            Trámites
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.gov.mx/gobierno">
                                        <div className="font-calibri text-[14pt] tracking-wider font-light">
                                            Gobierno
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.gov.mx/busqueda">
                                        <span className="sr-only">Búsqueda</span>
                                        <img src="/images/lupa.png" alt="Busqueda"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="form-horizontal" role="form">
                <main role="main">
                    <div id="cuerpo_principal" className="container top-buffer-submenu reduce">
                        <div id="encabezado" className="row">
                            <div id="encabezadoPortal">
                                <nav className="navbar navbar-inverse sub-navbar navbar-fixed-top">
                                    <div className="container">
                                        <div className="navbar-header">
                                            <button type="button" className="navbar-toggle collapsed"
                                                    data-toggle="collapse" data-target="#subenlaces">
                                                <span className="sr-only">Interruptor de Navegación</span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                                <span className="icon-bar"></span>
                                            </button>
                                            <a className="navbar-brand"
                                               href="https://verificacfdi-facturaelectronica-sat-gob-mx.site/">
                                                <div className="factura">
                                                    Factura electrónica
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div id="cuerpo" className="container top-buffer-submenu">
                            <div className="container">
                                <div className="row">
                                    <ol className="breadcrumb">
                                        <li>
                                            <a href="http://www.gov.mx/">
                                                <img src="/images/home.png" width="13" height="12" alt="Home"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">&nbsp;&gt;&nbsp;Inicio</a>
                                        </li>
                                    </ol>
                                </div>
                                <div className="row">
                                    <img src="/images/Logo_SHCP_SAT-.jpg" alt="Logo SHCP"/>
                                </div>
                                <div className="row">
                                    <h3 className="titulo">Verificación de comprobantes fiscales digitales por
                                        internet</h3>
                                </div>
                                <hr className="red"/>
                            </div>

                            <label className="control-label">A través de esta opción, usted podrá verificar si el
                                comprobante fue certificado por el SAT</label>
                            <br/><br/>

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <span className="control-label">Folio fiscal</span>
                                    <span className="form-text">*</span>:
                                    <input
                                        type="text"
                                        maxLength={36}
                                        className="form-control uppercase mascara"
                                        onKeyDown={handleKeyDown}
                                        {...register("uuid")}
                                    />
                                    {errors.uuid && (
                                        <small className="form-text form-text-error">Este campo es obligatorio</small>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <span className="control-label">RFC emisor</span>
                                    <span className="form-text">*</span>:
                                    <input
                                        type="text"
                                        maxLength={13}
                                        className="form-control uppercase"
                                        {...register("rfcEmisor")}
                                    />
                                    {errors.rfcEmisor && (
                                        <small className="form-text form-text-error">Este campo es obligatorio</small>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <span className="control-label">RFC receptor</span>
                                    <span className="form-text">*</span>:
                                    <input
                                        type="text"
                                        maxLength={13}
                                        className="form-control uppercase"
                                        {...register("rfcReceptor")}
                                    />
                                    {errors.rfcReceptor && (
                                        <small className="form-text form-text-error">Este campo es obligatorio</small>
                                    )}
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <div className="captcha">
                                        <img src={captchaImage} width="150" height="100" alt="Captcha"/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <span className="control-label">Proporcione los dígitos de la imagen</span>
                                    <span className="form-text">*</span>:
                                    <input
                                        type="text"
                                        maxLength={5}
                                        className="form-control"
                                        {...register("captchaNumbers")}
                                    />
                                    {errors.captchaNumbers && (
                                        <small className="form-text form-text-error">Este campo es obligatorio</small>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <br/>
                                    <button type="submit" className="btn btn-primary pull-right">
                                        Verificar CFDI
                                    </button>
                                </div>
                            </div>

                            <div className="col-md-12 form-group">
                                <div className="col-md-8 pull-left text-muted text-vertical-align-button" style={{
                                    marginLeft: '-2px',
                                }}>
                                    * Datos obligatorios
                                </div>
                            </div>
                            {
                                errors.uuid || errors.rfcEmisor || errors.rfcReceptor || errors.captchaNumbers ? (
                                    <div className="noPrint">
                                        <div id="ctl00_MainContent_VsResumenErrores"
                                             className="col-md-12 alert alert-danger" style={{color: 'red'}}>
                                            {errors.uuid && (
                                                <div>
                                                    ERROR: El folio fiscal no cumple con el formato correcto, favor de
                                                    ingresarlo nuevamente<br/>
                                                </div>
                                            )}
                                            {errors.rfcEmisor && (
                                                <div>
                                                    ERROR: El RFC del emisor proporcionado no es correcto, favor de
                                                    ingresarlo nuevamente<br/>
                                                    (13 posiciones para personas físicas y 12 posiciones para personas
                                                    morales)<br/>
                                                </div>
                                            )}
                                            {errors.rfcReceptor && (
                                                <div>
                                                    ERROR: El RFC del receptor proporcionado no es correcto, favor de
                                                    ingresarlo nuevamente<br/>
                                                    (13 posiciones para personas físicas y 12 posiciones para personas
                                                    morales)<br/>
                                                </div>
                                            )}
                                            {errors.captchaNumbers && (
                                                <div>
                                                    ERROR: Los valores que aparecen en la imagen son dígitos, favor de
                                                    ingresarlos nuevamente<br/>
                                                </div>
                                            )}
                                        </div>
                                        <br/>
                                    </div>
                                ) : null
                            }
                            {
                                validRecord ? (
                                    <div id="ctl00_MainContent_PnlResultados">
                                        <div className="form-group" id="DivContenedor">
                                            <div className="col-sm-12" id="ContenedorDinamico"
                                                 style={{overflow: 'auto'}}>
                                                <table className="table table-striped">
                                                    <tbody>
                                                    <tr className="headerTable">
                                                        <th>RFC del emisor</th>
                                                        <th>Nombre o razón social del emisor</th>
                                                        <th>RFC del receptor</th>
                                                        <th>Nombre o razón social del receptor</th>
                                                    </tr>
                                                    <tr className="dataTable">
                                                        <td>
                                                            <span id="ctl00_MainContent_LblRfcEmisor">
                                                                {getValues('rfcEmisor')}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span id="ctl00_MainContent_LblNombreEmisor">
                                                                {record.razonSocialComercial?.name}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span id="ctl00_MainContent_LblRfcReceptor">
                                                                {getValues('rfcReceptor')}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span id="ctl00_MainContent_LblNombreReceptor">
                                                                {record.razonSocialComercial?.name}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr className="headerTable">
                                                        <th>Folio fiscal</th>
                                                        <th>Fecha de expedición</th>
                                                        <th>Fecha certificación SAT</th>
                                                        <th>PAC que certificó</th>
                                                    </tr>
                                                    <tr className="dataTable">
                                                        <td>
                                                            <span id="ctl00_MainContent_LblUuid">
                                                                {record.folio}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span id="ctl00_MainContent_LblFechaEmision">
                                                                {String(record.fechaHoraPemex)}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span id="ctl00_MainContent_LblFechaCertificacion">
                                                                {String(record.fechaHoraPemex)}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span id="ctl00_MainContent_LblRfcPac">
                                                                {record.claveConcentradora?.clave}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total del CFDI</th>
                                                        <th>Efecto del comprobante</th>
                                                        <th>Estado CFDI</th>
                                                        <th id="ctl00_MainContent_thDinamico"
                                                            style={{visibility: 'hidden'}}>Estatus de cancelación
                                                        </th>
                                                    </tr>
                                                    <tr className="dataTable">
                                                        <td>
                                                            <span id="ctl00_MainContent_LblMonto">
                                                                {record.litrosTotales! * record.precioLitro!}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span
                                                                id="ctl00_MainContent_LblEfectoComprobante">Ingreso</span>
                                                        </td>
                                                        <td>
                                                            <span id="ctl00_MainContent_LblEstado">
                                                                {record.status === 'ACTIVE' ? 'Vigente' : 'Cancelado'}
                                                            </span>
                                                        </td>
                                                        <td id="ctl00_MainContent_tdDinamico"
                                                            style={{visibility: 'hidden'}}>
                                                            <span id="ctl00_MainContent_LblEsCancelable">Cancelable con aceptación</span>
                                                        </td>
                                                    </tr>
                                                    <tr className="headerTable">
                                                        <th id="ctl00_MainContent_thEstatusCancelacion"
                                                            style={{visibility: 'hidden'}}>Estatus de cancelación
                                                        </th>
                                                        <th id="ctl00_MainContent_thFechaCancelacion"
                                                            style={{visibility: 'hidden'}}>Fecha de Proceso de
                                                            Cancelación
                                                        </th>
                                                        <th style={{visibility: 'hidden'}}></th>
                                                        <th style={{visibility: 'hidden'}}></th>
                                                    </tr>
                                                    <tr className="dataTable">
                                                        <td id="ctl00_MainContent_tdEstatusCancelacion"
                                                            style={{visibility: 'hidden'}}>
                                                            <span id="ctl00_MainContent_LblEstatusCancelacion"></span>
                                                        </td>
                                                        <td id="ctl00_MainContent_tdFechaCancelacion"
                                                            style={{visibility: 'hidden'}}>
                                                            <span id="ctl00_MainContent_LblFechaCancelacion"></span>
                                                        </td>
                                                        <td style={{visibility: 'hidden'}}>
                                                        </td>
                                                        <td style={{visibility: 'hidden'}}>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="pull-right">
                                                <input type="hidden" name="ctl00$MainContent$strBusqueda"
                                                       id="ctl00_MainContent_strBusqueda"
                                                       value="00E6E380-0016-4493-A965-1FF887608D90|BBA830831LJ2|ZOOL590605TG3"/>
                                                <input type="button" id="BtnImprimir" value="Imprimir"
                                                       className="btn btn-primary"/>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </main>

                <footer className="main-footer noPrint">
                    <div className="list-info footer-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3 col-md-3 col-lg-3 footer-img">
                                    <img src="/images/logofooter.svg" alt="Logo Footer"
                                         style={{width: '99%', marginLeft: '1px'}}/>
                                </div>
                                <div className="col-sm-3 parrafo-enlaces">
                                    <div className="font-calibri text-[16pt] tracking-wider font-light">
                                        <h5>Enlaces</h5>
                                    </div>
                                    <ul>
                                        <li><a href="http://www.participa.gob.mx/" className="text-decoration-none">
                                            <div
                                                className="font-calibri text-[11pt] tracking-wider font-normal">Participa
                                            </div>
                                        </a></li>
                                        <li><a href="https://www.gob.mx/publicaciones" className="text-decoration-none">
                                            <div
                                                className="font-calibri text-[11pt] tracking-wider font-normal">Publicaciones
                                                Oficiales
                                            </div>
                                        </a></li>
                                        <li><a href="http://www.ordenjuridico.gob.mx/" className="text-decoration-none">
                                            <div className="font-calibri text-[11pt] tracking-wider font-normal">Marco
                                                Jurídico
                                            </div>
                                        </a></li>
                                        <li><a href="https://consultapublicamx.inai.org.mx/vut-web/" target="_blank"
                                               className="text-decoration-none">
                                            <div
                                                className="font-calibri text-[11pt] tracking-wider font-normal">Plataforma
                                                Nacional de<br/>Transparencia
                                            </div>
                                        </a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-3 parrafo-enlaces">
                                    <div className="font-arial text-[18pt] tracking-wider font-normal">
                                        <h5>¿Qué es gob.mx?</h5>
                                    </div>
                                    <p className="font-calibri text-[11pt] leading-6 tracking-wider font-normal">Es el
                                        portal único de trámites,<br/>información y participación<br/>cuidadana. <a
                                            href="https://www.gob.mx/que-es-gobmx" className="text-decoration-none">Leer
                                            más</a></p>
                                    <ul>
                                        <li><a href="https://datos.gob.mx/" className="text-decoration-none">
                                            <div className="font-calibri text-[11pt] tracking-wider font-normal">Portal
                                                de datos abiertos
                                            </div>
                                        </a></li>
                                        <li><a href="https://www.gob.mx/accesibilidad" className="text-decoration-none">
                                            <div
                                                className="font-calibri text-[11pt] tracking-wider font-normal">Declaración
                                                de accesibilidad
                                            </div>
                                        </a></li>
                                        <li><a href="https://www.gob.mx/privacidadintegral" target="_blank"
                                               className="text-decoration-none">
                                            <div className="font-calibri text-[11pt] tracking-wider font-normal">Aviso
                                                de privacidad integral
                                            </div>
                                        </a></li>
                                        <li><a href="https://www.gob.mx/privacidadsimplificado" target="_blank"
                                               className="text-decoration-none">
                                            <div className="font-calibri text-[11pt] tracking-wider font-normal">Aviso
                                                de privacidad simplificado
                                            </div>
                                        </a></li>
                                        <li><a href="https://www.gob.mx/terminos#medidas-seguridad-informacion"
                                               target="_blank" className="text-decoration-none">
                                            <div
                                                className="font-calibri text-[11pt] tracking-wider font-normal">Términos
                                                y condiciones
                                            </div>
                                        </a></li>
                                        <li><a href="https://www.gob.mx/terminos#medidas-seguridad-informacion"
                                               target="_blank" className="text-decoration-none">
                                            <div
                                                className="font-calibri text-[11pt] tracking-wider font-normal">Política
                                                de seguridad
                                            </div>
                                        </a></li>
                                        <li><a href="https://www.gob.mx/sitemap" target="_blank"
                                               className="text-decoration-none">
                                            <div className="font-calibri text-[11pt] tracking-wider font-normal">Mapa de
                                                sitio
                                            </div>
                                        </a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-2 col-md-3 col-lg-3 parrafo-titulo">
                                    <p>
                                        <a href="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54"
                                           className="text-decoration-none" style={{fontSize: "15px"}}>
                                            Denuncia contra servidores públicos
                                        </a>
                                    </p>
                                    <div className="font-arial text-[18pt] tracking-wider font-light">
                                        <h5>Síguenos en</h5>
                                    </div>
                                    <ul className="list-inline">
                                        <li>
                                            <a href="https://www.facebook.com/govmx" target="_blank"
                                               aria-label="Facebook de presidencia">
                                                <img src="/images/facebook.png" width="19" height="24" alt="Facebook"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/govmx" target="_blank"
                                               aria-label="Twitter de presidencia">
                                                <img src="/images/twitter.png" width="24" height="24" alt="Twitter"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid gobmx-footer">
                        <div className="row">
                            <div className="col"><br/><br/></div>
                        </div>
                    </div>
                    <img src="/images/pleca.svg" alt="Pleca"/>
                </footer>
            </form>
        </div>
    );
};

export default CFDIForm;
