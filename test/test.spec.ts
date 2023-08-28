import { By, Builder, WebDriver } from 'selenium-webdriver';
import { describe, it, before, after, beforeEach } from 'mocha';
 

const TESTING_URL = 'https://tp-pruscio-selenium-poletti-giercowski-2.onrender.com/login';
const TESTING_BROWSER = 'chrome';
const LOGIN_USERNAME = 'juan';
const LOGIN_PASSWORD = '1234';
const DRIVER_TIMEOUT = 500;

var fs = require('fs');


/*------------------------------------------------------------------*/

const build_driver = async (): Promise<WebDriver> => {
    return new Builder().forBrowser( TESTING_BROWSER ).build();
};

/*------------------------------------------------------------------*/

const login_user = async ( driver: WebDriver, username: string, password: string) => {

    /* If one of them was displayed, they should all available */
    await driver.findElement( By.id( 'login_name' ) ).sendKeys( username );
    await driver.findElement( By.id( 'password' ) ).sendKeys( password );
    await driver.sleep( DRIVER_TIMEOUT );
    await driver.findElement( By.id( 'mandar_login' ) ).click();
};

/*------------------------------------------------------------------*/

describe( 'Login', async () => {
    let driver: WebDriver;

    before(async () => {
        driver = await build_driver();
    });

    beforeEach( async () => {
        await driver.get( TESTING_URL );
        await driver.manage().setTimeouts({ implicit: DRIVER_TIMEOUT });
    } );

    after( async () => await driver.quit() );

    it('intenta loguear', async () => {
        /* Login */
        await login_user( driver, LOGIN_USERNAME, LOGIN_PASSWORD );

        await driver.sleep( DRIVER_TIMEOUT );

        /* Check if login was successful */
        try {
            await driver.findElement( By.id( 'error_login' ) );
 
            return new Error( 'Mensaje de error encontrado' );

        } catch ( e ) { return; }
    });

/*------------------------------------------------------------------*/

    it('intenta desloguear', async () => {
        await login_user( driver, LOGIN_USERNAME, LOGIN_PASSWORD );

        await driver.sleep( DRIVER_TIMEOUT );

        try {
            await driver.findElement( By.id( 'error_login' ) );

            return new Error( 'Mensaje de error encontrado' );

        } catch ( e ) {}

        /* Logout */
        await driver.findElement( By.id( 'cerrar_sesion' ) ).click();

        try {
            await driver.findElement( By.id( 'mandar_login' ) );

            return;

        } catch ( e ) { return new Error( 'No se encontro el mensaje de error' ); }
    });

/*------------------------------------------------------------------*/

    it('no se loguea con usuario bacio', async () => {
        
        await login_user( driver, '', '' );

        await driver.sleep( DRIVER_TIMEOUT );

        try {
            await driver.findElement( By.id( 'error_login' ) );

            return;

        } catch ( e ) { return new Error( 'Error login' ); }
    });
} );

/*------------------------------------------------------------------*/

describe( 'Random form', async () => {
    let driver: WebDriver;

    before( async () => {
        driver = await build_driver();
    } );

    beforeEach( async () => {
        await driver.get( TESTING_URL );
        await driver.manage().setTimeouts({ implicit: DRIVER_TIMEOUT });
    } );

    after( async () => { await driver.quit() } );
 
/*------------------------------------------------------------------*/

    it('Deveria dejar que un usuario envie un form completo', async () => {
        await login_user( driver, LOGIN_USERNAME, LOGIN_PASSWORD );

        await driver.findElement( By.id( 'carga_de_datos' ) ).click();
        await driver.findElement( By.id( 'nombre_peli' ) ).sendKeys( 'Avatar' );
        await driver.findElement( By.id( 'director' ) ).sendKeys( 'jose' );
        await driver.findElement( By.id( 'duracion' ) ).sendKeys( '120' );

        await driver.findElement( By.id( 'boton' ) ).click();

    } );
} );

/*------------------------------------------------------------------*/

describe( 'Nav', async () => {
    let driver: WebDriver;

    before( async () => {
        driver = await build_driver();
    } );

    beforeEach( async () => {
        await driver.get( TESTING_URL );
        await driver.manage().setTimeouts({ implicit: DRIVER_TIMEOUT });
    } );

    after( async () => await driver.quit() );

/*------------------------------------------------------------------*/

    it('El boton loguin deveria estar listo para funcionar', async () => {
        await driver.findElement( By.id( 'mandar_login' ) ).click();

        await driver.sleep( DRIVER_TIMEOUT );

        try {
            await driver.findElement( By.id( 'login_name' ) );

            return;

        } catch ( e ) { return new Error( 'No se encontro el input del usuario' ); }
    });

/*------------------------------------------------------------------*/

    it('El boton logout deveria estar precente para funcionar', async () => {
        await login_user( driver, LOGIN_USERNAME, LOGIN_PASSWORD );

        await driver.sleep( DRIVER_TIMEOUT );

        await driver.findElement( By.id( 'cerrar_sesion' ) ).click();

        await driver.sleep( DRIVER_TIMEOUT );

        try {
            await driver.findElement( By.id( 'mandar_login' ) );

            return;

        } catch ( e ) { return new Error( 'No se encontro el mensaje de error' ); }
    });
} );
