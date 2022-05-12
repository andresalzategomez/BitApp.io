# Prueba Técnica Tekus

## Contents

- [REPO](https://github.com/andresalzategomez/BitApp.io.git)
- [Description](#description)
- [Usage](#usage)
  - [Run Project ](#run-project)
- [Requirements](#requirements)
- [API](#api)
  - [Marvel API](#marvel-api)
- [Capas de la Aplicación](#Capas-de-la-Aplicación)
  - [Capa de Aplicación](#Capa-de-Aplicación)
  - [Capa de Persistencia](#Capa-de-Persistencia)
  - [Capa de Modelo](#Capa-de-Modelo)
  - [Capa de Servicio](#Capa-de-Servicio)
  - [Capa de Vista](#Capa-de-Vista)
- [License](#license)

## Description

Este proyecto está realizado en Angular y ElectronJS para la prueba ténica de Tekus. Se consume la API de CoinBase y se muestra el precio del BitCoin en las monedas: USD, COP y EUR, permitiendo ver la información aún cuándo no hay conexión a internet por medio del LocalStorage.

## Usage

### Run Project

- Se descarga el Repositorio y se abre Visual Studio code.
- Luego se ejecuta el comando "npm i"
- Luego se debe ejecutra "ng build --prod --aot" para desplegar la aplicación y crear la carpeta "dist" (Esto se hace para ejecutar el ElectronJS)
- por último se ejecuta el comando "npm start"

## Requirements

Seguir cada uno de los pasos anteriores.

## API

### CoinBase API

Se consume la API de CoinBase con las siguientes URL:
- valor de hoy "https://api.coinbase.com/v2/prices/BTC-EUR/spot"
- valor de un día en específico "https://api.coinbase.com/v2/prices/BTC-EUR/spot?date=2022-05-11"

## License

The JavaScript Templates script is released under the
[MIT license](https://opensource.org/licenses/MIT).