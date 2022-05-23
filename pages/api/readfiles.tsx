import fs from 'fs'
import path from 'path'

export default (req, res) => {
  const dirRelativeToPublicFolder = 'nft'

  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  console.log(dir);
  const filenames = fs.readdirSync(dir);
  const  result = []
  const files = filenames.map((name) => {
    if(fs.lstatSync(dir + '/' + name).isDirectory() && fs.existsSync(dir + '/' + name + '/Collection Metadata.json')){
      result.push(path.join(name))
      return path.join('/', dirRelativeToPublicFolder, name)
    }
    
  })

  res.statusCode = 200
  res.json(result);
}