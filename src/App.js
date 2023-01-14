
import './App.css';
import { saveAs } from 'file-saver'
import JSZip from "jszip";

function App() {


  const downloadImage = () => {
    saveAs('https://i.ibb.co/F4T7D98/catagory-luxury.jpg', 'image.jpg')
  }


  const urls = [
    "https://i.ibb.co/F4T7D98/catagory-luxury.jpg", 
    "https://i.ibb.co/tc2VdNr/catagory-electric.jpg", 
    "https://i.ibb.co/Yyp6GQf/catagory-sports.jpg"
];

const saveZip = (filename, urls) => {
  if(!urls) return;

  const zip = new JSZip();
  const folder = zip.folder("files"); // folder name where all files will be placed in 

  urls.forEach((url) => {
      const blobPromise = fetch(url).then((r) => {
          if (r.status === 200) return r.blob();
          return Promise.reject(new Error(r.statusText));
      });
      const name = url.substring(url.lastIndexOf("/") + 1);
      folder.file(name, blobPromise);
  });

  zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, filename));

};

const handleMultipleImage = () =>{
  saveZip("my_project_files_to_download.zip", urls);
}
  return (
    <div className="App">
      <div>
      <h1>Single Image download Practice</h1>
      <button onClick={downloadImage}>Download!</button>
    </div>
    <div>
      <h2>Multiple Image download practice</h2>
    </div>

    <div>
      <button onClick={handleMultipleImage}>save multiple image</button>
    </div>

    
    </div>
  );
}

export default App;
