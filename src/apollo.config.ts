module.exports = {
    client: {
        service: {
            name: 'my-app',
            url: 'http://localhost:4000/graphql'
        }
    },
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
    excludes: ['node_modules', 'dist']
}