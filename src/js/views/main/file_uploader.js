import request from 'superagent';

const searchParams = new URLSearchParams(window.location.search);
const port = searchParams.has('port')
   ? parseInt(searchParams.get('port'))
   : 5000;

const apiUrl = `http://ec2-3-83-203-173.compute-1.amazonaws.com:${port}/upload`;

class FileUploader {
   createRequest = () => {
      return request.post(apiUrl);
   };

   validateFiles(files) {
      return files.filter(file => file.type === 'text/csv').length > 0;
   }

   async sendFiles(files) {

      const req = this.createRequest();

      files.forEach(file => {
         if (file.type === 'application/json') {
            req.attach('data_ontology', file);
         } else {
            req.attach('data_file', file);
         }
      });

      const response = await req;

      return response;
   }
}

export default FileUploader;
