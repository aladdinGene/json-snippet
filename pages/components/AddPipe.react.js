import JSONViewer from "./json-viewer/JsonViewer";
import template from "../lib/json-object.json";


const AddPipe = () => {
  return(
    <>
      <JSONViewer jsonTemplate={template} />
    </>
  )
}

export default AddPipe;