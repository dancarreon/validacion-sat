import {LogoHeader} from "./logos/LogoHeader.tsx";

export const Header = () => {
    return (
        <div className='bg-[#0C231E] w-full inline-flex h-[46px]'>
            <LogoHeader/>
            {/*<img src="/src/assets/images/logoheader.svg" alt="Página de inicio, Gobierno de México"/>*/}
            <a href="https://www.gob.mx/tramites">Trámites</a>
            <a href="https://www.gob.mx/gobierno">Gobierno</a>
            <a href="https://www.gob.mx/busqueda">
                <span className="sr-only">Búsqueda</span>
                <i className="icon-search"></i>
            </a>
        </div>
    )
}
