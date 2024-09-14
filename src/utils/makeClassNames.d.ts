export default function makeClassNames<T extends string>(
    PREFIX: string,
    classNames: T[]
): Record<T, string>;
