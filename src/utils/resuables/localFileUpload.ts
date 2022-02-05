import path from 'path';

const localFileUpload = (sampleFile: any, folder: string): boolean | string => {
  try {
    sampleFile.name = Date.now() + '_' + sampleFile.name;
    let contentPath = path.join(
      __dirname,
      `../../../media/${folder}/${sampleFile.name}`
    );
    sampleFile.mv(contentPath, (err: any) => {
      if (err) {
        return false;
      }
    });
    contentPath = contentPath.split('\\').join('\\\\');
    return contentPath;
  } catch (error) {
    return false;
  }
};

export default localFileUpload;
