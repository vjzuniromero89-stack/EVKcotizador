# Cotizador CBM — EVK Transportaciones

Aplicación para cotizar productos importados calculando el CBM que realmente cobra
la naviera, llevando el registro interno con costos y ganancia, y entregando al
cliente una hoja profesional para imprimir o enviar por WhatsApp.

## Contenido del paquete

### `index.html` — la app lista para publicar

Un solo archivo con todo adentro (React, estilos y código ya compilados).
No necesita instalar nada ni carpeta de assets.

- Para publicarla: súbelo tal cual a Vercel, Netlify o cualquier hosting.
- Para probarla en la computadora: ábrelo con doble clic.

### `proyecto-react/` — el código fuente

El proyecto sin compilar, para seguir desarrollando:

```bash
cd proyecto-react
npm install
npm run dev      # abre la app mientras la editas
npm run build    # genera la versión final en dist/
```

Archivos:

- `src/App.jsx` — toda la aplicación.
- `src/logo.js` — el logo de EVK Transportaciones que viene por defecto.
- `src/main.jsx`, `src/index.css`, `index.html` — arranque del proyecto.
- `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js` — configuración.

Este código genera exactamente el `index.html` de arriba, así que las dos
versiones ya están sincronizadas: lo que cambies en `src/App.jsx` y compiles con
`npm run build` se puede volver a empaquetar en un solo archivo.

### `index-version-anterior.html`

La versión que estabas usando antes de unificar, por si quieres comparar o
volver atrás. Funciona igual; puedes borrarla cuando ya no la necesites.

## Qué hace la app

**Producto**

- Tarjeta de tu empresa: logo, nombre y contacto. Aparecen en las cotizaciones.
- Catálogo con foto, código, nombre, CBM, peso, precio CBM, precio producto y precio de venta.
- Compara el CBM por volumen contra el CBM por peso (peso ÷ 350) y resalta el mayor,
  que es el que cobra la naviera.

**Cotizaciones clientes**

- Se arma con todos los productos que quieras; cada línea permite ajustar cantidad,
  precio CBM y precio de venta sin tocar el catálogo.
- Campo de descuento en porcentaje: resta del total y muestra "Total con descuento".
- Al registrar recibe número CLI-XXXX y se copia automáticamente al registro interno
  con el mismo número.
- Hoja del cliente: solo cantidades, CBM, peso, precio de venta y totales.

**Cotizaciones internas**

- Solo registro: no se crean a mano, llegan desde las cotizaciones de clientes.
- Muestran precio de productos, precio CBM, subtotal, cargo del 3% de la página,
  total de venta al cliente y la ganancia.
- Etiqueta amarilla con el porcentaje cuando la cotización lleva descuento.
- Al eliminar la cotización del cliente se borra también este registro.

**Hoja de cotización**

- Botones Imprimir, Ver y WhatsApp en cada cotización.
- Imprimir abre el diálogo del sistema; desde ahí puedes guardar en PDF.
- Ver muestra la hoja en pantalla tal como saldrá.
- WhatsApp la envía como imagen PNG.
- La hoja interna sale marcada en rojo como USO INTERNO.

## Reglas de cálculo

- CBM a cobrar = el mayor entre el CBM por volumen y el peso ÷ 350.
- Precio CBM de la línea = CBM a cobrar × precio CBM × cantidad.
- Costo interno = precio de los productos + precio CBM.
- Cargo de la página = 3% del subtotal interno.
- Ganancia = total de venta al cliente (ya con descuento) − total general interno.

## Dónde se guardan los datos

Todo se guarda en el navegador del dispositivo (IndexedDB), no en un servidor:

- Cada celular o computadora tiene su propia lista de productos y cotizaciones.
- Los datos sobreviven al cerrar el navegador, pero se pierden si borras los datos
  de navegación del sitio.
- Si publicas la app en otro dominio, ese dominio empieza vacío.

Conviene ir guardando en PDF las cotizaciones importantes.
