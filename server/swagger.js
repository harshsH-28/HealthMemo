const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/Fitness.js']

swaggerAutogen(outputFile, endpointsFiles)