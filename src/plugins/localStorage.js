/* eslint class-methods-use-this: off */

const _global = typeof window !== "undefined" ? window : global || {};
const localStorage = "localStorage" in _global ? _global.localStorage : null;

if (!localStorage) {
    console.error(
        `localStorage is not supported your system, use memory storage`
    );
}

class MemoryStorageInterface {
    constructor() {
        Object.defineProperty(this, "length", {
            /**
             * Define length property
             *
             * @return {number}
             */
            get() {
                return Object.keys(localStorage).length;
            }
        });
    }

    /**
     * check is exists
     *
     * @param {string} name
     * @returns { String, Object, Array, null }
     */
    exists(name) {
        return name in localStorage;
    }

    /**
     * Get item
     *
     * @param {string} name
     * @returns { String, Object, Array, null }
     */
    get(name) {
        try {
            return name in localStorage ? JSON.parse(localStorage[name]) : null;
        } catch (error) {
            return name in localStorage ? localStorage[name] : null;
        }
    }

    /**
     * Set item
     *
     * @param {string} name
     * @param {*} value
     * @returns {boolean}
     */
    set(name, value) {
        if (typeof value === "object") localStorage[name] = JSON.stringify(value);
        else localStorage[name] = value;

    }

    /**
     * Remove item
     *
     * @param {string} name
     * @returns {boolean}
     */
    remove(name) {
        const found = name in localStorage;

        if (found) {
            return delete localStorage[name];
        }

        return false;
    }

    /**
     * Clear storage
     *
     * @returns {boolean}
     */
    clear() {
        localStorage.clear();

        return true;
    }

    /**
     * Get item by key
     *
     * @param {number} index
     * @returns {*}
     */
    key(index) {
        const keys = Object.keys(localStorage);

        return typeof keys[index] !== "undefined" ? keys[index] : null;
    }
}

export default new MemoryStorageInterface();