# ics-tools
ICalendar tools for building calendar service at FOSSASIA API https://github.com/fossasia/api.fossasia.net

[![Build Status](https://travis-ci.org/zyzo/ics-tools.svg?branch=master)](https://travis-ci.org/zyzo/ics-tools)

**Demo** : http://fossasia-api.herokuapp.com/

## Installation instruction
Just grab the `lib` folder and include it in your project
## How to run tests
* Install `composer.phar` :
```shell
curl -sS https://getcomposer.org/installer | php
```
* Install dependencies
```shell	
php composer.phar install
```
* Finally, run test suite(s)
```shell
vendor/bin/phpunit -c phpunit.xml.dist [--filter specificTestMethod]
```