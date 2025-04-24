const swaggerAutogen = require('swagger-autogen')();

const doc={
    info: {
        title: 'API Documentation',
        description: 'API documentation for the project Grocery Managment System',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/index.ts');
});