# config-loader
## General
The config loader provides a easy and simple way to get configs from HTML (typically from the backend server) into your client application without using global variables.

## Install
```
bower install config-loader --save
```

## Usage
The ConfigLoader requires 2 arguments. 

The first one is the element id, which contains the configuration to load. 
This element must contains valid JSON. Typically is this element a script tag.
  
The second argument is an object with options. Currently the only option is "throwError". 
If "throwError" is TRUE, an error will be thrown, if the config can not be found or parsed. 
If it is FALSE, an empty object will be returned, if an error occurs.
The default value is TRUE. 

The property "config" of the instance returns the config from given element.

## Example
```html
<html>
    <head>
        <script src="loader.js"></script>
        <script id="application" type="application/json">
            {
                "baseUrl": "/",
                "environment": "prod",
                "locale": {
                    "area": "de_DE",
                    "available": [
                        "de_DE",
                        "nl_NL",
                        "fr_FR",
                        "de_AT"
                    ],
                    "current": "de_DE",
                    "default": "de_DE"
                },
                "logger": {
                    "level": 400
                }
            }
        </script>
        <script>
            let configLoader = new ConfigLoader('#application');
            console.log(configLoader.config);
        </script>
    </head>
    <body>
    </body>
</html>
```
This will dump then JSON as JS Object to the console from the element #application.
