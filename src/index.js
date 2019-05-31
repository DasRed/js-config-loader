export default class ConfigLoader {
    /**
     *
     * @return {*}
     */
    get config() {
        if (this._config !== undefined) {
            return this._config;
        }

        let element;
        let elementId = this.element;

        if (elementId.substr(0, 1) === '#') {
            elementId = elementId.substr(1);
        }

        if (document === undefined) {
            if (this.throwError === true) {
                throw new Error('Can not find the document node to find configuration element "' + this.element + '".');
            }

            return {};
        }

        // try to find the user config element
        element = document.getElementById(elementId);
        if (element === null) {
            if (this.throwError === true) {
                throw new Error('Can not find the Element "' + this.element + '" for configuration.');
            }

            return {};
        }

        // try to parse the JSON from element
        try {
            this._config = JSON.parse(element.innerHTML);
        }
        catch (exception) {
            if (this.throwError === true) {
                throw new Error('Can not parse the data from Element "' + this.element + '" for configuration.\n' + (exception.message || exception));
            }

            return {};
        }


        return this._config;
    }

    /**
     * loads config from script type application json
     *
     * @param {String} element
     * @param {Boolean} [throwError = false]
     */
    constructor(element, {throwError = false} = {}) {
        this.element = element;

        this.throwError = throwError;
    }
}
