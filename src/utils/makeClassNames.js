/**
 * @type {import("./makeClassNames.d.ts").makeClassNames}
 */
function makeClassNames(PREFIX, classNames) {
    const classes = {};
    classNames.forEach((className) => {
        classes[className] = `${PREFIX}-${className}`;
    });
    return classes;
}

export default makeClassNames;
