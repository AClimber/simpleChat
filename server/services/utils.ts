import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
    dictionaries: [names]
}

const generateUniqueUserName = (): string => {
    return uniqueNamesGenerator(config);
}

export {generateUniqueUserName};