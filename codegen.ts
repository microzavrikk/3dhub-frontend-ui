import { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  
  documents: "src/**/*.gql",
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
      config: {
        vueCompositionApiImportFrom: 'vue',
      }
    }
  }
};
export default config;