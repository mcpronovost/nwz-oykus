/**
 * Module loader utility for API services
 * Provides a clean way to load and bind API modules
 */

export class ApiModuleLoader {
  constructor(apiInstance) {
    this.api = apiInstance;
    this.modules = new Map();
  }

  /**
   * Load a module and bind its methods to the API instance
   * @param {string} moduleName - Name to identify the module
   * @param {Object} module - Module object with methods
   * @param {Object} options - Optional configuration
   */
  loadModule(moduleName, module, options = {}) {
    const { prefix = "" } = options;
    
    Object.keys(module).forEach(methodName => {
      const boundMethodName = prefix ? `${prefix}${methodName.charAt(0).toUpperCase()}${methodName.slice(1)}` : methodName;
      
      this.api[boundMethodName] = async (...args) => {
        return await module[methodName](this.api, ...args);
      };
    });

    this.modules.set(moduleName, { module, options });
  }

  /**
   * Load multiple modules at once
   * @param {Object} modules - Object with moduleName as key and module as value
   */
  loadModules(modules) {
    Object.entries(modules).forEach(([moduleName, module]) => {
      this.loadModule(moduleName, module);
    });
  }

  /**
   * Get loaded module by name
   * @param {string} moduleName 
   * @returns {Object|null}
   */
  getModule(moduleName) {
    return this.modules.get(moduleName)?.module || null;
  }

  /**
   * Check if a module is loaded
   * @param {string} moduleName 
   * @returns {boolean}
   */
  hasModule(moduleName) {
    return this.modules.has(moduleName);
  }
} 