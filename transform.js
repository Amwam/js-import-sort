'use strict';
const builtInModules = require('./lib/builtInModules').default;
const thirdPartyModules = require('./lib/thirdPartyModules').default;

module.exports = function(file, api) {
    function createImportStatement(moduleName, variableName, propName) {
        let declaration, variable, idIdentifier, nameIdentifier;

        // if no variable name, return `import '<module>'`
        if (!variableName) {
            declaration = j.importDeclaration([], j.literal(moduleName));
            return declaration;
        }

        const variableIds = variableName.map(function(v) {
            return j.importSpecifier(j.identifier(v.imported), j.identifier(v.local));
        });

        if (propName) {
            var namespace = propName.namespace;
            var name = propName.name;
            if (name) {
                var identifier = j.identifier(name);
                variableIds.unshift(j.importDefaultSpecifier(identifier, identifier));
            }
            else if (namespace) {
                var identifier = j.identifier(namespace);
                variableIds.unshift(j.importNamespaceSpecifier(identifier, identifier));
            }
        }

        declaration = j.importDeclaration(variableIds, j.literal(moduleName));

        return declaration;
    }

    const j = api.jscodeshift;
    const root = j(file.source);
    const imports = root.find(j.ImportDeclaration);

    const newImports = {};

    imports.forEach(i => {
        const node = i.node;
        const source = node.source.value;
        if (!newImports[source]) {
            newImports[source] = {
                'default': null,
                'specifiers': [],
            };
        }

        node.specifiers.forEach(specifier => {
            if (specifier.type === 'ImportDefaultSpecifier') {
                newImports[source].default = {
                    name: specifier.local.name
                };
            }
            else if (specifier.type === 'ImportNamespaceSpecifier') {
                newImports[source].default = {
                    namespace: specifier.local.name,
                };
            }
            else {
                newImports[source].specifiers.push({
                    local: specifier.local.name,
                    imported: specifier.imported.name
                });
            }
        });
    });

    const nodeModules = {};
    const thirdPartyImports = {};
    const firstPartyImports = {};
    const localImports = {};

    Object.keys(newImports).forEach((key)=> {
        if (builtInModules.indexOf(key) > -1) {
            nodeModules[key] = newImports[key];
        }
        else if (thirdPartyModules.indexOf(key) > -1) {
            thirdPartyImports[key] = newImports[key];
        }
        else if (key.startsWith('.')) {
            localImports[key] = newImports[key]
        }
        else {
            firstPartyImports[key] = newImports[key];
        }
    });

    const importSortFunc = (a, b) => {
        if (a.startsWith('.') && !b.startsWith('.')) {
            return 1
        }
        else if (b.startsWith('.') && !a.startsWith('.')) {
            return -1
        }
        return a.localeCompare(b)

    };

    const nodekeys = Object.keys(nodeModules).sort(importSortFunc).reverse();
    const thirdkeys = Object.keys(thirdPartyImports).sort(importSortFunc).reverse();
    const firstkeys = Object.keys(firstPartyImports).sort(importSortFunc).reverse();
    const localkeys = Object.keys(localImports).sort(importSortFunc).reverse();

    const blankLine = '//$$BLANK_LINE';

    const outputImports = [];

    function pushImports(keys) {
        if (keys.length > 0) {
            outputImports.push(blankLine);
        }
        keys.forEach(key => {
            outputImports.push(
                createImportStatement(key,
                    newImports[key].specifiers.sort((a, b)=>(a.imported.localeCompare(b.imported))),
                    newImports[key].default)
            );
        });
    }

    pushImports(localkeys);
    pushImports(firstkeys);
    pushImports(thirdkeys);
    pushImports(nodekeys);

    const  comments = root.find(j.Program).get('body', 0).node.comments;
    root.find(j.ImportDeclaration).remove();
    outputImports.forEach(x => {
        const body = root.get().value.program.body;
        body.unshift(x);
    });

    root.get().node.comments = comments;
    const source = root.toSource({ quote: 'single' });
    return source.replace(/\/\/\$\$BLANK_LINE/g, '');
};
